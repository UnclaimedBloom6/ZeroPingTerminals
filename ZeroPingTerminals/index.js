
import "./UpdateChecker"
// import ZeroPingTerms from "./ZeroPingTerms"
import config from "./config"


register("command", () => {
    config.openGUI()
}).setName("0ping").setAliases(["zeroping", "zeropingterminals", "zeropingterms", "0p"])