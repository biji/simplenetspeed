const Clutter = imports.gi.Clutter,
 St = imports.gi.St,
 Main = imports.ui.main,
 Gio = imports.gi.Gio,
 GLib = imports.gi.GLib,
 Mainloop = imports.mainloop;

var refreshTime;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const schema = 'org.gnome.shell.extensions.netspeedsimplified';

const rCConst=3; //Right Click 4 timees to change Vertical Alignment

let settings,
  button, timeout,
  ioSpeed, spaCe,
  lastCount = 0, lastSpeed = 0, lastCountUp = 0,
  mode, // 0: kb/s 1: KB/s 2: U:kb/s D:kb/s 3: U:KB/s D:KB/s 4: Total KB
  fontmode,
  resetNextCount=false, resetCount=0,
  reuseable_text, newLine, h=8, tTime=0, useOldIcon;

var extRaw, rClickCount=0, isVertical, togglebool, DIcons=[], lckMuseAct;

function init() {
    settings = Convenience.getSettings(schema);
}

function changeMode(widget, event) {
    if (event.get_button() == 3) {
        if (mode ==4 ) resetNextCount = true; // right click: reset downloaded sum
        else {//right click on other modes brings total downloaded sum
          togglebool = !togglebool;
          settings.set_boolean('togglebool', togglebool);
          ioSpeed.set_text("Loading Info...");
        }
	   rClickCount++;
    }
    else if (event.get_button() == 2) { // change font
        fontmode++;
        if (fontmode > 4) fontmode=0;
        settings.set_int('fontmode', fontmode);
    }
    else if (event.get_button() == 1) {
        mode++;
        if (mode > 4) mode = 0;
        settings.set_int('mode', mode);
    }
    parseStat();
    log('mode:' + mode + ' font:' + fontmode);
}

function chooseLabel() {
	addArg = (mode==4) ? true : false
    if (mode == 0 || mode == 1 || mode == 4) styleName =  'sumall'; 
    else if(!isVertical) styleName = 'upanddown';
    let extraw = '';
    (!isVertical) ? ((!addArg) ? (extraw = togglebool ? ' iwidth' : '') : null) : // Doesnt increase width on right click if mode==4 or if vertical is true
    ((mode ==2 || mode ==3) ? extraw = ' leftlign' : null) // if vertical is true in mode 2,3 then make them left align
    styleName = 'forall ' + styleName + extraw + ' size'
    styleName = fontmode > 0 ? styleName + '-' + fontmode : styleName 
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
	if (rClickCount != 0){ 
		tTime++;
		if (rClickCount>=rCConst){
			isVertical = !isVertical;
            settings.set_boolean('isvertical', isVertical);
			rClickCount =0;
		}
		if(tTime>rCConst){
			tTime = 0;
			rClickCount = 0;
		}
	}
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

    let speed = (count - lastCount) / refreshTime,
      speedUp = (countUp - lastCountUp) / refreshTime,
      dot;
    dot = (speed > lastSpeed) ? "⇅" : ""
    if (resetNextCount == true) {
         resetNextCount = false;
         resetCount = count;
       }
	
    newLine = (isVertical && (mode ==2 || mode ==3)) ? "\n" : "";
    var speedy = speedToString(count - resetCount, 1);
    function sped(exta = extRaw, spda = speedy){ return exta + spda; }
    function commonSigma(thr = true /*If true will return a result else will return empty string*/){
		let sigma = `${DIcons[2]} `;
		extRaw = "  |  " + sigma;
		if (thr && mode !=4){
		    if ((mode ==0 || mode ==1)){
			     (isVertical) ? (extRaw = "\n" + sigma) : null
			     return (mode == 0) ? sped(extRaw, speedy.toLowerCase()) : sped(extRaw)
		  }
		    else if ((mode ==2 || mode ==3)) {
			     (isVertical) ? (extRaw = "      " + sigma) : null
			     return (mode == 2) ? sped(extRaw, speedy.toLowerCase()) : sped(extRaw)
		  }
		    else return "";
		}
		else if (mode == 4){ 
			let toReturn = (isVertical) ? sped(sigma) + "\n  -v" : sped(sigma);
			toReturn = (useOldIcon) ? toReturn + "  -o" : toReturn
            return toReturn;
        }
		else return "";
    }
    if (useOldIcon) spaCe = "" ; 
    else spaCe = "  ";
	(speed || speedUp) ? h = 0 : h++
	if(h<=8){
		reuseable_text = (mode >= 0 && mode <= 1) ? `${dot} ${speedToString(speed)} ${commonSigma(togglebool)}` :
		(mode >= 2 && mode <= 3) ? `${DIcons[0]} ${spaCe}${speedToString(speed - speedUp)}   ${newLine}${DIcons[1]} ${spaCe}${speedToString(speedUp)} ${commonSigma(togglebool)}` :
		(mode == 4) ? commonSigma(): "Mode Unavailable"
	}
	else reuseable_text = (mode !=4) ? "--".repeat(mode+1) + newLine + commonSigma(togglebool) : commonSigma(togglebool)
	ioSpeed.set_text(reuseable_text);
    lastCount = count;
    lastCountUp = countUp;
    lastSpeed = speed;
    button.set_child(chooseLabel());
    } catch (e) {
        ioSpeed.set_text(e.message);
    }
    return true;
}

function speedToString(amount, rMode = 0) {
    let digits,
      speed_map;
    speed_map = ["B", "KB", "MB", "GB"].map(
	(rMode==1 || mode ==4) ? v => v : //KB
    	(mode == 0 || mode == 2) ? v => v.toLowerCase() + "/s" : //kb/s
    	(mode == 1 || mode == 3) ? v => v + "/s" : v=>v) //KB/s, KB
	
    if (amount === 0) return "0 "  + speed_map[0];
    if (mode==0 || mode==2) amount = amount * 8;

    let unit = 0;
    while (amount >= 1000) { // 1M=1024K, 1MB/s=1000MB/s
        amount /= 1000;
        ++unit;
    }
    function ChkifInt(amnt, digitsToFix = 1){
    	return Number.isInteger(parseFloat(amnt.toFixed(digitsToFix)));
    }
    digits = ChkifInt(amount) ? 0 : //For Integer like 21.0
     ((mode==4 || rMode !=0) && !ChkifInt(amount*10)) ? 2 /* For floats like 21.1 */ : 1 //For floats like 21.22

    return String(amount.toFixed(digits)) + " " + speed_map[unit];
}

function chooseIconSet(){
	DIcons = (useOldIcon) ? ["↓","↑","∑"] : ["🡳","🡱","Σ"];
}

function enable() {
	refreshTime = settings.get_double('refreshtime');;
	mode = settings.get_int('mode'); // default mode using bit (b/s, kb/s)
    fontmode = settings.get_int('fontmode');
    togglebool = settings.get_boolean('togglebool');
    isVertical = settings.get_boolean('isvertical');
    useOldIcon = settings.get_boolean('useoldicon');
    lckMuseAct = settings.get_boolean('lockmouseactions');
    fontmode = settings.get_int('fontmode');

    var [ok, out, err, exit] = GLib.spawn_command_line_sync("gnome-shell --version");
    output = out.toString().split(" ")[2];

    if (parseFloat(output) <=3.36) {
	    button = new St.Bin({
	        style_class: 'panel-button',
	        reactive: true,
	        can_focus: true,
	        x_fill: true,
	        y_fill: false,
	        track_hover: true
	    });
	}
	else{
	    button = new St.Bin({
	        style_class: 'panel-button',
	        reactive: true,
	        can_focus: true,
	        x_expand: true,
	        y_expand: false,
	        track_hover: true
	    });
	}
    ioSpeed = new St.Label({
        text: '---',
        y_align: Clutter.ActorAlign.CENTER,
        style_class: 'forall'
    });

    (!lckMuseAct) ? button.connect('button-press-event', changeMode) : null
    button.set_child(chooseLabel());
    
    chooseIconSet();

    Main.panel._rightBox.insert_child_at_index(button, 0);
    timeout = Mainloop.timeout_add_seconds(refreshTime, parseStat);
}

function disable() {
    Mainloop.source_remove(timeout);
    Main.panel._rightBox.remove_child(button);
}
