
import { painting, selectTool, setPainting, currentStroke, setCurrentStroke } from "./state.js";
import { getActiveLayer } from "./layers.js";
import { paint, deleteChar, getCharAt } from "./paint.js";
import { floodFill } from "./floodFill.js";
import { pushHistory } from "./history.js";
 
const gridContainer = document.querySelector(".grid-container");
 
let rafPending = false;
let lastEvent = null;
 
export function initEvents() {
    gridContainer.addEventListener("mousedown", (e) => {
        const activeLayer = getActiveLayer();
        if (!activeLayer || !activeLayer.contains(e.target)) return;
 
        const td = e.target.closest("td");
        if (!td) return;
 
        const x = +td.dataset.x;
        const y = +td.dataset.y;
 
        switch (e.button) {
            case 0:
                if (selectTool === "✎") {
                    setPainting(true);
                    paint(td.querySelector(".cell"));
                } else if (selectTool === "▣") {
                    const target = getCharAt(x, y);
                    floodFill(x, y, target);
                }
                e.preventDefault();
                break;
            case 2:
                setPainting(true);
                deleteChar(td.querySelector(".cell"));
                break;
        }
    });
 
    gridContainer.addEventListener("mousemove", (e) => {
        if (!painting || selectTool !== "✎") return;
        const activeLayer = getActiveLayer();
        if (!activeLayer || !activeLayer.contains(e.target)) return;
 
        lastEvent = e;
        if (rafPending) return;
        rafPending = true;
 
        requestAnimationFrame(() => {
            rafPending = false;
            const span = lastEvent.target.closest(".cell");
            if (lastEvent.buttons === 1) paint(span);
            else if (lastEvent.buttons === 2) deleteChar(span);
        });
    });
 
    window.addEventListener("mouseup", () => {
        setPainting(false);
        if (currentStroke.length > 0) {
        pushHistory(getActiveLayer().id, currentStroke);
        setCurrentStroke([]);
    }
    });
}
 