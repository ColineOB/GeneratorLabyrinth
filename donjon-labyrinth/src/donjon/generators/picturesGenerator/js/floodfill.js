import { Width, Height } from "./state.js";
import { getCharAt, setCharAt } from "./paint.js";
 
export function floodFill(x, y, targetChar, replacementChar) {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    if (targetChar == null) return;
    if (targetChar === replacementChar) return;
 
    const zone = [{ x, y }];
 
    while (zone.length) {
        const { x: cx, y: cy } = zone.shift();
        if (cx < 0 || cy < 0 || cx >= Width || cy >= Height) continue;
        if (getCharAt(cx, cy) !== targetChar) continue;
        setCharAt(cx, cy, replacementChar);
 
        for (const [dx, dy] of dirs) {
            const newX = cx + dx;
            const newY = cy + dy;
            if (newX >= 0 && newY >= 0 && newX < Width && newY < Height && getCharAt(newX, newY) === targetChar) {
                zone.push({ x: newX, y: newY });
            }
        }
    }
}