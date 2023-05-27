# ZeroPingTerminals
Zero Ping Terminals for Hypixel Skyblock. Moved to it's own module to reduce the effort of updating Bloom module.

Config Command: /zeroping

## How it works
When you click an item in a terminal, the window ID of the current inventory is sent with that click packet. If you send a click with a window ID which doesn't match the server's, then the server discards that click and it does not register.

In terminals, when you click an item you would normally have to wait for the server to respond before you are able to click the next item, since the server response contains a new window ID, making terminals fully dependent on the player's ping. 

Zero ping terminals increments that window ID itself, meaning you don't have to wait for the server to respond before being able to click a new item.

## NOTE: Although nobody has been banned for using Zero Ping Terminals, it is not impossible for future anticheat updates to make it unsafe. Use at own risk.
If zero ping terminals ever does become unsafe to use, I will release an update as soon as possible letting users know not to use it.