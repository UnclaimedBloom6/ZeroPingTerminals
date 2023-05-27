import { Terminal, colorOrder, isEnchanted, setEnchanted, setPaneToGreen } from "../Bloom/utils/Utils"
import { sendWindowClick } from "../BloomCore/utils/Utils"
import TerminalSolver from "../Bloom/features/TerminalSolver"
import config from "./config"


let windowId = null
let enchantedSlots = []
let greenPanes = []
let paneMetas = {}

const incrementPane = (slot, meta, reverse) => Player.getContainer().getStackInSlot(slot).setDamage(colorOrder[(colorOrder.length+colorOrder.indexOf(meta)+(reverse ? -1 : 1))%colorOrder.length])
// Removes the slot from the array of correct slots.
const removeSlot = (slot) => {
    const slotIndex = TerminalSolver.correctSlots.indexOf(slot)
    if (slotIndex == -1) return
    TerminalSolver.correctSlots.splice(slotIndex, 1)
}

const doStuff = (gui, event) => {
    let correct = TerminalSolver.correctSlots
    if (!correct.length || !TerminalSolver.terminal) return

    let slot = gui ? gui.getSlotUnderMouse()?.field_75222_d : correct[0]
    if (slot == null) return event ? cancel(event) : null

    if (!correct.includes(slot)) return cancel(event)

    const meta = Player.getContainer()?.getStackInSlot(slot)?.getMetadata()
    const currentWindowID = Player.getContainer().getWindowId()
    if (windowId < currentWindowID) windowId = currentWindowID

    let inv = Player.getContainer()

    let action = (slot) => setEnchanted(slot)

    if ([Terminal.REDGREEN, Terminal.COLORS, Terminal.STARTSWITH].includes(TerminalSolver.terminal)) {
        if (!correct.includes(slot)) return event ? cancel(event) : null
        if (TerminalSolver.terminal == Terminal.REDGREEN) {
            action = setPaneToGreen
            greenPanes.push(slot)
        }
        else enchantedSlots.push(slot)
    }
    if ([Terminal.MAZE, Terminal.NUMBERS].includes(TerminalSolver.terminal)) {
        if (correct[0] !== slot) return event ? cancel(event) : null
        action = setPaneToGreen
        greenPanes.push(slot)
    }
    // The rest of this terminal doesn't work properly.
    if (TerminalSolver.terminal == Terminal.RUBIX) {
        action = null
        if (!inv.getStackInSlot(slot)) return
        incrementPane(slot, meta, false)
        paneMetas[slot] = inv.getStackInSlot(slot)?.getMetadata()

    }

    removeSlot(slot)
    if (event) cancel(event)
    sendWindowClick(windowId, slot, 0)
    lastClick = new Date().getTime()
    try {
        if (action) action(slot)
    }
    catch(e) {}
    windowId++
}

register("guiMouseClick", (mx, my, btn, gui, event) => {
    if (!config.zeroPingTerminals || !TerminalSolver.terminal || btn !== 0 || !TerminalSolver.correctSlots.length) return
    if (TerminalSolver.terminal == Terminal.NUMBERS && !config.numbersZeroPing) return
    if (TerminalSolver.terminal == Terminal.COLORS && !config.colorsZeroPing) return
    if (TerminalSolver.terminal == Terminal.STARTSWITH && !config.startsWithZeroPing) return
    if (TerminalSolver.terminal == Terminal.RUBIX && !config.rubixZeroPing) return
    if (TerminalSolver.terminal == Terminal.REDGREEN && !config.redGreenZeroPing) return
    doStuff(gui, event, btn)
})

register("guiRender", () => {
    if (!TerminalSolver.terminal) return
    // Index out of range error that I cba making an actual fix for
    try { 
        greenPanes.map(a => setPaneToGreen(a))
        enchantedSlots.filter(a => !isEnchanted(a)).map(a => setEnchanted(a))
        Object.keys(paneMetas).map(a => Player.getContainer().getStackInSlot(a).setDamage(paneMetas[a]))
    }
    catch(e) {}
})

register("tick", () => {
    if (TerminalSolver.terminal) return
    greenPanes = []
    enchantedSlots = []
    paneMetas = {}
    windowId = null
})
