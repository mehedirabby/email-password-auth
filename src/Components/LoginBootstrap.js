import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "../firebase/Firebase.init";

const auth = getAuth(app);

const LoginBootstrap = () => {
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);
    const form = event.target;
    const name = form.name;
    const email = form.email.value;
    const password = form.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  };
  const handleEmailblur = (event) => {
    const email = event.target.value;
    setUserEmail(email);
    console.log(email);
  };
  const handleForgetPassword = () => {
    if (!userEmail) {
      alert("please enter your email address");
      return;
    }
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        alert("password reset email sent.please check your email");
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  };
  return (
    <div className="w-50 mx-auto">
      <h3 className="text-success">Please Log In</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 ">
          <label for="formGroupExampleInput2" classNameName="form-label">
            Another label
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="write your name"
            name="name"
            required
          />
        </div>
        <div className="mb-3 ">
          <label for="formGroupExampleInput" className="form-label">
            Example label
          </label>
          <input
            onBlur={handleEmailblur}
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
      {success && <p>Successfully Login to the account</p>}
      <p>
        <small>
          New to this Website? please <Link to="/register">Register</Link>
        </small>
      </p>
      <p>
        Forget Password?{" "}
        <button
          type="button"
          onClick={handleForgetPassword}
          className="btn btn-link"
        >
          Please reset
        </button>
      </p>
    </div>
  );
};

export default LoginBootstrap;
