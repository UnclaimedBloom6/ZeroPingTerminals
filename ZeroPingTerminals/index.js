
import "./ZeroPingTerms"
import "./UpdateChecker"
import config from "./config"

register("command", () => {
    config.openGUI()
}).setName("0ping").setAliases(["zeroping", "zeropingterminals", "zeropingterms", "0p"])