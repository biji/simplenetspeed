const Gtk = imports.gi.Gtk;
const Lang = imports.lang;

const Extension = imports.misc.extensionUtils.getCurrentExtension();
const Lib = Extension.imports.lib;

const schema = "org.gnome.shell.extensions.netspeedsimplified";

function init()
{
}

function buildPrefsWidget()
{
    let prefs = new Prefs(schema);

    return prefs.buildPrefsWidget();
}

function Prefs(schema)
{
    this.init(schema);
}

Prefs.prototype =
{
    settings: null,

    init: function(schema)
    {
	let settings = new Lib.Settings(schema);
	
	this.settings = settings.getSettings();
    },

    changeVertical: function(object, valueVertical)
    {
	this.settings.set_boolean("isvertical", object.active);
    },

    changeToggleBool: function(object, valueToggbool)
    {
	this.settings.set_boolean("togglebool", object.active);
    },

    changeOldIcons: function(object, valueToggbool)
    {
	this.settings.set_boolean("useoldicon", object.active);
    },

    buildPrefsWidget: function()
    {
	let frame = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, border_width: 10});
	let label = new Gtk.Label({ label: "<b>Default Settings</b>", use_markup: true, xalign:0});
	let vbox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, margin_left: 20});
	let resetBtn = new Gtk.Button({ label: "Restore Defaults", can_focus: true});
	let footer = new Gtk.Label({ label: "<b><u>To See changes either press 'Alt + F2' and then type 'r' then press enter or logout and log back in</u></b>",use_markup: true, margin_top: 20});
 //Mode
  let hboxMode = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, margin_top : 10, margin_bottom : 10});
  let labelMode = new Gtk.Label({label: "Mode (1-5) ", xalign: 0});
  let value2Mode =  new Gtk.ComboBoxText({ 
                halign: Gtk.Align.END,
                tooltip_text: ("Choose which mode to load") 
            });
  value2Mode.append_text("Mode 1");
  value2Mode.append_text("Mode 2");
  value2Mode.append_text("Mode 3");
  value2Mode.append_text("Mode 4");
  value2Mode.append_text("Mode 5");
  value2Mode.set_active(Math.round(this.settings.get_int("mode"))); 
  value2Mode.connect('changed', (widget) => {
    let valueMode = widget.get_active();
	this.settings.set_int("mode", valueMode);
  })
  hboxMode.add(labelMode);
  hboxMode.pack_end(value2Mode, true, true, 0);
  vbox.add(hboxMode);
  vbox.add(new Gtk.Separator({visible : true}));

 //FontMode

  let hboxFontMode = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, margin_top : 10, margin_bottom : 10});
  let labelFontMode = new Gtk.Label({label: "Font Mode ", xalign: 0});
  let value2FontMode =  new Gtk.ComboBoxText({ 
                halign: Gtk.Align.END,
                tooltip_text: ("Choose which font to display") 
            });
  value2FontMode.append_text("Default");
  value2FontMode.append_text("Smallest");
  value2FontMode.append_text("Smaller");
  value2FontMode.append_text("Small");
  value2FontMode.append_text("Large");
  value2FontMode.set_active(Math.round(this.settings.get_int("fontmode"))); 
  value2FontMode.connect('changed', (widget) => {
    let valueFontMode = widget.get_active();
	this.settings.set_int("fontmode", valueFontMode);
  })
  hboxFontMode.add(labelFontMode);
  hboxFontMode.pack_end(value2FontMode, true, true, 0);
  vbox.add(hboxFontMode);
  vbox.add(new Gtk.Separator({visible : true}));

//For Vertical Alignment
	let hboxVertical = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, margin_top : 10, margin_bottom : 10});
	let labelVertical = new Gtk.Label({label: "Vertical Align", xalign: 0});
	let valueVertical = new Gtk.Switch({active: this.settings.get_boolean("isvertical"), tooltip_text: ("Enabling it will enable Vertical Alignment") });
	valueVertical.connect('notify::active', Lang.bind(this, this.changeVertical));

	hboxVertical.pack_start(labelVertical, true, true, 0);
	hboxVertical.add(valueVertical);
	vbox.add(hboxVertical);

  vbox.add(new Gtk.Separator({visible : true}))
//For Default sigma View
	let hboxToggleBool = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, margin_top : 10, margin_bottom : 10});
	let labelToggleBool = new Gtk.Label({label: "Toggle Right Click Behaviour", xalign: 0});
	let valueToggleBool = new Gtk.Switch({active: this.settings.get_boolean("togglebool"), tooltip_text: ("Enabling it will show sigma by default") });
	valueToggleBool.connect('notify::active', Lang.bind(this, this.changeToggleBool));

	hboxToggleBool.pack_start(labelToggleBool, true, true, 0);
	hboxToggleBool.add(valueToggleBool);
	vbox.add(hboxToggleBool);
    vbox.add(new Gtk.Separator({visible : true}));

//For Toggling Old Icons
	let hboxOldIcons = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, margin_top : 10, margin_bottom : 10});
	let labelOldIcons = new Gtk.Label({label: "Display Old Icons", xalign: 0});
	let valueOldIcons = new Gtk.Switch({active: this.settings.get_boolean("useoldicon"), tooltip_text: ("Enabling it will show Old Icons of simplenetspeed") });
	valueOldIcons.connect('notify::active', Lang.bind(this, this.changeOldIcons));

	hboxOldIcons.pack_start(labelOldIcons, true, true, 0);
	hboxOldIcons.add(valueOldIcons);
	vbox.add(hboxOldIcons);
    vbox.add(new Gtk.Separator({visible : true}));
    
	frame.add(label);
	frame.add(vbox);
	frame.add(footer);
	frame.show_all();
	
	return frame;
    }
}
