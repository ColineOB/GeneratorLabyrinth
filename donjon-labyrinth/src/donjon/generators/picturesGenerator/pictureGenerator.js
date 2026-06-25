const char = document.querySelector('#char');
const clearGrid = document.querySelector('#clearGrid');
const pictureGrid = document.querySelector('#pictureGrid');
const toolsList = document.querySelector('#tools');
const layers = document.querySelector('#layers');


var Height = 40;
var Width = 70;
var selectedChar = "█";
const chars = ["█", "▓", "▒", "░","▤","▥","▦", "▩", " "];
const invisibleChar = "◦"
const tools = ["✎","▣", "✖"];
var selectTool = "✎";
let painting = false;
var layersArray = [1];
var selectLayer = 1;


displayTool();
displayCharacter();
displayClearGrid()
displayPictureGrid();
layersDisplay();

// Picture grid generation
function displayClearGrid() {
    clearGrid.innerHTML = "";
    var content = "";
    for (let h = 0; h < Height; h++) {
        content += "<tr>";
        for (let w = 0; w < Width; w++) {
            content += `<td id="${h}-${w}" data-x="${w}" data-y="${h}"><span class="cell">${invisibleChar}</span></td>`;
        }
        content += "</tr>";
    }
    clearGrid.innerHTML = content;
}
function displayPictureGrid() {
    pictureGrid.innerHTML = "";
    var content = "";
    for (let h = 0; h < Height; h++) {
        content += "<tr>";
        for (let w = 0; w < Width; w++) {
            content += `<td id="${h}-${w}" data-x="${w}" data-y="${h}"><span class="cell"> </span></td>`;
        }
        content += "</tr>";
    }
    pictureGrid.innerHTML = content;
}
// Character selection
function displayCharacter() {
    char.innerHTML = "";
    for (const symbol of chars) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = symbol;
        btn.className = "char-swatch" + (symbol === selectedChar ? " active" : "");
        btn.setAttribute("aria-pressed", symbol === selectedChar ? "true" : "false");
        btn.addEventListener("click", () => {
            selectedChar = symbol;
            char.querySelectorAll(".char-swatch").forEach(el => {
                el.classList.remove("active");
                el.setAttribute("aria-pressed", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-pressed", "true");
            console.log("forme sélectionné :", selectedChar);
        });

        char.appendChild(btn);
    }
}

function isOpaqueChar(ch) {
  return ch === " " || (ch != null && ch.trim() !== "");
}

// tool selection
function displayTool() {
    toolsList.innerHTML = "";
    for (const tool of tools) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = tool;
        btn.className = "tool-swatch" + (tool === selectTool ? " active" : "");
        btn.setAttribute("aria-pressed", tool === selectTool ? "true" : "false");

        btn.addEventListener("click", () => {
        selectTool = tool;
        toolsList.querySelectorAll(".tool-swatch").forEach(el => {
            el.classList.remove("active");
            el.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        console.log("Outil sélectionné :", selectTool);
        });

        toolsList.appendChild(btn);
    }
}

// Painting functionality
function paint(target) {
  if (!target || !target.classList.contains("cell")) return;
  target.textContent = selectedChar;
  target.style.backgroundColor = isOpaqueChar(selectedChar) ? "white" : "transparent";
}

function deleteChar(target) {
  if (!target || !target.classList.contains("cell")) return;
  target.textContent = " ";
  target.style.backgroundColor = "transparent";
}

pictureGrid.addEventListener("mousedown", (e) => {
    const td = e.target.closest("td");
    if (!td) return;
  
    const x = +td.dataset.x;
    const y = +td.dataset.y;
    switch (e.button) {
        case 0:
                if (selectTool === "✎") {
                    painting = true;
                    paint(td.querySelector(".cell"));
                } else if (selectTool === "▣") {
                    const target = getCharAt(x, y);
                    floodFill(x, y, target, selectedChar);
                }
                e.preventDefault();
                break;
        case 1:
            console.log("middle");
            break;
        case 2:
            console.log(e.target.closest(".cell"));
            
            painting = true;
            deleteChar(td.querySelector(".cell"));
            break;
    }
});

pictureGrid.addEventListener("mousemove", (e) => {
    if (!painting  || selectTool !== "✎") return;
    const span = e.target.closest(".cell");
     if (e.buttons === 1) {        
        paint(span);
    } else if (e.buttons === 2) { 
        deleteChar(span);
    }
});

window.addEventListener("mouseup", () => {
  painting = false;
});

// Flood fill algorithm
function floodFill(x, y, targetChar, replacementChar) {
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    if (targetChar == null ) return;
    if (targetChar === replacementChar) return;
    
    const zone = [{ x, y }];
    
    while (zone.length) {
        const {x: cx, y: cy} = zone.shift();
        if (cx < 0 || cy < 0 || cx >= Width || cy >= Height) continue;
        if (getCharAt(cx, cy) !== targetChar) continue;
        setCharAt(cx, cy, replacementChar);

        for (const [dx, dy] of dirs) {
            const newX = cx + dx;
            const newY = cy + dy;

            if (newX >= 0 && newY >= 0 && newX < Width && newY < Height && getCharAt(newX, newY) === targetChar ) {
                zone.push({x: newX, y: newY});
            }
        }
    }
}

// return the TD element at (x,y)
function getCellTd(x, y) {
  if (x < 0 || y < 0 || x >= Width || y >= Height) return null;
  
  return pictureGrid.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
}

// get the character at (x,y)
function getCharAt(x, y) {
  const td = getCellTd(x, y);
  if (!td) return null;
  const span = td.querySelector(".cell");
  return span ? span.textContent : null;
}

// set the character at (x,y)
function setCharAt(x, y, ch) {
  const td = getCellTd(x, y);
  if (!td) return;
  const span = td.querySelector(".cell");
  if (span && span.textContent !== ch) span.textContent = ch;
}

function layersDisplay() {
    layers.innerHTML = "";
    for (const layer of layersArray) {
        console.log("Couche :", layer);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = layer;
        btn.className = "layer-swatch" + (layer === selectLayer ? " active" : "");
        btn.setAttribute("aria-pressed", layer === selectLayer ? "true" : "false");

        btn.addEventListener("click", () => {
        selectLayer = layer;
        layers.querySelectorAll(".layer-swatch").forEach(el => {
            el.classList.remove("active");
            el.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        console.log("Couche sélectionnée :", selectLayer);
        });

        layers.appendChild(btn);
    }
}