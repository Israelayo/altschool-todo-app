import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuToggle() {
    setMenuOpen((open) => !open);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <NavLink to="/" className="navbar__logo" onClick={closeMenu}>
          TodoApp
        </NavLink>
        <button
          className="navbar__toggle"
          onClick={handleMenuToggle}
          aria-label="Toggle navigation menu"
        >
          <span className="navbar__hamburger"></span>
        </button>
      </div>
      <ul className={`navbar__links${menuOpen ? " navbar__links--open" : ""}`}>
        <li>
          <NavLink to="/" className="navbar__link" onClick={closeMenu} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/todos" className="navbar__link" onClick={closeMenu}>
            Todos
          </NavLink>
        </li>
        <li>
          <NavLink to="/test-error" className="navbar__link" onClick={closeMenu}>
            Test Error
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;