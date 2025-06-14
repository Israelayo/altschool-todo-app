import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <main style={{ padding: "2em", textAlign: "center" }}>
      <h2>Something went wrong</h2>
      <p>Sorry, an unexpected error occurred.</p>
      <div style={{ margin: "1em 0" }}>
        <button onClick={() => window.location.reload()}>Refresh Page</button>
      </div>
      <div>
        <Link to="/" style={{ color: "#0d6efd" }}>
          &larr; Back to Home
        </Link>
      </div>
    </main>
  );
}