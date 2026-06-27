export const chars = ["█", "▓", "▒", "░", "▤", "▥", "▦", "▩", " "];
export const tools = ["✎", "▣", "✖"];
export const invisibleChar = "◦";
 
export let Height = 40;
export let Width = 70;
export let selectedChar = "█";
export let selectTool = "✎";
export let painting = false;
export let layersArray = [];
export let selectLayer = 1;
 
export function setSelectedChar(val) { selectedChar = val; }
export function setSelectTool(val) { selectTool = val; }
export function setPainting(val) { painting = val; }
export function setSelectLayer(val) { selectLayer = val; }
export function setLayersArray(val) { layersArray = val; }