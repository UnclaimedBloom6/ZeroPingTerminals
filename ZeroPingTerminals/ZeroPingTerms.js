import TerminalSolver from "../Bloom/features/TerminalSolver"
import Terminal from "../Bloom/terminals/Terminal"
import { onOpenWindowPacket, onSetSlotReceived, onWindowItemsPacket } from "../BloomCore/utils/Events"
import { ContainerChest, S2FPacketSetSlot, addEnchantToItem, sendWindowClick } from "../BloomCore/utils/Utils"
import config from "./config"

export default new class ZeroPingTerms {
    constructor() {

        this.lastClick = null
        this.updateTermSolverZeroPing()

        register("command", () => this.updateTermSolverZeroPing()).setName("ghdfgkdfhkgjdfgjupdate0pingterminals")
        
        register("guiMouseClick", (mx, my, btn, gui, event) => {
            if (!TerminalSolver.terminal || !TerminalSolver.terminal.solution.length || !config.zeroPingTerminals) return
            const term = TerminalSolver.terminal

            const slot = Client.currentGui.getSlotUnderMouse()
            if (!slot) return
            
            const slotIndex = slot.getIndex()
            if (slotIndex >= term.windowSize) return

            if (btn == 2) return
            if (btn == 1) {
                if (term.type !== Terminal.RUBIX || !config.rubixZeroPing) return

                cancel(event)
                if (!term.solution.includes(slotIndex)) return

                const paneMeta = term.items[slotIndex].getMetadata()
                const ind = term.solution.indexOf(slotIndex)
                const count = term.solution.reduce((a, b) => a + (b == slotIndex ? 1 : 0), 0)
                const newCount = (count + 1) % term.colorOrder.length
                let deleteCount = newCount - count
                if (deleteCount > 0) {
                    for (let i = 0; i < deleteCount; i++) {
                        term.solution.splice(ind, 0, slotIndex)
                    }
                }
                if (deleteCount < 0) term.solution.splice(ind, Math.abs(deleteCount))

                let newMetaInd = (term.getColorIndex(paneMeta) - 1) % term.colorOrder.length
                if (newMetaInd < 0) newMetaInd = (newMetaInd + term.colorOrder.length) % term.colorOrder.length
                const newPaneMeta = term.colorOrder[newMetaInd]

                term.items[slotIndex].setDamage(newPaneMeta)

                return this.clickIndex(term, slotIndex, 1)
            }

            if ((term.type == Terminal.COLORS && config.colorsZeroPing) || (term.type == Terminal.STARTSWITH && config.startsWithZeroPing)) {
                cancel(event)
                if (!term.solution.includes(slotIndex)) return

                term.solution.splice(term.solution.indexOf(slotIndex), 1)
                addEnchantToItem(term.items[slotIndex], 0, 1)
                
                return this.clickIndex(term, slotIndex, 0)
            }
            
            if (term.type == Terminal.NUMBERS && config.numbersZeroPing) {
                const firstIndex = term.solution[0]
                
                cancel(event)
                if (slotIndex !== firstIndex) return
                
                term.solution.shift()
                term.items[slotIndex].setDamage(5)
                
                return this.clickIndex(term, slotIndex, 0)
            }

            if (term.type == Terminal.REDGREEN && config.redGreenZeroPing) {
                cancel(event)
                if (!term.solution.includes(slotIndex)) return

                term.solution.splice(term.solution.indexOf(slotIndex), 1)
                term.items[slotIndex].setDamage(5)


                return this.clickIndex(term, slotIndex, 0)
            }

            if (term.type == Terminal.RUBIX && config.rubixZeroPing) {
                cancel(event)
                if (!term.solution.includes(slotIndex)) return
                
                term.solution.splice(term.solution.indexOf(slotIndex), 1)
                const currentColorIndex = term.getColorIndex(term.items[slotIndex].getMetadata())
                const nextColorIndex = term.colorOrder[(currentColorIndex + 1) % term.colorOrder.length]
                term.items[slotIndex].setDamage(nextColorIndex)


                return this.clickIndex(term, slotIndex, 0)
            }

        })

        // Fix the terminal if it breaks
        register("tick", () => {
            if (!TerminalSolver.terminal || !TerminalSolver.terminal.lastClick || new Date().getTime() - TerminalSolver.terminal.lastClick < 1000) return

            const term = TerminalSolver.terminal
            term.lastClick = null
            term.initializedItems = false

            // ChatLib.chat(`&dResending items!`)
            term.windowID = term.lastKnownWindowID
            term.lastKnownWindowItems.forEach((item, i) => {
                term.items[i] = item
                Player.getContainer().container.func_75141_a(i, item ? item.itemStack : null)
                // Re-copy the item
                term.lastKnownWindowItems[i] = item ? new Item(item.itemStack.func_77946_l()) : null
            })
            term.solve()
        })

        register("guiRender", () => {
            if (!TerminalSolver.terminal) return
            const inv = Player.getContainer()
            if (!(inv.container instanceof ContainerChest)) return
            TerminalSolver.terminal.items.forEach((item, i) => {
                inv.container.func_75141_a(i, item ? item.itemStack : null)
            })
        })

    }

    updateTermSolverZeroPing() {
        TerminalSolver.zeroPingTerminals = []
        if (!config.zeroPingTerminals) return

        if (config.colorsZeroPing) TerminalSolver.zeroPingTerminals.push(Terminal.COLORS)
        if (config.numbersZeroPing) TerminalSolver.zeroPingTerminals.push(Terminal.NUMBERS)
        if (config.redGreenZeroPing) TerminalSolver.zeroPingTerminals.push(Terminal.REDGREEN)
        if (config.rubixZeroPing) TerminalSolver.zeroPingTerminals.push(Terminal.RUBIX)
        if (config.startsWithZeroPing) TerminalSolver.zeroPingTerminals.push(Terminal.STARTSWITH)
    }

    clickIndex(term, slotIndex, clickType) {
        // ChatLib.chat(`Clicking in ${TerminalSolver.terminal.name}: ${term.windowID}`)
        sendWindowClick(term.windowID, slotIndex, clickType)
        term.lastClick = new Date().getTime()
        term.windowID++
        return
    }
}