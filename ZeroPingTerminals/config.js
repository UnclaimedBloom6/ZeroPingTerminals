import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @SliderProperty,
    @NumberProperty,
} from '../Vigilance/index';

@Vigilant("ZeroPingTerminals", "ZeroPingTerminals")

class Config {
    constructor() {
        this.initialize(this)
        this.setCategoryDescription("General", 
            `
            &6&lZero Ping Terminals

            `
        )

    }
    // ---------------------------------------------------------------
    // General

    @SwitchProperty({
        name: "&a&lZero Ping Terminals",
        description: `
        Removes the delay caused by ping when clicking on terminals, making it feel like you have zero ping.

        &8- Originally created by Alon1396 in the AlonAddons module

        &cWARNING: Currently, the chances of getting banned for this is virtually 0, however if Hypixel's anticheat updates to try and prevent exploiting terminals then this could cause false bans. Use at own risk.

        &cTerminal Solvers need to be enabled in Bloom Module for Zero Ping Terminals to work.
        `,
        category: "General"
    })
    zeroPingTerminals = false;

    @SwitchProperty({
        name: "&6Check For Updates",
        description: "Checks for new versions of Zero Ping Terminals on github and notifies you in chat when a new version is available.",
        category: "General"
    })
    checkForUpdates = true;

    @SwitchProperty({
        name: "Colors",
        description: "Toggle zero ping being used for the colors terminal.",
        category: "General",
        subcategory: "Individual Terminals"
    })
    colorsZeroPing = true;

    @SwitchProperty({
        name: "Starts With",
        description: "Toggle zero ping being used for the 'starts with' terminal.",
        category: "General",
        subcategory: "Individual Terminals"
    })
    startsWithZeroPing = true;

    @SwitchProperty({
        name: "Numbers",
        description: "Toggle zero ping being used for the numbers terminal.",
        category: "General",
        subcategory: "Individual Terminals"
    })
    numbersZeroPing = true;

    @SwitchProperty({
        name: "Red Green",
        description: "Toggle zero ping being used for the red green terminal.",
        category: "General",
        subcategory: "Individual Terminals"
    })
    redGreenZeroPing = true;

    @SwitchProperty({
        name: "Rubix",
        description: "Toggle zero ping being used for the rubix terminal (Make all the same color).",
        category: "General",
        subcategory: "Individual Terminals"
    })
    rubixZeroPing = true;

}
export default new Config()