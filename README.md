# Net speed Simplified
Gnome extension to show network speed

Forked from : [Simple Net speed](https://github.com/biji/simplenetspeed)

Added : Refresh time is 1 second, supports GNOME SHELL 3.38, centred and more cleaner ui, added kbp/s instead of Kbps, New sigma sign that respects vertical alignment, added space b/w speed and the units, Human readable stylesheet so that anyone with basic knowledge of css can modify it easily following [KISS](https://en.wikipedia.org/wiki/KISS_principle) principle and [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) principle

Todo : hover to show total data used and double right click to reset total data counter instead of single right click

Simply showing network speed. Left click to change modes:

1. Total net speed in bits per second
1. Total net speed in Bytes per second
1. Up & down speed in bits per second
1. Up & down speed in Bytes per second
1. Total of downloaded in Bytes (Right click to reset counter)

* Middle click to change font size

* If you are getting it from source:
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
