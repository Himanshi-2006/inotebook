import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const host = "https://inotebook-backend-dzpx.onrender.com";

    // API call
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // save the authtoken and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Signup Successfully.", "success");
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
    <>
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div
          className="card bg-light shadow p-4"
          style={{ width: "500px", borderRadius: "15px" }}
        >
          <h2 className="text-center mb-4">Create an Account</h2>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>

              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your full name"
                minLength={3} required
                value={credentials.name}
                onChange={onChange}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>

              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                value={credentials.email}
                onChange={onChange}
              />

              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                minLength={5} required
                value={credentials.password}
                onChange={onChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>

              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                placeholder="Confirm password"
                minLength={5} required
                value={credentials.cpassword}
                onChange={onChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
