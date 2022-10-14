import React from "react";
import { Link } from "react-router-dom";

const LoginBootstrap = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email;
    const password = form.password;
  };
  return (
    <div className="w-50 mx-auto">
      <h3 className="text-success">Please Log In</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 ">
          <label for="formGroupExampleInput" className="form-label">
            Example label
          </label>
          <input
            type="email"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Your Email"
            name="email"
            required
          />
        </div>
        <div className="mb-3">
          <label for="formGroupExampleInput2" classNameName="form-label">
            Another label
          </label>
          <input
            type="password"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Your Password"
            name="password"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <p>
        <small>
          New to this Website? please <Link to="/register">Register</Link>
        </small>
      </p>
    </div>
  );
};

export default LoginBootstrap;
