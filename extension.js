const St = imports.gi.St;
const Main = imports.ui.main;
// const Tweener = imports.ui.tweener;
// const Me = imports.misc.extensionUtils.getCurrentExtension();
const Gio = imports.gi.Gio;
const Mainloop = imports.mainloop;
// const GLib = imports.gi.GLib;


let button, timeout;
// let icon, iconDark;
let cur;
let ioSpeed;
let lastCount, lastSpeed;
let mode = 0;

const refreshTime = 3.0;

function init() {
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
        style_class: 'iospeed-label'
    });

    button.set_child(ioSpeed);
    button.connect('button-press-event', changeMode);

    cur = 0;
    lastCount = 0;
}

function changeMode() {
    if (mode == 0) {
        mode = 1;
    }
    else if (mode == 1) {
        mode = 0;
    }
    ioSpeed.set_text('---');
}

function parseStat() {
    try {
        let input_file = Gio.file_new_for_path('/proc/net/dev');
        let fstream = input_file.read(null);
        let dstream = Gio.DataInputStream.new(fstream);

        let count = 0;
        let line;
        while (line = dstream.read_line(null)) {
            line = String(line);
            let fields = line.split(/\W+/);
            if (fields.length<=2) break;

            if (fields[0] != "lo" && !isNaN(parseInt(fields[1]))) {
                count = count + parseInt(fields[1]) + parseInt(fields[9]);
            }
        }
        fstream.close(null);

        if (lastCount === 0) lastCount = count;

        let speed = (count - lastCount) / refreshTime;

        let dot = "";
        if (speed > lastSpeed) {
            dot = "⇅ ";
        }

        if (mode == 0) {
            ioSpeed.set_text(dot + speedToString(speed));
        } 
        else if (mode == 1) {
            ioSpeed.set_text(speedToString(count));
        }

        lastCount = count;
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
    let digits = 3;
    if (amount === 0)
        return "0 B/s";

    let unit = 0;
    while (amount >= 1000) { // 1M=1024K, 1MB/s=1000MB/s
        amount /= 1000;
        ++unit;
    }

    if (amount >= 100)
        digits -= 2;
    else if (amount >= 10)
        digits -= 1;

    let speed_map;
    if (mode == 0) {
        speed_map = [" B/s", " K/s", " M/s", " G/s"];
    }
    else if (mode == 1) {
        speed_map = [" B", " KB", " MB", " GB"];
    }
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
