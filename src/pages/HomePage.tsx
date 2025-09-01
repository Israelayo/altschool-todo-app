import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <main className="home">
      <h1 className="student__detail">Name: Israel Ayomide Olubode</h1>
      <p className="student__id">AltSchool ID: ALT/SOE/024/1804</p>
      <h1 className="home__title">Todo App</h1>
      <p className="home__subtitle">Welcome! Start managing your tasks efficiently.</p>
      <Link className="home__link" to="/todos">Go to Todo List</Link>
    </main>
  );
}

export default HomePage;