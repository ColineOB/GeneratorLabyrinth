import {
    historyStack,
    setHistoryStack,
    historyIndex,
    setHistoryIndex,
    selectLayer,
    setSelectLayer
 } from "./state.js";

export function undoLastAction() {
    if (historyIndex < 0) return;
    const lastEntry = historyStack[historyIndex];

    for (const change of lastEntry.changes) {
        change.span.textContent = change.before;
        change.td.style.backgroundColor = change.beforeColor;
    }

    setHistoryIndex(historyIndex - 1);
}
export function redoLastAction() {
    if (historyIndex >= historyStack.length - 1) return;
    const nextEntry = historyStack[historyIndex + 1];
    for (const change of nextEntry.changes) {
        change.span.textContent = change.after;
        change.td.style.backgroundColor = change.afterColor;
    }

    setHistoryIndex(historyIndex + 1);
}

export function pushHistory(layer, changes) {
    if (historyIndex < historyStack.length - 1) {
        setHistoryStack(historyStack.slice(0, historyIndex + 1));
    }

    const newStack = [...historyStack, { layer, changes }];

    if (newStack.length > 50) {
        newStack.shift();
    } else {
        setHistoryIndex(historyIndex + 1);
    }

    setHistoryStack(newStack);
}