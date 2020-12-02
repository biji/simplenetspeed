￼

Net speed Simplified

Gnome extension to show network speed

￼

or Install Manually

Forked from : biji@gnome/simplenetspeed
￼

Screenshots

Current Version : 21

Tested on GNOME 3.36 and 3.38

Whats new in v20 and above:
• [x] Completely revamped whole codebase
• [x] Add Show Upload First button to show upload speed first
• [x] Add Color Customizations to make the extension your own
• ( Thanks to m0hithreddy@github for above features )
• [x] Add Change Font to Monospace option
• [x] Add Hide When Disconnected option

Whats new in v11 and above:
• [x] Add Preference Dialog with lots of default customization.
• [x] Add Lock Mouse Actions button in Preferences to disable any mouse click behaviour.
• [x] Add Position menu(with Advanced option) to pinpoint where to place the indicator on the Panel.
• [x] Add Refresh time field by which you can change refresh time value between 1.0 sec to 10.0 sec.

Feature Highlights :
• [x] Adjustable Refresh time
• [x] Supports GNOME SHELL 3.38 and Backwards compatible
• [x] Changes width accordingly / dynamic width
• [x] More cleaner ui
• [x] Changed Kbps to kbp/s
• [x] New sigma icon that respects vertical alignment(old: ∑ , new: Σ)
• [x] New Speed up and down icons for mode 3 & 4. (old: ↓ and ↑ , new: and )
• [x] Add space b/w speed and their units
• [x] Human readable stylesheet // used min-width and removed repetitive codes
• [x] Used ES6 classes for less code and more efficeint javascript
• [x] Right Click to toggle visibility of total data used //If you will Right click on 5th mode i.e. total speed mode then total speed counter will reset to 0 MB.
• [x] Add Preference Menu to customize the whole extension as you need

Changelog Till v10 :
• [x] Easy Vertical Alignment for Dash to panel or Big Screen users, to enable this Right Click on any mode continuously for four times to enable/disable vertical align or simply go to preferences tab for this extension,
Tip : You can also change font size in vertical alignment to your liking by middle mouse click on the speed
• [x] Easy Switch to Old Icons of simplenetspeed extension, go to preferences tab for this extension to enable/disable old icons.

if you face any issues you can file an issue here

Modes available:
1. Total net speed in bits per second
2. Total net speed in Bytes per second
3. Up & down speed in bits per second
4. Up & down speed in Bytes per second
5. Total of downloaded in Bytes (Right click to reset counter)

Mouse Events:
• Left click to change modes
• Right click to toggle total data usage visibility, Right click on total data usage mode in reset counter
• Right click continuously for 4 times in any mode to toggle vertical alignment
• Middle click to change font size

Installing Manually:
• Please Star this repository and mark it as Watch if you want to know about latest updates.

Quick install

The extension can be quicky installed as following:

$ /bin/bash -c "$(curl -sL https://git.io/Jk28b)"



Installing using Make

The Extension can be managed using Make build system as follows
• 
Getting the sources from repository

$ git clone https://github.com/prateekmedia/netspeedsimplified.git



• 
Running make (install)

$ make install



Likewise extension can be removed
 $ make remove 
OR reinstalled
 $ make reinstall 

You can manage the extension using extensions app or website or Using Gnome tweaks tool's extension tab