const St = imports.gi.St;
const Main = imports.ui.main;
// const Tweener = imports.ui.tweener;
const Gio = imports.gi.Gio;
const Mainloop = imports.mainloop;
// const GLib = imports.gi.GLib;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const PREFS_SCHEMA = 'org.gnome.shell.extensions.simplenetspeed';
const refreshTime = 3.0;

let settings;
let button, timeout;
// let icon, iconDark;
let ioSpeed;
let lastCount = 0, lastSpeed = 0, lastCountUp = 0;
let mode; // 0: kbps 1: K/s 2: U:kbps D:kbps 3: U:K/s D:K/s 4: Total KB
let fontmode;
let resetNextCount = false, resetCount = 0;

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

    /*
    icon = new St.Icon({
        gicon: Gio.icon_new_for_string(Me.path + "/icons/harddisk.svg")
    });
    iconDark = new St.Icon({
        gicon: Gio.icon_new_for_string(Me.path + "/icons/harddisk-dark.svg")
    });*/

    ioSpeed = new St.Label({
        text: '---',
        style_class: 'simplenetspeed-label'
    });

    // ioSpeedStaticIcon = new St.Label({
    //     text: '💾',
    //     style_class: 'simplenetspeed-static-icon'
    // });

    button.set_child(chooseLabel());
    button.connect('button-press-event', changeMode);
}

function changeMode(widget, event) {
    // log(event.get_button());
    if (event.get_button() == 3 && mode == 4) { // right click: reset downloaded sum
        resetNextCount = true;
        parseStat();
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
        button.set_child(chooseLabel());
        parseStat();
    }
    log('mode:' + mode + ' font:' + fontmode);
}

function chooseLabel() {
    if (mode == 0 || mode == 1 || mode == 4) {
        styleName = 'simplenetspeed-label';
    }
    else {
        styleName = 'simplenetspeed-label-w';
    }
    
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

        // TEST
        // lastSpeed = 199899999;
        // speed= 1998999999;
        // speedUp= 99899999;

        let dot = "";
        if (speed > lastSpeed) {
            dot = "⇅";
        }

        if (mode >= 0 && mode <= 1) {
            ioSpeed.set_text(dot + speedToString(speed));
        }
        else if (mode >= 2 && mode <= 3) {
            ioSpeed.set_text("↓" + speedToString(speed - speedUp) + " ↑" + speedToString(speedUp));
        }
        else if (mode == 4) {
            if (resetNextCount == true) {
                resetNextCount = false;
                resetCount = count;
            }
            ioSpeed.set_text("∑ " + speedToString(count - resetCount));
        }

        lastCount = count;
        lastCountUp = countUp;
        lastSpeed = speed;
    } catch (e) {
        ioSpeed.set_text(e.message);
    }

    /*
    let curDiskstats = GLib.file_get_contents('/proc/diskstats');

    if (diskstats == curDiskstats) {
        if (cur !== 0) {
            button.set_child(iconDark);
            cur = 0;
        }
    } else {
        if (cur != 1) {
            button.set_child(icon);
            cur = 1;
        }
        diskstats = curDiskstats;
    }*/

    return true;
}

function speedToString(amount) {
    let digits;
    let speed_map;
    if (mode == 0 || mode == 2) {
        speed_map = ["bps", "Kbps", "Mbps", "Gbps"];
    }
    else if (mode == 1 || mode == 3) {
        speed_map = ["B/s", "K/s", "M/s", "G/s"];
    }
    else if (mode == 4) {
        speed_map = ["B", "KB", "MB", "GB"];
    }

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
