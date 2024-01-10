import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img1 from "./images/img2.jpg";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  async function save(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8090/api/users/save",
        {
          username: username,
          password: password,
          email: email,
          isAdmin: false, // Assuming user registration isn't for admin
        }
      );

      if (response.data) {
        navigate("/");
      }
    } catch (error) {
      setError("Failed to register");
    }
  }
  const containerStyle = {
    backgroundImage: `url(${img1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100vw",
    height: "100vh",
  };

  return (
    <div style={containerStyle}>
      <div class="container mt-4">
        <div class="card">
          <h1>User Registation</h1>

          <form>
            <div class="form-group">
              <label>User name</label>
              <input
                type="text"
                class="form-control"
                id="employeename"
                placeholder="Enter Name"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>

            <div class="form-group">
              <label>email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div class="form-group">
              <label>password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <button type="submit" class="btn btn-primary mt-4" onClick={save}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
