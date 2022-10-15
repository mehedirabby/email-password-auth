import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import app from "../firebase/Firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const RegisterReactBootstrap = () => {
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleRegisterForm = (event) => {
    event.preventDefault();
    setSuccess(false);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    //upper case password
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setPasswordError("Please provide at lease two upper Case");
      return;
    }
    if (password.length < 6) {
      setPasswordError("passWord Should Be 6 character");
      return;
    }
    if (!/(?=.*[!@#$*])/.test(password)) {
      setPasswordError("Please add at least 1 special character");
      return;
    }
    setPasswordError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        form.reset();
        verifyEmail();
      })
      .error((error) => {
        console.error("error", error);
        passwordError(error.message);
      });
  };
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("please check your email and varify your email address.");
    });
  };

  return (
    <div className="w-25 mx-auto">
      <h3 className="text-primary">Please Register</h3>
      <Form onSubmit={handleRegisterForm}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <p className="text-danger">{setPasswordError}</p>
        {success && <p className="text-success">User Created Successfully</p>}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p>
        {" "}
        <small>
          Already have an account? please <Link to="/login">Log In</Link>
        </small>
      </p>
    </div>
  );
};

export default RegisterReactBootstrap;
