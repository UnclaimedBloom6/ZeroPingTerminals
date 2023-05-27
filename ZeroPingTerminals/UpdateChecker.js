import request from "../requestV2"
import config from "./config"
import { githubLink, zeroPingData } from "./utils"

register("tick", () => {
    if (!config.checkForUpdates || new Date().getTime() - zeroPingData.lastUpdateCheck < 1.2e6) return
    zeroPingData.lastUpdateCheck = new Date().getTime()
    zeroPingData.save()

    const moduleMetadata = JSON.parse(FileLib.read("ZeroPingTerminals", "metadata.json"))
    const currentVersion = moduleMetadata.version

    request({url: "https://raw.githubusercontent.com/UnclaimedBloom6/ZeroPingTerminals/main/api.json", json: true}).then(data => {
        const latestVersion = data.latestVersion
        if (currentVersion == latestVersion) return

        const changeLogText = data.changelog.reduce((a, b) => a + `\n &7- ${b}`, `&6&nChangelog`)

        new Message(
            `&9&m${ChatLib.getChatBreak(" ")}\n`,
            `&aA new version of &6Zero Ping Terminals &ais available!\n`,
            `\n`,
            new TextComponent(`&7Changelog: &8(Hover)\n`).setHover("show_text", changeLogText),
            new TextComponent(`&aClick here to go to the Github page!\n`).setClick("open_url", githubLink).setHover("show_text", githubLink),
            `&9&m${ChatLib.getChatBreak(" ")}`
        ).chat()

    })
})