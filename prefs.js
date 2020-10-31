const Gtk = imports.gi.Gtk;
const Lang = imports.lang;

const Extension = imports.misc.extensionUtils.getCurrentExtension();
const Lib = Extension.imports.lib;

const schema = "org.gnome.shell.extensions.netspeedsimplified";

function init(){}

function buildPrefsWidget(){
    let prefs = new Prefs(schema);

    return prefs.buildPrefsWidget();
}

function Prefs(schema){
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
    
    buildPrefsWidget: function()
    {
    let thset = this.settings;
    function vBoxSpinBtn(staRt, getDouble, whichHbox, getLbl = ""){
      if (staRt){;
        boolComp = (thset.get_double(getDouble) === thset.get_default_value(getDouble).unpack());
        getLbl =  boolComp ? getLbl :
        `<i>${getLbl}</i>`
        tootext = boolComp ? "" : "The Value is Changed"
        whichLbl = new Gtk.Label({label: getLbl, use_markup: true, xalign: 0, tooltip_text: tootext });  
      }
      else{
        whichSpinBtn.set_value(thset.get_double(getDouble));
        whichSpinBtn.connect('value-changed', () => {
          this.rTValue = parseFloat(whichSpinBtn.get_value().toFixed(1));
          if(thset.get_double(getDouble) !== this.rTValue){
            thset.set_double(getDouble , this.rTValue);
            }
          });
        whichHbox.pack_start(whichLbl, true, true, 0);
        whichHbox.add(whichSpinBtn);

        vbox.add(whichHbox);
        vbox.add(new Gtk.Separator({visible : true}));
      }
    }
    function vBoxAddSeleCt(stArt, getInt, whichHbox, getLbl = "", getTooTip = ""){
      if (stArt) {  
        boolComp = (thset.get_int(getInt) == thset.get_default_value(getInt).unpack());
        getLbl =  boolComp ? getLbl :
          `<i>${getLbl}</i>`
        tootext = boolComp ? "" : "The Value is Changed"
        whichLbl = new Gtk.Label({label: getLbl, use_markup: true, xalign: 0, tooltip_text: tootext });
        whichVlue =  new Gtk.ComboBoxText({ 
                      halign: Gtk.Align.END,
                      tooltip_text: getTooTip 
                  });
      }
      else {
        whichVlue.set_active(Math.round(thset.get_int(getInt))); 
        whichVlue.connect('changed', (widget) => {
          let valueMode = widget.get_active();
          thset.set_int(getInt, valueMode);
        })
        whichHbox.add(whichLbl);
        whichHbox.pack_end(whichVlue, true, true, 0);
        vbox.add(whichHbox);
        vbox.add(new Gtk.Separator({visible : true}));
      }
    }

    function vBoxAddTgglBtn(whichHbox, getLbl, getBool,getTooTip = ""){
      boolComp = (thset.get_boolean(getBool) == thset.get_default_value(getBool).unpack());
      getLbl =  boolComp ? getLbl :
      `<i>${getLbl}</i>`
      tootext = boolComp ? "" : "The Value is Changed"
      whichLbl = new Gtk.Label({label: getLbl, use_markup: true, xalign: 0, tooltip_text: tootext });  
      whichVlue = new Gtk.Switch({active: thset.get_boolean(getBool), tooltip_text: getTooTip });
      whichVlue.connect('notify::active', (widget, whichVlue) => {
        thset.set_boolean(getBool, widget.active);
      })

      whichHbox.pack_start(whichLbl, true, true, 0);
      whichHbox.add(whichVlue);

      vbox.add(whichHbox);
      vbox.add(new Gtk.Separator({visible : true}));
    }

  	let frame = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, border_width: 10});
  	let label = new Gtk.Label({ label: "<b>Default Settings</b>", use_markup: true, xalign:0});
  	let vbox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, margin_left: 20});
  	let footer = new Gtk.Label({ label: "<b><u>To See the changes Disable and then re-enable the extension</u></b>",use_markup: true, margin_top: 20});

//Refresh time
  let hboxRTime = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, margin_top : 10, margin_bottom : 10});
  vBoxSpinBtn(true, "refreshtime", hboxRTime, "Refresh Time");
  whichSpinBtn = new Gtk.SpinButton({
      adjustment: new Gtk.Adjustment({
          lower: 1.0, upper: 10.0, step_increment: .1, page_increment: 1, page_size: 0,
      }),
      climb_rate: 1,
      digits: 1,
      numeric: true,
    });
  vBoxSpinBtn(false, "refreshtime", hboxRTime);

 //For Modes
  let hboxMode = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, margin_top : 10, margin_bottom : 10});
  vBoxAddSeleCt(true, "mode", hboxMode, "Mode (1-5)", "Choose which mode to load");
  whichVlue.append_text("Mode 1");
  whichVlue.append_text("Mode 2");
  whichVlue.append_text("Mode 3");
  whichVlue.append_text("Mode 4");
  whichVlue.append_text("Mode 5");
  vBoxAddSeleCt(false, "mode", hboxMode);

 //For FontModes
  let hboxFontMode = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, margin_top : 10, margin_bottom : 10});
  vBoxAddSeleCt(true, "fontmode", hboxFontMode, "Font Mode", "Choose which font to display");
  whichVlue.append_text("Default");
  whichVlue.append_text("Smallest");
  whichVlue.append_text("Smaller");
  whichVlue.append_text("Small");
  whichVlue.append_text("Large");  
  vBoxAddSeleCt(false, "fontmode", hboxFontMode);

//For Vertical Alignment
	let hboxVertical = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, margin_top : 10, margin_bottom : 10});
  vBoxAddTgglBtn(hboxVertical, "Vertical Align", "isvertical", "Changing it will toggle Vertical Alignment");

//For Default sigma View
	let hboxToggleBool = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, margin_top : 10, margin_bottom : 10});
  vBoxAddTgglBtn(hboxToggleBool, "Toggle Right Click Behaviour", "togglebool", "Enabling it will show sigma by default");

//For Toggling Old Icons
  let hboxOldIcons = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, margin_top : 10, margin_bottom : 10});
  vBoxAddTgglBtn(hboxOldIcons, "Display Old Icons", "useoldicon", "Enabling it will show Old Icons of simplenetspeed");

//For Lock Mouse Actions
  let hboxLckMuseAct = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, margin_top : 10, margin_bottom : 10});
  vBoxAddTgglBtn(hboxLckMuseAct, "Lock Mouse Actions", "lockmouseactions", "Enabling it will Lock Mouse Actions");

	frame.add(label);
	frame.add(vbox);
	frame.add(footer);
	frame.show_all();
	
	return frame;
  }
}