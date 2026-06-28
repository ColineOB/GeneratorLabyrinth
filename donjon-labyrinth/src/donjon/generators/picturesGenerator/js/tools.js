import { chars, tools, selectedChar, selectTool, setSelectedChar, setSelectTool } from "./state.js";
 
const char = document.querySelector('#char');
const toolsList = document.querySelector('#tools');
 
export function displayCharacter() {
    char.innerHTML = "";
    for (const symbol of chars) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = symbol;
        btn.className = "char-swatch" + (symbol === selectedChar ? " active" : "");
        btn.setAttribute("aria-pressed", symbol === selectedChar ? "true" : "false");
 
        btn.addEventListener("click", () => {
            setSelectedChar(symbol);
            char.querySelectorAll(".char-swatch").forEach(el => {
                el.classList.remove("active");
                el.setAttribute("aria-pressed", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-pressed", "true");
        });
 
        char.appendChild(btn);
    }
}
 
export function displayTool() {
    toolsList.innerHTML = "";
    for (const tool of tools) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = tool;
        btn.className = "tool-swatch" + (tool === selectTool ? " active" : "");
        btn.setAttribute("aria-pressed", tool === selectTool ? "true" : "false");
 
        btn.addEventListener("click", () => {
            setSelectTool(tool);
            toolsList.querySelectorAll(".tool-swatch").forEach(el => {
                el.classList.remove("active");
                el.setAttribute("aria-pressed", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-pressed", "true");
        });
 
        toolsList.appendChild(btn);
    }
}