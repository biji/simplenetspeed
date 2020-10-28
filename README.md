<p align="center"><a href="https://extensions.gnome.org/extension/3724/net-speed-simplified/"><img src="https://user-images.githubusercontent.com/41370460/97136201-7d432980-1778-11eb-9c65-4c801a7e8e56.png" height=80px/></a></p>
<h1 align="center">Net speed Simplified</h1>
<h5 align="center"><i>Gnome extension to show network speed</i></h5> 

> GNOME Extensions Link : [prateeksu.gnome/netspeedsimplified](https://extensions.gnome.org/extension/3724/net-speed-simplified/)

> Web Link : [prateekmedia.github/netspeedsimplified](https://prateekmedia.github.io/netspeedsimplified)

> Forked from : [biji.gnome/simplenetspeed](https://github.com/biji/simplenetspeed)

<p align="center"><img alt="Screenshot" src='https://user-images.githubusercontent.com/41370460/97259164-2143d800-1840-11eb-88ae-8deebc513609.png' /> *Screenshots*</p>

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
- [x] Right Click to toggle visibility of total data used //If you will Right click on 5th mode i.e. total speed mode then total speed counter will reset to 0 MB.  
If you want to always show total data used by default then paste below command in terminal (Disclaimer: The code below may break your extension, if it happens then reinstall it)   
`sed -i 's togglebool=false togglebool=true ' ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension/extension.js`  

#### Changelog for New Version : 
- [x] If network is not connected, then after 12 sec display text "--" for 1st mode, "----" for 2nd mode, "------" for 3rd mode, "--------" for 4th mode, for fifth mode it will display total data used(MB), Normal Right click functionality will show total data used except in 5th mode  
- [x] Easy Vertical Aligment for Dash to panel or Big Screen users, to enable this Right Click on any mode continuosly for four times to enable/disable vertical align, to make vertical Alignment default then type  
`sed -i 's isVertical=false isVertical=true ' ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension/extension.js`  
*(If you have vertical align enabled then in mode 5 you will see " -v" written after total net speed)*, 
***Tip : You can also change font size in vertical alignment to your liking by middle mouse click on the speed***  
- [x] Easy Switch to Old Icons from simplenetspeed extension, to enable this Left Click continuosly for six or seven times to enable/disable old icons, to make old icons default  then type  
`sed -i 's useOldIcon=false useOldIcon=true ' ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension/extension.js`  
*(If you have old icons enabled then in mode 5 you will see " -o" written after total net speed)* 

**To Revert Back any changes made using sed -i command then replace false with true and true with false in orignal command, like the above command will become** `sed -i 's useOldIcon=true useOldIcon=false ...` , ***if this doesn't work then reinstall the extension.***

#### Todo : 
***Nothing TODO***

if you face any **issues** you can **[open pull request](https://github.com/prateekmedia/netspeedsimplified/pulls)** and can type your issue with images or error codes

> **Left click to change modes**,  
  
> **Left click continuosly for 6/7 times to toggle old icons like simplenetspeed extension, You will se "-o" written in 5th mode after total download data if this is enabled**
  
*Modes available:*
1. Total net speed in bits per second 
1. Total net speed in Bytes per second
1. Up & down speed in bits per second
1. Up & down speed in Bytes per second
1. Total of downloaded in Bytes (Right click to reset counter)
  
> **Right click to toggle total data usage visiblity, Right click on total data usage mode in reset counter**,  
<p align="center"> <img src='https://user-images.githubusercontent.com/41370460/95724032-78b84480-0c93-11eb-9a2f-07976cb99e19.png' />   =====> To this   <img src='https://user-images.githubusercontent.com/41370460/95724072-8968ba80-0c93-11eb-98c9-e5651167760d.png' /></p>  
  
> **Right click continuosly for 4 times in any mode to toggle vertical alignment, You will se "-v" written in 5th mode after total download data if this is enabled**  
  
> **Middle click to change font size**

<h2 align="center">Installing the extension using terminal:</h2>   

* Please Mark this extension page as Watch if you want to know about the updates
    - ***to install( reload required )( Requirements : git )***    
    ```git clone --single-branch --branch main https://github.com/prateekmedia/netspeedsimplified ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension``` 
    
    *Or*  
    
    You can manually download the zip and paste its content in the folder  
    `~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension`  
    [Create it, if its not there]
    
    - ***to load/reload extension***    
       Press ```Alt+F2``` then type ```r``` and ```hit enter```.
       
    - ***to enable/disable/remove***    
      You can do that manually using extensions app or [website](https://extensions.gnome.org/local) or Using Gnome tweaks tool's extension tab  
      
    - ***to reinstall or update( reload required )( Requirements : git )***   
    ```rm -rf ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension && git clone --single-branch --branch main https://github.com/prateekmedia/netspeedsimplified ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension```
    
    *Or*  
    
    First delete netspeedsimplified@prateekmedia.extension diretory by typing  
    `rm -rf ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension`
    & then
    You can manually download the latest zip and paste its content in the folder   
    `~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension`  
    [Create it, if its not there]
    
    - ***to remove( using Terminal )( reload required )***   
    ```rm -rf ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension```  
