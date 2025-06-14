import AppRouter from "./routes/AppRouter";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/base.css";
import "./pages/TodoListPage.css";
import "./pages/HomePage.css";


function App() {
  return (
    <div className="app"> 
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </div>
  );
}

export default App;