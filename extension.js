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
let ioSpeedW;
let lbl;
let lastCount = 0, lastSpeed = 0, lastCountUp = 0;
let mode; // 0: kbps 1: K/s 2: U:kbps D:kbps 3: U:K/s D:K/s 4: Total KB

function init() {

    settings = Convenience.getSettings(PREFS_SCHEMA);

    mode = settings.get_int('mode'); // default mode using bit (bps, kbps)

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

    ioSpeedW = new St.Label({
        text: '---',
        style_class: 'simplenetspeed-label-w'
    });

    // ioSpeedStaticIcon = new St.Label({
    //     text: '💾',
    //     style_class: 'simplenetspeed-static-icon'
    // });

    button.set_child(chooseLabel());
    button.connect('button-press-event', changeMode);
}

function changeMode() {
    mode++;
    if (mode > 4) {
        mode = 0;
    }
    settings.set_int('mode', mode);
    button.set_child(chooseLabel());
    parseStat();
}

function chooseLabel() {
    if (mode == 0 || mode == 1 || mode == 4) {
        lbl=ioSpeed;
    }
    else {
        lbl=ioSpeedW;
    }
    return lbl;
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
            let fields = line.split(/\W+/);
            if (fields.length<=2) break;

            if (fields[0] != "lo" && !isNaN(parseInt(fields[1]))) {
                count = count + parseInt(fields[1]) + parseInt(fields[9]);
                countUp = countUp + parseInt(fields[9]);
            }
        }
        fstream.close(null);

        if (lastCount === 0) lastCount = count;
        if (lastCountUp === 0) lastCountUp = countUp;

        let speed = (count - lastCount) / refreshTime;
        let speedUp = (countUp - lastCountUp) / refreshTime;

        // speed= 1998999999;
        // speedUp= 998999999;

        let dot = "";
        if (speed > lastSpeed) {
            dot = "⮁";
        }

        if (mode >= 0 && mode <= 1) {
            lbl.set_text(dot + speedToString(speed));
        }
        else if (mode >= 2 && mode <= 3) {
            lbl.set_text("↓" + speedToString(speed - speedUp) + " ↑" + speedToString(speedUp));
        }
        else if (mode == 4) {
            lbl.set_text("∑ " + speedToString(count));
        }

        lastCount = count;
        lastCountUp = countUp;
        lastSpeed = speed;
    } catch (e) {
        lbl.set_text(e.message);
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
    let digits = 3;
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

    if (amount > 100)
        digits -= 3;
    else if (amount >= 100)
        digits -= 2;
    else if (amount >= 10)
        digits -= 1;
    return String(amount.toFixed(digits - 1)) + speed_map[unit];
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
    timeout = Mainloop.timeout_add_seconds(refreshTime, parseStat);
}

function disable() {
    Mainloop.source_remove(timeout);
    Main.panel._rightBox.remove_child(button);
}
