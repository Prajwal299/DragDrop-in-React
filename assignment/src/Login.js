import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "./images/img2.jpg";
import axios from 'axios';

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("http://localhost:8090/login", {
          username: username,
          password: password,
        });
  
        const role = response.data;
        if (role === "admin") {
          navigate("/admin", { state: { username: username } });
        } else if (role === "user") {
          navigate("/user", { state: { username: username } });
          setError("User logged");
        } else {
          setError("Invalid credentials");
        }
      } catch (error) {
        setError("Failed to log in");
      }
    };
  
    const navigateToRegister = () => {
      navigate("/register");
    };
  
    const containerStyle = {
      backgroundImage: `url(${img1})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100vw",
      height: "100vh",
    };
  

    return(
        <div style={containerStyle} className="login-container">
        <div className="overlay">
          <div className="login-form-container">
            <div className="login-form-box">
              <h2 className="login-heading">Login</h2>
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    className="form-input"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="button-group">
                  <button className="login-button" type="submit">
                    Log In
                  </button>
                  <button
                    className="register-button"
                    type="button"
                    onClick={navigateToRegister}
                  >
                    Register
                  </button>
                </div>
                {error && <div className="error-message">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}
export default Login;