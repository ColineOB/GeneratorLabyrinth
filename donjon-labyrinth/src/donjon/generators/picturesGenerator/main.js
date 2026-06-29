import { displayClearGrid } from "./js/grid.js";
import { addLayer, layersDisplay } from "./js/layers.js";
import { displayTool, displayCharacter } from "./js/tools.js";
import { initEvents } from "./js/events.js";
 
displayTool();
displayCharacter();
displayClearGrid();
addLayer();
layersDisplay();
initEvents();

// document.getElementById("addLayer").addEventListener("click", addLayer);
 
 