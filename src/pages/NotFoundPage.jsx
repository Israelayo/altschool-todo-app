import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <main className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">Oops! The page you are looking for doesn’t exist.</p>
        <Link className="notfound-home-link" to="/">
          Go back Home
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;