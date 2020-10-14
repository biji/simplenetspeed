const Clutter = imports.gi.Clutter;
const St = imports.gi.St;
const Main = imports.ui.main;
// const Tweener = imports.ui.tweener;
const Gio = imports.gi.Gio;
const Mainloop = imports.mainloop;
// const GLib = imports.gi.GLib;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const PREFS_SCHEMA = 'simplenetspeed@biji.extension';
const refreshTime = 1.6;

let settings;
let button, timeout;
// let icon, iconDark;
let ioSpeed;
let lastCount = 0, lastSpeed = 0, lastCountUp = 0;
let mode; // 0: kbps 1: K/s 2: U:kbps D:kbps 3: U:K/s D:K/s 4: Total KB
let fontmode;
let resetNextCount = false, resetCount = 0;
let toggle_bool = false;
let reuseable_text;

function init() {

    settings = Convenience.getSettings(PREFS_SCHEMA);

    mode = settings.get_int('mode'); // default mode using bit (bps, kbps)
    fontmode = settings.get_int('fontmode'); 

    button = new St.Bin({
        style_class: 'panel-button',
        reactive: true,
        can_focus: true,
        x_expand: true,
        y_expand: false,
        track_hover: true
    });

    ioSpeed = new St.Label({
        text: '---',
        y_align: Clutter.ActorAlign.CENTER,
        style_class: 'simplenetspeed-label'
    });

    button.set_child(chooseLabel());
    button.connect('button-press-event', changeMode);
}

function changeMode(widget, event) {
    // log(event.get_button());
    if (event.get_button() == 3) {
        if (mode ==4 ){// right click: reset downloaded sum
        resetNextCount = true;
        parseStat();}
        else {//right click on other modes; brings total downloaded sum
          toggle_bool = !toggle_bool;
          ioSpeed.set_text(" Hello");
          button.set_child(chooseLabel());
          parseStat();
        }
    }
    else if (event.get_button() == 2) { // change font
        fontmode++;
        if (fontmode > 4) {
            fontmode=0;
        }
        settings.set_int('fontmode', fontmode);
        button.set_child(chooseLabel());
        parseStat();
    }
    else if (event.get_button() == 1) {
        mode++;
        if (mode > 4) {
            mode = 0;
        }
        settings.set_int('mode', mode);
        if (mode ==4) {
            button.set_child(chooseLabel(true));
        }
        else{
            button.set_child(chooseLabel());
        }
        parseStat();
    }
    log('mode:' + mode + ' font:' + fontmode);
}

function chooseLabel(addArg = false) {
    if (mode == 0 || mode == 1 || mode == 4) {
        styleName = 'sumall';
    }
    else { // 2 , 3
        styleName = 'upanddown';
    }
    let extraw;
    if (addArg){
        extraw = ""
    }
    else{
      if (toggle_bool){
        extraw = ' iwidth'
      }
      else {
        extraw = ""
        }
    }
    styleName = 'forall ' + styleName + extraw + ' size'
    if (fontmode > 0) {
        styleName = styleName + '-' + fontmode;
    } 
    
    ioSpeed.set_style_class_name(styleName);
    return ioSpeed;
}

function parseStat() {
    try {
        let input_file = Gio.file_new_for_path('/proc/net/dev');
        let fstream = input_file.read(null);
        let dstream = Gio.DataInputStream.new(fstream);

        let count = 0;
        let countUp = 0;
        let line;
        while (line = dstream.read_line(null)) {
            line = String(line);
            line = line.trim();
            let fields = line.split(/\W+/);
            if (fields.length<=2) break;

            if (fields[0] != "lo" && 
                !fields[0].match(/^virbr[0-9]+/) &&
                !fields[0].match(/^br[0-9]+/) &&
                !fields[0].match(/^vnet[0-9]+/) &&
                !fields[0].match(/^tun[0-9]+/) &&
                !fields[0].match(/^tap[0-9]+/) &&
                !isNaN(parseInt(fields[1]))) {
                    count = count + parseInt(fields[1]) + parseInt(fields[9]);
                    countUp = countUp + parseInt(fields[9]);
            }
        }
        fstream.close(null);

        if (lastCount === 0) lastCount = count;
        if (lastCountUp === 0) lastCountUp = countUp;

        let speed = (count - lastCount) / refreshTime;
        let speedUp = (countUp - lastCountUp) / refreshTime;

        let dot = "";
        if (speed > lastSpeed) {
            dot = "⇅ ";
        }
        if (resetNextCount == true) {
             resetNextCount = false;
             resetCount = count;
           }
        function commonSigma(fi=0,
        	             se=false /*This default value is for 4th mode*/, 
        	             thr = true /*If true will return a result else will return empty string*/ 
       	){
        	if(thr){
			if(se){ //This is for Right Click event on mode!=4
				return "  |  Σ " + speedToString(count - resetCount, fi);}
			else{ //This is for mode 4 sigma
				return "Σ " + speedToString(count - resetCount, fi);
				}
			}
		else{
			return "";}        		

        	}
        if (mode >= 0 && mode <= 1) {
            reuseable_text = dot + speedToString(speed);
        }
        else if (mode >= 2 && mode <= 3) {            
            reuseable_text = " 🡳   " + speedToString(speed - speedUp) + "  🡱   " + speedToString(speedUp);
        }
        else if (mode == 4) {
            reuseable_text = commonSigma()
        }
        if (mode == 0 || mode == 2) {
            reuseable_text = reuseable_text + commonSigma(2, true, toggle_bool);;
        }
        else if (mode == 1 || mode == 3) {
            reuseable_text = reuseable_text + commonSigma(1, true, toggle_bool);;
        }
        ioSpeed.set_text(reuseable_text);
        lastCount = count;
        lastCountUp = countUp;
        lastSpeed = speed;
    } catch (e) {
        ioSpeed.set_text(e.message);
    }
    return true;
}

function speedToString(amount, rMode = 0) {
    let digits;
    let speed_map;
    if (rMode==1) {
        speed_map = ["B", "KB", "MB", "GB"];
    }
    else if (rMode == 2) {
        speed_map = ["b", "kb", "mb", "gb"];
    }
    else if (mode == 0 || mode == 2) {
        speed_map = ["b/s", "kb/s", "mb/s", "gb/s"];
    }
    else if (mode == 1 || mode == 3) {
        speed_map = ["B/s", "K/s", "M/s", "G/s"];
    }
    else if (mode == 4) {
        speed_map = ["B", "KB", "MB", "GB"];
    }

    if (amount === 0)
        return "0 "  + speed_map[0];

    if (mode==0 || mode==2) amount = amount * 8;

    let unit = 0;
    while (amount >= 1000) { // 1M=1024K, 1MB/s=1000MB/s
        amount /= 1000;
        ++unit;
    }

    if (Number.isInteger(parseFloat(amount.toFixed(1)))) // 100.0 => 100
        digits = 0;
    else if ((mode==4 || rMode !=0) && !Number.isInteger(parseFloat((amount*10).toFixed(1))))
        digits = 2;
    else // 100.9 => 100.9
        digits = 1;
    return String(amount.toFixed(digits)) + " " + speed_map[unit];
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
    timeout = Mainloop.timeout_add_seconds(refreshTime, parseStat);
}

function disable() {
    Mainloop.source_remove(timeout);
    Main.panel._rightBox.remove_child(button);
}
