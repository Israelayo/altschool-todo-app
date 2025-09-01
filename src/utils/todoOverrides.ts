const EDITED_KEY = "editedApiTodos";
const DELETED_KEY = "deletedApiTodoIds";

export interface Todo {
  id: number | string; // adjust based on your real data
  [key: string]: any;  // allows extra fields
}

// Get all edited API todos
export function getEditedApiTodos(): Todo[] {
  return JSON.parse(localStorage.getItem(EDITED_KEY) || "[]");
}

// Save (add/update) an edited API todo
export function saveEditedApiTodo(editedTodo: Todo): void {
  const edits = getEditedApiTodos();
  const newEdits = edits.filter((t) => t.id !== editedTodo.id);
  newEdits.push(editedTodo);
  localStorage.setItem(EDITED_KEY, JSON.stringify(newEdits));
}

// Remove an edit (if user undo edit)
export function removeEditedApiTodo(id: number | string): void {
  const edits = getEditedApiTodos().filter((t) => t.id !== id);
  localStorage.setItem(EDITED_KEY, JSON.stringify(edits));
}

// Get all deleted API todo ids
export function getDeletedApiTodoIds(): (number | string)[] {
  return JSON.parse(localStorage.getItem(DELETED_KEY) || "[]");
}

// Mark an API todo as deleted
export function deleteApiTodo(id: number | string): void {
  const ids = getDeletedApiTodoIds();
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem(DELETED_KEY, JSON.stringify(ids));
  }
}

// Restore an API todo
export function restoreApiTodo(id: number | string): void {
  const ids = getDeletedApiTodoIds().filter((x) => x !== id);
  localStorage.setItem(DELETED_KEY, JSON.stringify(ids));
}
