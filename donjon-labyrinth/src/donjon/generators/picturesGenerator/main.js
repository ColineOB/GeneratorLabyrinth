import { displayClearGrid } from "./js/grid.js";
import { addLayer, layersDisplay } from "./js/layers.js";
import { displayTool, displayCharacter } from "./js/tools.js";
import { initEvents } from "./js/events.js";
import { undoLastAction, redoLastAction } from "./js/history.js";
 
displayTool();
displayCharacter();
displayClearGrid();
addLayer();
layersDisplay();
initEvents();
undoLastAction();
redoLastAction();

document.getElementById("addLayer").addEventListener("click", addLayer);
document.getElementById("undo").addEventListener("click", undoLastAction);
document.getElementById("redo").addEventListener("click", redoLastAction);