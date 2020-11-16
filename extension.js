const Clutter = imports.gi.Clutter,
 St = imports.gi.St,
 Main = imports.ui.main,
 Gio = imports.gi.Gio,
 Lang = imports.lang,
 PanelMenu = imports.ui.panelMenu,
 Mainloop = imports.mainloop;

var refreshTime, toRestart;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const schema = 'org.gnome.shell.extensions.netspeedsimplified';

const ButtonName = "ShowNetSpeedButton";

const rCConst=4; //Right Click 4 times to change Vertical Alignment

let settings,
  button, timeout,
  spaCe,
  lastCount = 0, lastSpeed = 0, lastCountUp = 0,
  mode, // 0: kb/s 1: KB/s 2: U:kb/s D:kb/s 3: U:KB/s D:KB/s 4: Total KB
  fontmode,
  resetNextCount=false, resetCount=0,
  reuseable_text, newLine, h=8, tTime=0, chooseIconSet;

var extRaw, rClickCount=0, isVertical, togglebool, DIcons=[], lckMuseAct, revIndicator, ioSpeed;

const ShowNetBtn = new Lang.Class({
    Name: ButtonName,
    Extends: PanelMenu.Button,

    _init: function () {
        this.parent(0.0, ButtonName);

        ioSpeed = new St.Label({
            text: '---',
            y_align: Clutter.ActorAlign.CENTER,
            style_class: 'forall'
        });
        

        (!lckMuseAct) ? this.connect('button-press-event', changeMode) : null
        
        this.add_child(chooseLabel());
    },

});


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
    chooseLabel();
    log('mode:' + mode + ' font:' + fontmode);
}

function chooseLabel() {
    var addArg = (mode==4) ? true : false
    var styleName;
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
    toRestart = settings.get_boolean('restartextension');
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
			toReturn = (chooseIconSet !=0) ? toReturn + "  -o" : toReturn
            return toReturn;
        }
		else return "";
    }
    if (chooseIconSet !=0) spaCe = "" ; 
    else spaCe = "  ";
	(speed || speedUp) ? h = 0 : h++

	if(h<=8) {
        
        if (mode >= 0 && mode <= 1) {
            reuseable_text = `${dot} ${speedToString(speed)} ${commonSigma(togglebool)}`;
        }
        else if (mode >= 2 && mode <= 3) {
            if (revIndicator == false)
                reuseable_text = `${DIcons[0]} ${spaCe}${speedToString(speed - speedUp)}   ${newLine}${DIcons[1]} ${spaCe}${speedToString(speedUp)} ${commonSigma(togglebool)}`;
            else
                reuseable_text = `${DIcons[1]} ${spaCe}${speedToString(speedUp)}   ${newLine}${DIcons[0]} ${spaCe}${speedToString(speed - speedUp)} ${commonSigma(togglebool)}`;
        }
        else if (mode == 4) {
            reuseable_text = commonSigma();
        }
        else {
            reuseable_text =  "Mode Unavailable";
        }

    }
	else reuseable_text = (mode !=4) ? "--".repeat(mode+1) + newLine + commonSigma(togglebool) : commonSigma(togglebool)
	ioSpeed.set_text(reuseable_text);
    lastCount = count;
    lastCountUp = countUp;
    lastSpeed = speed;
    if (toRestart == true){
    	settings.set_boolean('restartextension', false);
    	disable();
    	enable();
    }
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
     ((mode==4 || rMode !=0) && !ChkifInt(amount*10)) ? 2 /* For floats like 21.11 */ : 1 //For floats like 21.2

    return String(amount.toFixed(digits)) + " " + speed_map[unit];
}

function enable() {
    refreshTime = settings.get_double('refreshtime');
    mode = settings.get_int('mode'); // default mode using bit (b/s, kb/s);
    fontmode = settings.get_int('fontmode');
    var whePos = ["right", "left", "center"][settings.get_int('wpos')]
    var whePosExt = [3,0][settings.get_int('wposext')];
    togglebool = settings.get_boolean('togglebool');
    isVertical = settings.get_boolean('isvertical');
    chooseIconSet = settings.get_int('chooseiconset');
    revIndicator = settings.get_boolean('reverseindicators');
    lckMuseAct = settings.get_boolean('lockmouseactions');
    fontmode = settings.get_int('fontmode');
	DIcons = [  ["🡳","🡱","Σ"] , ["↓","↑","∑"]  ][chooseIconSet]

    button = new ShowNetBtn();
    

    Main.panel.addToStatusArea(ButtonName, button, whePosExt, whePos);
    timeout = Mainloop.timeout_add_seconds(refreshTime, parseStat);
}

function disable() {
    Mainloop.source_remove(timeout);
    button.destroy();
}
