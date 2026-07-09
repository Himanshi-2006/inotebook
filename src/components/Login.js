import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the auth token and redirect it
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Logged in Successfully.", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div
        className="card bg-light shadow p-4"
        style={{ width: "500px", borderRadius: "15px", marginTop: "70px" }}
      >
        <h2 className="text-center mb-4">Login to Continue</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter you email"
              required
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />

            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              minLength={5} required
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;