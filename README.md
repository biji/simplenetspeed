<p align="center"><a href="https://extensions.gnome.org/extension/3724/net-speed-simplified/"><img src="https://user-images.githubusercontent.com/41370460/97136201-7d432980-1778-11eb-9c65-4c801a7e8e56.png" height=80px alt="NSS Logo"/></a></p>
<h1 align="center">Net speed Simplified</h1>
<h5 align="center"><i>Gnome extension to show network speed</i></h5>

[<img src="https://raw.githubusercontent.com/andyholmes/gnome-shell-extensions-badge/master/get-it-on-ego.svg?sanitize=true" height="100" alt="Get it on GNOME Extensions">](https://extensions.gnome.org/extension/3724/net-speed-simplified/) or [Install Manually](#installing-manually)

> Special Thanks to : [m0hithreddy.github](https://github.com/m0hithreddy) for completely revamping the whole codebase  

> Forked from : [biji.gnome/simplenetspeed](https://github.com/biji/simplenetspeed)

<p align="center"><img src='https://raw.githubusercontent.com/prateekmedia/netspeedsimplified/main/screenshoot.png' width="500px"  alt="Screenshot"/>

*Screenshots*

 *Above Screenshot is with Adwaita Dark theme*</p>

**Current Version** : ***21***

***Tested on GNOME 3.36 and 3.38***

#### Whats new in v11 and above:
- [x] Add Preference Dialog with lots of default customization.
- [x] Add Lock Mouse Actions button in Preferences to disable any mouse click behaviour.
- [x] Add Position menu(with Advanced option) to pinpoint where to place the indicator on the Panel.
- [x] Add Refresh time field by which you can change refresh time value between 1.0 sec to 10.0 sec.
- [x] Add Show Upload First button to show upload speed first

#### Feature Highlights :
- [x] Adjustable Refresh time
- [x] Supports GNOME SHELL 3.38 and Backwards compatible
- [x] Changes width accordingly / dynamic width
- [x] More cleaner ui
- [x] Changed <del>Kbps</del> to kbp/s
- [x] New sigma icon that respects vertical alignment(old: ∑ , new: Σ)
- [x] New Speed up and down icons for mode 3 & 4. (old: ↓ and ↑ , new: 🡳 and 🡱)
- [x] Add space b/w speed and their units
- [x] Human readable stylesheet // used min-width and removed repetitive codes
- [x] Used ES6 classes for less code and more efficeint javascript
- [x] Right Click to toggle visibility of total data used //If you will Right click on 5th mode i.e. total speed mode then total speed counter will reset to 0 MB.
- [x] Add Preference Menu to customize the whole extension as you need

#### Changelog Till v10 :
- [x] If network is not connected, then after 12 sec display text "--" for 1st mode, "----" for 2nd mode, "------" for 3rd mode, "--------" for 4th mode, for fifth mode it will display total data used(MB), Normal Right click functionality will show total data used except in 5th mode  
- [x] Easy Vertical Alignment for Dash to panel or Big Screen users, to enable this Right Click on any mode continuously for four times to enable/disable vertical align or simply go to preferences tab for this extension,  
***Tip : You can also change font size in vertical alignment to your liking by middle mouse click on the speed***  
- [x] Easy Switch to Old Icons of simplenetspeed extension, go to preferences tab for this extension to enable/disable old icons.  

if you face any **issues** you can **[file an issue](https://github.com/prateekmedia/netspeedsimplified/issues)** with images or error codes

> **Left click to change modes**,  


*Modes available:*
1. Total net speed in bits per second
1. Total net speed in Bytes per second
1. Up & down speed in bits per second
1. Up & down speed in Bytes per second
1. Total of downloaded in Bytes (Right click to reset counter)

> **Right click to toggle total data usage visibility, Right click on total data usage mode in reset counter**,  
<p align="center"> <img src='https://user-images.githubusercontent.com/41370460/95724032-78b84480-0c93-11eb-9a2f-07976cb99e19.png' /> After right click => <img src='https://user-images.githubusercontent.com/41370460/95724072-8968ba80-0c93-11eb-98c9-e5651167760d.png' /></p>  

> **Right click continuously for 4 times in any mode to toggle vertical alignment**  

> **Middle click to change font size**

<h2 align="center">Installing Manually:</h2>   

* Please Star this repository and mark it as Watch if you want to know about latest updates.
  
## Quick install
The extension can be quicky installed as following:

    $ /bin/bash -c "$(curl -sL https://git.io/Jk28b)"


## Installing using Make
The Extension can be managed using Make build system as follows

* Getting the sources from repository

      $ git clone https://github.com/prateekmedia/netspeedsimplified.git

* Running make (install)

      $ make install

Likewise extension can be removed  
```$ make remove```  
OR reinstalled  
```$ make reinstall```  


You can manage the extension using extensions app or [website](https://extensions.gnome.org/local) or Using Gnome tweaks tool's extension tab  
