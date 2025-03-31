import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./components/Books";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import SingleBook from "./components/SingleBook";
import Navigations from "./components/Navigations";
import './index.css';

const App = () => {
  return (
    <Router>
      <Navigations />
      <div className="app-container">
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<Books />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<SingleBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

