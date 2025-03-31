/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import '../style/Navigations.css';
const Navigations = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // If a token is found, user is logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update state
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">Book Buddy</NavLink>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/books" activeClassName="active">Books</NavLink>
        </li>
        <li>
          <NavLink to="/account" activeClassName="active">Account</NavLink>
        </li>

     
        {!isLoggedIn ? (
          <>
            <li>
              <NavLink to="/login" activeClassName="active">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register" activeClassName="active">Register</NavLink>
            </li>
          </>
        ) : (
          // Show Logout button if the user is logged in
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigations;



