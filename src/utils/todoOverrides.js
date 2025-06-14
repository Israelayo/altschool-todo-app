const EDITED_KEY = "editedApiTodos";
const DELETED_KEY = "deletedApiTodoIds";

// Get all edited API todos
export function getEditedApiTodos() {
  return JSON.parse(localStorage.getItem(EDITED_KEY) || "[]");
}

// Save (add/update) an edited API todo
export function saveEditedApiTodo(editedTodo) {
  const edits = getEditedApiTodos();
  const newEdits = edits.filter(t => t.id !== editedTodo.id);
  newEdits.push(editedTodo);
  localStorage.setItem(EDITED_KEY, JSON.stringify(newEdits));
}

// Remove an edit (if user undo edit)
export function removeEditedApiTodo(id) {
  const edits = getEditedApiTodos().filter(t => t.id !== id);
  localStorage.setItem(EDITED_KEY, JSON.stringify(edits));
}

// Get all deleted API todo ids 
export function getDeletedApiTodoIds() {
  return JSON.parse(localStorage.getItem(DELETED_KEY) || "[]");
}

// Mark an API todo as deleted
export function deleteApiTodo(id) {
  const ids = getDeletedApiTodoIds();
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem(DELETED_KEY, JSON.stringify(ids));
  }
}

// restore an API todo
export function restoreApiTodo(id) {
  const ids = getDeletedApiTodoIds().filter(x => x !== id);
  localStorage.setItem(DELETED_KEY, JSON.stringify(ids));
}