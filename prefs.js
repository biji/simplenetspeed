const Gtk = imports.gi.Gtk;

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
    
    function newGtkBox(){
      return new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, margin_top : 10, margin_bottom : 10});
    }

    function vBoxSpinBtn(getDouble, whichHbox, getLbl = "", getTooTip = "", lwer , uper, stpInc = 1, digs = 0, nume = true, pgeInc = 1, pgeSiz = 0, clmrate = 1){
        boolComp = (thset.get_double(getDouble) === thset.get_default_value(getDouble).unpack());
        getLbl =  boolComp ? getLbl :
          `<i>${getLbl}</i>`
        whichLbl = new Gtk.Label({label: getLbl, use_markup: true, xalign: 0, tooltip_text: getTooTip });  
      whichSpinBtn = new Gtk.SpinButton({
        adjustment: new Gtk.Adjustment({
          lower: lwer, upper: uper, step_increment: stpInc, page_increment: pgeInc, page_size: pgeSiz 
        }),
        climb_rate: clmrate,
        digits: digs,
        numeric: nume,
        });
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
    
    function vBoxAddSeleCt(getInt, whichHbox, getLbl, aRray = [], getTooTip = ""){
      boolComp = (thset.get_int(getInt) == thset.get_default_value(getInt).unpack());
      getLbl =  boolComp ? getLbl :
        `<i>${getLbl}</i>`
      tootext = boolComp ? "" : "The Value is Changed"

      whichLbl = new Gtk.Label({label: getLbl, use_markup: true, xalign: 0,tooltip_text: getTooTip});
      whichVlue =  new Gtk.ComboBoxText({halign: Gtk.Align.END,  tooltip_text: tootext });

	    for (i in aRray){
	  	  whichVlue.append_text(aRray[i]);
      } 
      
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

    function vBoxAddTgglBtn(whichHbox, getLbl, getBool, getTooTip = ""){
      boolComp = (thset.get_boolean(getBool) == thset.get_default_value(getBool).unpack());
      getLbl =  boolComp ? getLbl :
      `<i>${getLbl}</i>`
      tootext = boolComp ? "" : "The Value is Changed"
      whichLbl = new Gtk.Label({label: getLbl, use_markup: true, xalign: 0, tooltip_text: getTooTip });  
      whichVlue = new Gtk.Switch({active: thset.get_boolean(getBool), tooltip_text: tootext });
      whichVlue.connect('notify::active', (widget) => {
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
  	let footer1 = new Gtk.Label({ label: "<b><u>To See the changes Disable and then re-enable the extension</u></b>",use_markup: true, margin_top: 20});
  	let footer2 = new Gtk.Label({ label: "<b>Pro Tip : Hover over any Label To know more about it</b>",use_markup: true, margin_top: 20});

	//For Position
	let hboxWPos = newGtkBox();
	vBoxAddSeleCt("wpos", hboxWPos, "Position on the Panel", ["Right","Left","Center"], "Choose where to Place the extension on the Panel");

	//For Position Extras
	let hboxWPosExt = newGtkBox();
	vBoxAddSeleCt("wposext", hboxWPosExt, "Position(Advanced)", ["Prefer Right Side", "Prefer Left Side"], "Choose further where to Place the extension");

	//Refresh time
	let hboxRTime = newGtkBox();
	vBoxSpinBtn("refreshtime", hboxRTime, "Refresh Time", "Change Refresh time value from anywhere b/w 1 to 10", 1.0, 10.0, .1, 1);  

	//For Modes
	let hboxMode = newGtkBox();
	vBoxAddSeleCt("mode", hboxMode, "Mode", ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5"], "Choose which mode to load");

	//For FontModes
	let hboxFontMode = newGtkBox();
	vBoxAddSeleCt("fontmode", hboxFontMode, "Font Mode", ["Default", "Smallest","Smaller","Small","Large"], "Choose which font to display");

	//For Vertical Alignment
	let hboxVertical = newGtkBox();
	vBoxAddTgglBtn(hboxVertical, "Vertical Align", "isvertical", "Changing it will toggle Vertical Alignment");

	//For Default sigma View
	let hboxToggleBool = newGtkBox();
	vBoxAddTgglBtn(hboxToggleBool, "Show Total Download speed", "togglebool", "Enabling it will show sigma by default");

	//For Toggling Old Icons
	let hboxIconset = newGtkBox();
	vBoxAddSeleCt("chooseiconset", hboxIconset, "Choose Icons Set", [" 🡳,  🡱,  Σ ", " ↓,  ↑,  ∑ "], "Choose which icon set to display");

	//For Lock Mouse Actions
	let hboxLckMuseAct = newGtkBox();
	vBoxAddTgglBtn(hboxLckMuseAct, "Lock Mouse Actions", "lockmouseactions", "Enabling it will Lock Mouse Actions");

	frame.add(label);
	frame.add(vbox);
	frame.add(footer1);
	frame.add(footer2);
	frame.show_all();

	return frame;
  }
}
