<p align="center"><a href="https://extensions.gnome.org/extension/3724/net-speed-simplified/"><img src="https://raw.githubusercontent.com/prateekmedia/netspeedsimplified/main/images/icon.png" height=80px alt="NSS Logo"/></a></p>
<h1 align="center">Net speed Simplified</h1>
<p align="center"><i><b>A Net Speed extension With Loads of Customization.</b></i></p>

[<img src="https://raw.githubusercontent.com/andyholmes/gnome-shell-extensions-badge/master/get-it-on-ego.svg?sanitize=true" height="100" alt="Get it on GNOME Extensions">](https://extensions.gnome.org/extension/3724/net-speed-simplified/) or [Install Manually](#installing-manually)

<p align="center"><img src='https://raw.githubusercontent.com/prateekmedia/netspeedsimplified/main/images/screenshoot.png' width="500px"  alt="Screenshot"/>

*Screenshots*</p>

**Current Version** : ***22***

***Tested on GNOME 3.36 and 3.38***

#### What's new
- [x] Completely revamped whole codebase PR#4
- [x] Add Show Upload First button to show upload speed first PR#2
- [x] Add Color Customizations to make the extension your own PR#7
- [x] Add *Use Custom Font* button in Preference
- [x] Add *Hide when Disconnected* button in Preference
- [x] Add *Use Shorten Units* button in Preference
- [x] Add *Restore Defaults* button in Preference

#### Features
- [x] Cleaner UI
- [x] Adjustable Refresh rate
- [x] Supports GNOME SHELL 3.38 and Backwards compatible
- [x] Add [Preference](#Feature-Highlights-for-Preferences) Menu for extension customization
- [x] Add *Vertical Alignment* Support
- [x] Add *Two Icon sets* for Indicators

#### Feature Highlights for Preferences
- [x] Add *Lock Mouse Actions* button to Freeze [Mouse Events](#mouse-events)
- [x] Add *Advance Position* menu to pinpoint where to place the indicator on the Panel.
- [x] Add *Refresh time* field by which you can change refresh rate value between 1.0 sec to 10.0 sec.


If you faced an **issue** then you can **[file an issue here](https://github.com/prateekmedia/netspeedsimplified/issues)**
 
#### Modes
1. `Total net speed in b/s, kb/s, ...`
1. `Total net speed in B/s, KB/s, ...`
1. `Up & down speed in b/s, kb/s, ...`
1. `Up & down speed in B/s, KB/s, ...`
1. `Total downloads in B, KB, ... (Right click to reset counter)`

#### Mouse Events
- **Left click**: Cycle through the [modes](#modes).
- **Right click(in first four modes)**: Toggle the visibility of total downloaded.
- **Right click(in fifth mode)**: Reset total downloaded.
- **Right Click(Four consecutive times)**: Toggle through horizantal/vertical alignment.
- **Middle click**: Cycle through the font sizes.

#### *Special Thanks to*
- [biji](https://github.com/biji) for Creating [simplenetspeed](https://github.com/biji/simplenetspeed)
- [m0hithreddy](https://github.com/m0hithreddy) for his support in rewriting extension.js with Clutter and rewritjng readme.md, Adopting Make build system and more..
[Know More](https://github.com/prateekmedia/netspeedsimplified/graphs/contributors)

<h2 align="center">Installing Manually</h2>   
  
### Quick install
For quick install use below command:

    $ bash -c "$(curl -sL https://git.io/Jk28b)"


### Installing using Make
* Step 1 : Getting the sources from repository

      $ git clone https://github.com/prateekmedia/netspeedsimplified.git

* Step 2 : Running make (install)

      $ make install

Likewise extension can be removed  
```$ make remove```  
OR reinstalled  
```$ make reinstall```  


You can manage the extension using extensions app or [website](https://extensions.gnome.org/local)
