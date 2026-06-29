
import { selectedChar, Width, Height } from "./state.js";
import { getActiveLayer } from "./layers.js";
 
export function getCellTd(x, y) {
    if (x < 0 || y < 0 || x >= Width || y >= Height) return null;
    const activeLayer = getActiveLayer();
    if (!activeLayer) return null;
    return activeLayer.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
}
 
export function getCharAt(x, y) {
    const td = getCellTd(x, y);
    if (!td) return null;
    const span = td.querySelector(".cell");
    return span ? span.textContent : null;
}
 
export function setCharAt(x, y, ch) {
    const td = getCellTd(x, y);
    if (!td) return;
    const span = td.querySelector(".cell");
    if (span && span.textContent !== ch) {
        span.textContent = ch;
        span.style.backgroundColor = ch === " " ? "transparent" : "white";
    }
}
 
export function paint(target) {
    console.log("paint called with:", target, selectedChar);
    if (!target || !target.classList.contains("cell")) return;
    if (target.textContent === selectedChar) return;
    target.textContent = selectedChar;
    target.parentElement.style.backgroundColor = "white";
}
 
export function deleteChar(target) {
    if (!target || !target.classList.contains("cell")) return;
    target.textContent = " ";
    target.parentElement.style.backgroundColor = "transparent";
}
 