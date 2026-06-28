import { Height, Width, invisibleChar } from "./state.js";
 
const clearGrid = document.querySelector('#clearGrid');
 
export function displayClearGrid() {
    clearGrid.innerHTML = "";
    let content = "";
    for (let h = 0; h < Height; h++) {
        content += "<tr>";
        for (let w = 0; w < Width; w++) {
            content += `<td id="${h}-${w}" data-x="${w}" data-y="${h}"><span class="cell">${invisibleChar}</span></td>`;
        }
        content += "</tr>";
    }
    clearGrid.innerHTML = content;
}
 
export function displayPictureGrid(layerTable) {
    layerTable.innerHTML = "";
    let content = "";
    for (let h = 0; h < Height; h++) {
        content += "<tr>";
        for (let w = 0; w < Width; w++) {
            content += `<td id="${h}-${w}" data-x="${w}" data-y="${h}"><span class="cell"> </span></td>`;
        }
        content += "</tr>";
    }
    layerTable.innerHTML = content;
}
 