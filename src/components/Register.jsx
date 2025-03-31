/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/Register.css'; 
const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password) {
      setError("All fields are required.");
      return;
    }

    const user = { firstname, lastname, email, password };

    try {
      const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/account");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h1>Register</h1>
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        {/* First Name Input */}
        <div className="register-input-container">
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder=" "
          />
          <label htmlFor="firstname">First Name</label>
        </div>

        {/* Last Name Input */}
        <div className="register-input-container">
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder=" "
          />
          <label htmlFor="lastname">Last Name</label>
        </div>

        {/* Email Input */}
        <div className="register-input-container">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
          />
          <label htmlFor="email">Email</label>
        </div>

        {/* Password Input */}
        <div className="register-input-container">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
          />
          <label htmlFor="password">Password</label>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Submit Button */}
        <button type="submit" className="register-btn" disabled={!firstname || !lastname || !email || !password}>
          Register
        </button>
      </form>

      <div className="register-link">
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default Register;
