EXT_HOME=~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension

all: install

install: convenience.js extension.js metadata.json prefs.js stylesheet.css schemas/gschemas.compiled
	#Remove old files(if any)
	rm -rf ${EXT_HOME}
	#Create directory structure
	mkdir -p ${EXT_HOME}
	mkdir -p ${EXT_HOME}/schemas

	#Copy compulsory files
	cp convenience.js extension.js metadata.json prefs.js stylesheet.css ${EXT_HOME}
	cp schemas/gschemas.compiled ${EXT_HOME}/schemas

	#Optional files
	cp LICENSE ${EXT_HOME} 2>/dev/null || true
	cp README.md ${EXT_HOME} 2>/dev/null || true
	cp schemas/org.gnome.shell.extensions.netspeedsimplified.gschema.xml ${EXT_HOME}/schemas 2>/dev/null || true

	#Reloading shell; Sending SIGHUP signal to gnome-shell (equivalent to alt + f2 ; r ; enter)
	busctl --user call org.gnome.Shell /org/gnome/Shell org.gnome.Shell Eval s 'Meta.restart("Restarting…")'

	#Enabling Gnome extension.
	sleep 5
	gnome-extensions enable netspeedsimplified@prateekmedia.extension

remove:
	rm -rf ${EXT_HOME}

	#Reloading shell; Sending SIGHUP signal to gnome-shell (equivalent to alt + f2 ; r ; enter)
	busctl --user call org.gnome.Shell /org/gnome/Shell org.gnome.Shell Eval s 'Meta.restart("Restarting…")'

remove-no-reboot:
	rm -rf ${EXT_HOME}

reinstall: remove-no-reboot install
