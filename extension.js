const St = imports.gi.St;
const Main = imports.ui.main;
// const Tweener = imports.ui.tweener;
const Gio = imports.gi.Gio;
const Mainloop = imports.mainloop;
// const GLib = imports.gi.GLib;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Slider = imports.ui.slider;

const PREFS_SCHEMA = 'org.gnome.shell.extensions.simplenetspeed';
const refreshTime = 3.0;

let settings;
let button, timeout;
let ioSpeed;
let lastCount = 0, lastSpeed = 0, lastCountUp = 0;
let mode; // 0: kbps 1: K/s 2: U:kbps D:kbps 3: U:K/s D:K/s 4: Total KB
let fontmode;
let resetNextCount = false, resetCount = 0, resetCountUp = 0;
let speed_map;

function init() {

    settings = Convenience.getSettings(PREFS_SCHEMA);

    mode = settings.get_int('mode'); // default mode using bit (bps, kbps)
    fontmode = settings.get_int('fontmode');

    button = new St.Bin({
        style_class: 'panel-button',
        reactive: true,
        can_focus: true,
        x_fill: true,
        y_fill: false,
        track_hover: true
    });

    ioSpeed = new St.Label({
        text: '---',
        style_class: 'simplenetspeed'
    });

    button.set_child(ioSpeed);
    button.connect('button-press-event', changeMode);
    updateSpeedMap();
    updateStyle();
}

function updateStyle(){
    style = "font-size: " + (0.15*fontmode + 0.65) + "em;"; // parenthesis needed: math inside, strcat outside
    ioSpeed.set_style(style);
}

function updateSpeedMap(){
    if (mode == 0 || mode == 2) {
        speed_map = ["bps", "Kbps", "Mbps", "Gbps"];
    }
    else if (mode == 1 || mode == 3) {
        speed_map = ["B/s", "K/s", "M/s", "G/s"];
    }
    else if (mode >= 4 && mode <= 6) {
        speed_map = ["B", "KB", "MB", "GB"];
    }
}

function changeMode(widget, event) {
    // log(event.get_button());
    if (event.get_button() == 3) { // right click: reset downloaded sum
        if (mode < 4){
            mode = 6;
            updateSpeedMap();
            settings.set_int('mode', mode);
        } else {
            resetNextCount = true;
        }
        parseStat();
    }
    else if (event.get_button() == 2) { // change font
        fontmode++;
        if (fontmode > 4) {
            fontmode=0;
        }
        settings.set_int('fontmode', fontmode);
        updateStyle();
        parseStat();
    }
    else if (event.get_button() == 1) {
        mode++;
        if (mode > 6) {
            mode = 0;
        }
        updateSpeedMap();
        settings.set_int('mode', mode);
        parseStat();
    }
    log('mode:' + mode + ' font:' + fontmode);
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

        // TEST
        // lastSpeed = 199899999;
        // speed= 1998999999;
        // speedUp= 99899999;

        let dot = "";
        if (speed > lastSpeed) {
            dot = "⇅";
        }

        if (mode == 0 || mode == 1) {
            ioSpeed.set_text(dot + speedToString(speed));
        }
        else if (mode == 2 || mode == 3) {
            ioSpeed.set_text("↓" + speedToString(speed - speedUp) + " ↑" + speedToString(speedUp));
        }
        else if (mode >= 4 && mode <= 6) {
            if (resetNextCount == true) {
                resetNextCount = false;
                resetCount = count;
                resetCountUp = countUp;
            }
            if(mode == 4){
                ioSpeed.set_text("∑ ↓ "   + speedToString(count - resetCount));
            } else if (mode == 5) {
                ioSpeed.set_text("∑ ↑ "   + speedToString(countUp - resetCountUp));                
            } else {
                ioSpeed.set_text("∑ ↑↓ "  + speedToString(count - resetCount + countUp - resetCountUp));
            }
        }

        lastCount = count;
        lastCountUp = countUp;
        lastSpeed = speed;
    } catch (e) {
        ioSpeed.set_text(e.message);
    }

    return true;
}

function speedToString(amount) {
    let digits;

    if (amount === 0)
        return "0"  + speed_map[0];

    if (mode==0 || mode==2) amount = amount * 8;

    let unit = 0;
    while (amount >= 1000) { // 1M=1024K, 1MB/s=1000MB/s
        amount /= 1000;
        ++unit;
    }

    if (amount >= 100) // 100MB 100KB 200KB
        digits = 0;
    else if (amount >= 10) // 10MB 10.2
        digits = 1;
    else 
        digits = 2;
    return String(amount.toFixed(digits)) + speed_map[unit];
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
    timeout = Mainloop.timeout_add_seconds(refreshTime, parseStat);
}

function disable() {
    Mainloop.source_remove(timeout);
    Main.panel._rightBox.remove_child(button);
}
