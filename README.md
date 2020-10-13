# Net speed Simplified
*Gnome extension to show network speed*

> Forked from : [Simple Net speed](https://github.com/biji/simplenetspeed)

#### Changelog for v18 : 
- [x] Reduce Refresh time to 1 second
- [x] Supports GNOME SHELL 3.38
- [x] Changes width accordingly / dynamic width
- [x] Centred and more cleaner ui
- [x] Changed <del>Kbps</del> to kbp/s
- [x] New sigma icon that respects vertical alignment(old: ∑ , new: Σ)
- [x] New Speed up and down icons for mode 2 & 3. (old: ↓ and ↑ , new: 🡳 and 🡱)
- [x] Added space b/w speed and their units
- [x] Human readable stylesheet
- [x] Right Click to toggle visibility of total data used //If you will Right click on 4th mode i.e. total speed mode then total speed counter will reset to 0 MB. 

#### Todo : 
- [ ] Add vertical alignment for Dash to panel users as a 6th mode  

if you face any issues you can open pull request and can type your issue with images or error codes

> **Left click to change modes**
  
*Modes available:*
1. Total net speed in bits per second 
1. Total net speed in Bytes per second
1. Up & down speed in bits per second
1. Up & down speed in Bytes per second
1. Total of downloaded in Bytes (Right click to reset counter)
  
> **Right click to toggle total data usage visiblity, Right click on total data usage mode to reset counter**  
 ### From this   ![Before](https://user-images.githubusercontent.com/41370460/95724032-78b84480-0c93-11eb-9a2f-07976cb99e19.png)   =====> To this   ![After Right Click](https://user-images.githubusercontent.com/41370460/95724072-8968ba80-0c93-11eb-98c9-e5651167760d.png)  
  
> **Middle click to change font size**

* Installation using terminal:
    - to install  
    ```mkdir ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension && git clone https://github.com/prateekmedia/netspeedsimplified ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension```
    - to load/reload extension  
       Press ```Alt+F2``` then type ```r``` and ```hit enter```.
    - to enable  
    ```Enable manually using extensions app/ Using Gnome tweaks extension tab```
    - to disable  
    ```Disable manually using extensions app/ Using Gnome tweaks extension tab```
    - to reinstall or update this extension  
    ```rm -rf ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension && git clone https://github.com/prateekmedia/netspeedsimplified ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension```
    - to remove  
    ```Remove manually using extensions app```  
    or  
    ```rm -rf ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension```  
