import React from "react";
import { useNavigate } from "react-router-dom";

const UserHeaderNav = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Dragger Assignment</div>
        <div className="user-info">
          <ul className="nav-list">
          <li className="nav-item">
              {username && (
                <span className="nav-link">Welcome, {username}!</span>
              )}
            </li>
          </ul>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserHeaderNav;
