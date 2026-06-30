import { Width, Height, selectedChar } from "./state.js";
import { getActiveLayer } from "./layers.js";
import { getCharAt, setCharAt, getCellTd } from "./paint.js";
import { pushHistory } from "./history.js";
 
export function floodFill(x, y, targetChar) {
    const changes = [];
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    if (targetChar == null) return;
    if (targetChar === selectedChar) return;
 
    const zone = [{ x, y }];
 
    while (zone.length) {
        const {x: cx, y: cy} = zone.shift();
        if (cx < 0 || cy < 0 || cx >= Width || cy >= Height) continue;
        if (getCharAt(cx, cy) !== targetChar) continue;

        const td = getCellTd(cx, cy);
        if (!td) continue;
        const span = td.querySelector(".cell");
        const beforeColor = td.style.backgroundColor  || "transparent";
        changes.push({ td, span, before: targetChar, beforeColor, after: selectedChar, afterColor: "white" });
        setCharAt(cx, cy, selectedChar);

        for (const [dx, dy] of dirs) {
            const newX = cx + dx;
            const newY = cy + dy;

            if (newX >= 0 && newY >= 0 && newX < Width && newY < Height && getCharAt(newX, newY) === targetChar ) {
                zone.push({x: newX, y: newY});
            
            }
        }
    }
    if (changes.length > 0) {
    pushHistory(getActiveLayer().id, changes);
    }
}