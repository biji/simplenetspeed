<h1 align="center">Net speed Simplified</h1>
<h5 align="center"><i>Gnome extension to show network speed</i></h5> 

> Gnome Extensions Link : [extensions.gnome/netspeedsimplified](https://extensions.gnome.org/review/20012)

> Website Link : [prateekmedia.io/netspeedsimplified](https://prateekmedia.github.io/netspeedsimplified/)

> Forked from : [biji/simplenetspeed](https://github.com/biji/simplenetspeed)

<p align="center"><img src='https://user-images.githubusercontent.com/41370460/96410083-f9cb8a80-1203-11eb-98a0-4cada29306b1.png' /> *Screenshots*</p>

***Tested on GNOME 3.36 and 3.38***

#### Changelog : 
- [x] Reduce Refresh time
- [x] Supports GNOME SHELL 3.38
- [x] Changes width accordingly / dynamic width
- [x] Centred and more cleaner ui
- [x] Changed <del>Kbps</del> to kbp/s
- [x] New sigma icon that respects vertical alignment(old: ∑ , new: Σ)
- [x] New Speed up and down icons for mode 3 & 4. (old: ↓ and ↑ , new: 🡳 and 🡱)
- [x] Added space b/w speed and their units
- [x] Human readable stylesheet // used minimum width and removed repetitive codes
- [x] Used ES6 classes for less code and more efficent javascript
- [x] Right Click to toggle visibility of total data used //If you will Right click on 4th mode i.e. total speed mode then total speed counter will reset to 0 MB. 
- [x] If network is not connected, then after 12 sec display text "--" for 1st mode, "----" for 2nd mode, "------" for 3rd mode, "--------" for 4th mode, for fifth mode it will display total data used(MB), Normal Right click functionality will show total data used except in 5th mode    
- [x] Disabled Vertical Aligment for Dash to panel or Big Screen users, to enable this go to this [branch](https://github.com/prateekmedia/netspeedsimplified/tree/verticalalign)

#### Todo : 
***Nothing TODO***

if you face any **issues** you can **[open pull request](https://github.com/prateekmedia/netspeedsimplified/pulls)** and can type your issue with images or error codes

> **Left click to change modes**
  
*Modes available:*
1. Total net speed in bits per second 
1. Total net speed in Bytes per second
1. Up & down speed in bits per second
1. Up & down speed in Bytes per second
1. Total of downloaded in Bytes (Right click to reset counter)
  
> **Right click to toggle total data usage visiblity, Right click on total data usage mode to reset counter**  
<p align="center"> <img src='https://user-images.githubusercontent.com/41370460/95724032-78b84480-0c93-11eb-9a2f-07976cb99e19.png' />   =====> To this   <img src='https://user-images.githubusercontent.com/41370460/95724072-8968ba80-0c93-11eb-98c9-e5651167760d.png' /></p>  
  
> **Middle click to change font size**

* Installing the extension using terminal:  
    ...**Requirements : git**
    
    - ***to install***    
    ```git clone --single-branch --branch main https://github.com/prateekmedia/netspeedsimplified ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension```
    
    - ***to load/reload extension***    
       Press ```Alt+F2``` then type ```r``` and ```hit enter```.
       
    - ***to enable/disable/remove***    
      You can do that manually using extensions app or [website](https://extensions.gnome.org/local) or Using Gnome tweaks tool's extension tab  
      
    - ***to reinstall or update***   
    ```rm -rf ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension && git clone --single-branch --branch main https://github.com/prateekmedia/netspeedsimplified ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension```
    
    - ***to remove( using Terminal )***   
    ```rm -rf ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension```  
