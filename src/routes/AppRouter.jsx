import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TodoListPage from "../pages/TodoListPage";
import TodoDetailPage from "../pages/TodoDetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import TestErrorPage from "../pages/TestErrorPage";
import Navbar from "../components/Navbar";

function AppRouter() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>     
        <Route path="/" element={<HomePage />} />
        <Route path="/todos" element={<TodoListPage />} />
        <Route path="/todos/:id" element={<TodoDetailPage />} />
        <Route path="/test-error" element={<TestErrorPage />} /> 
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;