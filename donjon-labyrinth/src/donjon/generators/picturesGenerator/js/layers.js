import { layersArray, selectLayer, setSelectLayer, setLayersArray } from "./state.js";
import { displayPictureGrid } from "./grid.js";
 
const layerstools = document.querySelector('#layers');
const gridContainer = document.querySelector(".grid-container");
 
export function getActiveLayer() {
    return document.getElementById(`Layer ${selectLayer}`);
}
 
export function updateLayersPointerEvents() {
    for (const layer of layersArray) {
        const el = document.getElementById(`Layer ${layer}`);
        if (el) {
            el.style.pointerEvents = layer === selectLayer ? "auto" : "none";
            el.style.zIndex = 2;
        }
    }
}
 
export function layersDisplay() {
    layerstools.innerHTML = "";
    for (const layer of layersArray) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = layer;
        btn.className = "layer-swatch" + (layer === selectLayer ? " active" : "");
        btn.setAttribute("aria-pressed", layer === selectLayer ? "true" : "false");
 
        btn.addEventListener("click", () => {
            setSelectLayer(layer);
            layerstools.querySelectorAll(".layer-swatch").forEach(el => {
                el.classList.remove("active");
                el.setAttribute("aria-pressed", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-pressed", "true");
            updateLayersPointerEvents();
        });
 
        layerstools.appendChild(btn);
    }
}
 
export function addLayer() {
    const newLayer = layersArray.length + 1;
    setLayersArray([...layersArray, newLayer]);
    setSelectLayer(newLayer);
    layersDisplay();
    const newlayer = document.createElement("table");
    newlayer.id = `layer ${newLayer}`;
    newlayer.className = "grid";
    displayPictureGrid(newlayer);
    gridContainer.appendChild(newlayer);
    updateLayersPointerEvents();
}