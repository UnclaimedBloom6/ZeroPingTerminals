# ZeroPingTerminals

## WARNING: No longer works.
Hypixel has begun detecting and banning people for using mods which alter how window click packets are send across guis, which means that this module has a very high likelihood of banning you if you use it. For this reason, this repo has been archived. If you wish to view the code to see how it works then you are still free to do so, however it is strongly recommended that you do not attempt to use this in-game.

Zero Ping Terminals for Hypixel Skyblock. Moved to it's own module to reduce the effort of updating Bloom module.

Config Command: /zeroping

## How it works
When you click an item in a terminal, the window ID of the current inventory is sent with that click packet. If you send a click with a window ID which doesn't match the server's, then the server discards that click and it does not register.

In terminals, when you click an item you would normally have to wait for the server to respond before you are able to click the next item, since the server response contains a new window ID, making terminals fully dependent on the player's ping. 

Zero ping terminals increments that window ID itself, meaning you don't have to wait for the server to respond before being able to click a new item.

## WARNING: UNSAFE. Recently, people using zero ping terminals have been getting banned. I am still unsure if zero ping is actually the reason or if it's something else, but for now it is recommended not to use it. Also, the module is currently broken and I do not have the means to fix it currently.
