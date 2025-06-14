import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getEditedApiTodos,
  getDeletedApiTodoIds
} from "../utils/todoOverrides";
import "./TodoDetailPage.css"; 


// Loads user-added todos from localStorage.
function loadAddedTodos() {
  const todos = localStorage.getItem("addedTodos");
  return todos ? JSON.parse(todos) : [];
}
function fetchTodo(id) {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then((res) => res.json());
}

function TodoDetailPage() {
  const { id } = useParams();
  const todoId = parseInt(id, 10);

    // User-added todos
  const addedTodos = loadAddedTodos();
  const userTodo = addedTodos.find((t) => t.id === todoId);

  
  // API todo overrides
  const editedApiTodos = getEditedApiTodos();
  const deletedApiTodoIds = getDeletedApiTodoIds();

  // Edited version
  const editedApiTodo = editedApiTodos.find(t => t.id === todoId);

   // If not found in user-added, fetch from API (unless deleted)
  const { data: apiTodo, isLoading, isError } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTodo(id),
    enabled: !userTodo && !editedApiTodo && !deletedApiTodoIds.includes(todoId),
  });

  // Final todo to display
  let todo = userTodo || editedApiTodo || apiTodo;

  if (isUserApiTodoDeleted(todoId, userTodo)) return (
    <main className="todo-detail__notfound">
      <h2>Todo not found</h2>
      <Link to="/todos">&larr; Back to Todos</Link>
    </main>
  );

    
  if (!userTodo && !editedApiTodo && isLoading) return <div>Loading todo details...</div>;
  if (!userTodo && !editedApiTodo && isError) return <div>Could not fetch todo details.</div>;
  if (!todo?.id) return <div>Todo not found.</div>;

  return (
    <main className="todo-detail">
      <h2 className="todo-detail__title">Todo Details</h2>
      <p><strong>ID:</strong> {todo.id}</p>
      <p><strong>Title:</strong> {todo.title}</p>
      <p>
        <strong>Status:</strong>{" "}
        {todo.completed ? (
          <span className="todo-detail__status--completed">Completed</span>
        ) : (
          <span className="todo-detail__status--not-completed">Not Completed</span>
        )}
      </p>
      <p><strong>User ID:</strong> {todo.userId}</p>
      <Link to="/todos" className="todo-detail__back-link">
        &larr; Back to Todo List
      </Link>
    </main>
  );
}

function isUserApiTodoDeleted(todoId, userTodo) {
  if (userTodo) return false;
  const ids = getDeletedApiTodoIds();
  return ids.includes(todoId);
}

export default TodoDetailPage;