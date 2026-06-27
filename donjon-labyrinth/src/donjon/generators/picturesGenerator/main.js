import { displayClearGrid } from "./grid.js";
import { addLayer, layersDisplay } from "./layers.js";
import { displayTool, displayCharacter } from "./tools.js";
import { initEvents } from "./events.js";
 
displayTool();
displayCharacter();
displayClearGrid();
addLayer();
layersDisplay();
initEvents();
 
 