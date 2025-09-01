import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import {
  getEditedApiTodos,
  saveEditedApiTodo,
//   removeEditedApiTodo,
  getDeletedApiTodoIds,
  deleteApiTodo
} from "../utils/todoOverrides";
import "./TodoListPage.css";

// Existing utility functions for addedTodos/localStorage 
function saveAddedTodos(todos) {
  localStorage.setItem("addedTodos", JSON.stringify(todos));
}
function loadAddedTodos() {
  const todos = localStorage.getItem("addedTodos");
  return todos ? JSON.parse(todos) : [];
}
function saveApiTodos(todos) {
  localStorage.setItem("apiTodos", JSON.stringify(todos));
}
function loadApiTodos() {
  const todos = localStorage.getItem("apiTodos");
  return todos ? JSON.parse(todos) : null;
}
async function fetchTodos() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const json = await res.json();
    saveApiTodos(json);
    return json;
  } catch (e) {
    const cached = loadApiTodos();
    if (cached) return cached;
    throw e;
  }
}

function TodoListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;
  const [addedTodos, setAddedTodos] = useState(loadAddedTodos());
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: "", completed: false });
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    saveAddedTodos(addedTodos);
  }, [addedTodos]);

  const { data: todos, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 60 * 60,
  });

  // API todo overrides logic
  const editedApiTodos = getEditedApiTodos();
  const deletedApiTodoIds = getDeletedApiTodoIds();

  // Merge API todos with edits and deletions
  function mergeApiTodos(apiTodos) {
    return apiTodos
      .filter(todo => !deletedApiTodoIds.includes(todo.id)) // filter out deleted
      .map(todo => {
        const edit = editedApiTodos.find(t => t.id === todo.id);
        return edit ? { ...todo, ...edit } : todo;
      });
  }

  // Compose all todos for display (added + merged api)
  const apiTodos = todos ? mergeApiTodos(todos) : [];
  const allTodos = [...addedTodos, ...apiTodos];

  // SEARCH & FILTER LOGIC
  const filteredTodos = allTodos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchText.toLowerCase());
    if (statusFilter === "complete") {
      return matchesSearch && todo.completed;
    }
    if (statusFilter === "incomplete") {
      return matchesSearch && !todo.completed;
    }
    return matchesSearch;
  });

  // Pagination
  const totalTodos = filteredTodos.length;
  const totalPages = Math.max(Math.ceil(totalTodos / todosPerPage), 1);
  const startIdx = (currentPage - 1) * todosPerPage;
  const currentTodos = filteredTodos.slice(startIdx, startIdx + todosPerPage);

  //  Edit/Delete handlers 
  function isUserTodo(todo) {
    return addedTodos.some(t => t.id === todo.id);
  }
//   function isApiTodo(todo) {
//     return !isUserTodo(todo);
//   }

  function openAddModal() {
    setForm({ title: "", completed: false });
    setIsEditing(false);
    setEditId(null);
    setModalOpen(true);
  }
  function openEditModal(todo) {
    setForm({ title: todo.title, completed: todo.completed });
    setIsEditing(true);
    setEditId(todo.id);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  }
  function handleFormChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (isEditing) {
      if (isUserTodo({ id: editId })) {
        setAddedTodos(addedTodos.map(todo =>
          todo.id === editId ? { ...todo, ...form } : todo
        ));
      } else {
        // API todo: save override
        saveEditedApiTodo({ ...form, id: editId });
      }
    } else {
      const newTodo = {
        userId: 1,
        id: Date.now(),
        title: form.title,
        completed: form.completed,
      };
      setAddedTodos([newTodo, ...addedTodos]);
    }
    closeModal();
  }
  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      if (isUserTodo({ id })) {
        setAddedTodos(addedTodos.filter(todo => todo.id !== id));
      } else {
        deleteApiTodo(id);
        window.location.reload();
      }
    }
  }

  // Reset page when search/filter changes
  function handleSearchChange(e) {
    setSearchText(e.target.value);
    setCurrentPage(1);
  }
  function handleStatusFilter(newStatus) {
    setStatusFilter(newStatus);
    setCurrentPage(1);
  }

  if (isLoading) return <div>Loading todos...</div>;
  if (isError) return <div>There was an error fetching todos.</div>;

  return (
    <main className="todo-list">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 className="todo-list__title">All Todos</h2>
        <button onClick={openAddModal} className="add-todo-btn">+ Add Todo</button>
      </div>
      <Link to="/" style={{ marginBottom: "1em", display: "inline-block" }}>
        &larr; Back to Home
      </Link>

      {/* SEARCH & FILTER UI */}
      <div className="todo-list__filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={handleSearchChange}
          className="todo-list__search"
        />
        <div className="todo-list__status-filters">
          <button
            className={`todo-list__filter-btn${statusFilter === "all" ? " active" : ""}`}
            onClick={() => handleStatusFilter("all")}
          >All</button>
          <button
            className={`todo-list__filter-btn${statusFilter === "complete" ? " active" : ""}`}
            onClick={() => handleStatusFilter("complete")}
          >Complete</button>
          <button
            className={`todo-list__filter-btn${statusFilter === "incomplete" ? " active" : ""}`}
            onClick={() => handleStatusFilter("incomplete")}
          >Incomplete</button>
        </div>
      </div>

      {/* Modal for Add/Edit Todo */}
      <Modal open={modalOpen} onClose={closeModal}>
        <h3>{isEditing ? "Edit Todo" : "Add New Todo"}</h3>
        <form onSubmit={handleFormSubmit} className="todo-form">
          <label>
            Title:
            <input style={{outline: "none"}}
              name="title"
              value={form.title}
              onChange={handleFormChange}
              required
              autoFocus
            />
          </label>
          <label style={{ marginTop: "1em" }}>
            <input
              type="checkbox"
              name="completed"
              checked={form.completed}
              onChange={handleFormChange}
            />
            Completed
          </label>
          <div style={{ marginTop: "1em", display: "flex", gap: "1em" }}>
            <button type="submit" className="add-todo-submit-btn">{isEditing ? "Save" : "Add"}</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </Modal>

      <ul className="todo-list__items">
        {currentTodos.map((todo) => (
          <li className="todo-list__item" key={todo.id}>
            <Link className="todo-list__item-link" to={`/todos/${todo.id}`}>
              {todo.title}
            </Link>
            {todo.completed ? (
              <span className="todo-list__status todo-list__status--done">✓ Done</span>
            ) : (
              <span className="todo-list__status">⏳ Not done</span>
            )}
            <span className="todo-list__actions">
              <button
                className="todo-list__edit-btn"
                onClick={() => openEditModal(todo)}
                title="Edit"
              >
                ✏️
              </button>
              <button
                className="todo-list__delete-btn"
                onClick={() => handleDelete(todo.id)}
                title="Delete"
              >
                🗑️
              </button>
            </span>
          </li>
        ))}
      </ul>
      {filteredTodos.length === 0 && (
        <div style={{ margin: "2em 0", textAlign: "center", color: "#888" }}>
          No todos found.
        </div>
      )}

       {/* Pagination controls  */}
      <div className="todo-list__pagination">
        <button
          className="todo-list__page-btn"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="todo-list__page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="todo-list__page-btn"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
}

export default TodoListPage;