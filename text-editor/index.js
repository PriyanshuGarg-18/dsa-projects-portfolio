// Grab DOM elements
const editor = document.getElementById('editor');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');

// Two stacks for history
const undoStack = [];
const redoStack = [];

let lastValue = '';  // previous snapshot

/* -------- Capture typing -------- */
editor.addEventListener('input', e => {
  undoStack.push(lastValue);      // save old state
  lastValue = e.target.value;     // update tracker
  redoStack.length = 0;           // clear redo history
});

/* -------- Undo -------- */
undoBtn.addEventListener('click', () => {
  if (!undoStack.length) return;          // nothing to undo
  redoStack.push(editor.value);           // push current state to redo
  const prev = undoStack.pop();           // pop last state
  editor.value = prev;                    // revert
  lastValue = prev;
  editor.focus();
});

/* -------- Redo -------- */
redoBtn.addEventListener('click', () => {
  if (!redoStack.length) return;          // nothing to redo
  undoStack.push(editor.value);           // push current state to undo
  const next = redoStack.pop();           // pop redo state
  editor.value = next;                    // apply
  lastValue = next;
  editor.focus();
});
