# Net speed Simplified
*Gnome extension to show network speed*

> Forked from : [Simple Net speed](https://github.com/biji/simplenetspeed)

#### Changelog for v18 : 
- [x] Reduce Refresh time to 1 second
- [x] Supports GNOME SHELL 3.38
- [x] Centred and more cleaner ui
- [x] Changed <del>Kbps</del> to kbp/s
- [x] New sigma sign that respects vertical alignment(old: ∑ , new: Σ)
- [x] Added space b/w speed and their units
- [x] Human readable stylesheet following [KISS](https://en.wikipedia.org/wiki/KISS_principle) principle and [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

#### Todo : 
- [x] Right Click to show total data used

**Left click to change modes:**

1. Total net speed in bits per second
1. Total net speed in Bytes per second
1. Up & down speed in bits per second
1. Up & down speed in Bytes per second
1. Total of downloaded in Bytes (Right click to reset counter)

**Right click to toggle total data usage, Right click on total data usage mode to reset counter**

**Middle click to change font size**

* Installation using terminal:
    - to install  
    ```git clone https://github.com/prateekmedia/netspeedsimplified ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension```
    - to load extension  
       Press ```Alt+F2``` then type ```r``` and ```hit enter```.
    - to enable  
    ```Enable manually using extensions app```
    - to disable  
    ```Disable manually using extensions app```
    - to reinstall or update this extension  
    ```rm -rf ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension && git clone https://github.com/prateekmedia/netspeedsimplified ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension```
    - to remove  
    ```Remove manually using extensions app```  
    or  
    ```rm -rf ~/.local/share/gnome-shell/extensions/netspeedsimplified@prateekmedia.extension```  
