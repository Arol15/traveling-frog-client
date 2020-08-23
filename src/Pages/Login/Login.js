import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "./Login.module.css";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import config from "../../config";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState();
  const history = useHistory();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("")

  const onSubmit = (data) => {
    setMessage({
      data: "Login is in progress...",
      type: "alert-warning",
    });
    // console.log(data)
    // if (demoUser) {
    //   data = {
    //     email: "test@test.com",
    //     password: "123456"
    //   }
    // } else {
    //   setEmail(data.email)
    //   setPassword(data.password)
    // }
    fetch(`${config.baseUrl}/session/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(({ error, data }) => {
        //   .then((data) => {
        console.log(data);
        setMessage({
          data: error || "Logged in successfully, redirecting...",
          type: error ? "alert-danger" : "alert-success",
        });

        !error &&
          setTimeout(() => {
            // console.log(data)
            localStorage.setItem("data", JSON.stringify(data));
            // console.log(data)
            history.push("/");
          }, 2000);

        // !error && e.target.reset();
      });
  };

  // const loginDemoUser = (event) => {
  //   event.preventDefault();
  //   console.log("loging in the demo user");
  //   onSubmit(event, true);
  // };

  return (
    <div
      className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}
    >
      <div className={styles.loginFormContainer}>
        {message && (
          <div
            className={`alert fade show d-flex ${message.type}`}
            role="alert"
          >
            {message.data}
            <span
              aria-hidden="true"
              className="ml-auto cursor-pointer"
              onClick={() => setMessage(null)}
            >
              &times;
            </span>
          </div>
        )}
        <fieldset className="border p-3 rounded">
          <legend
            className={`${styles.loginFormLegend} border rounded p-1 text-center`}
          >
            Login Form
          </legend>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <div className="form-group">
              <label htmlFor="inputForEmail">Email address</label>
              <span className="mandatory">*</span>
              <input
                id="inputForEmail"
                name="email"
                type="email"
                className="form-control"
                aria-describedby="Enter email address"
                placeholder="Enter email address"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter your email address",
                  },
                })}
              />
              {/**
               * we provide validation configuration for email field above
               * error message are displayed with code below
               */}
              {errors.email && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputForPassword">Password</label>
              <span className="mandatory">*</span>
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputForPassword"
                placeholder="Enter password"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter password",
                  },
                })}
              />
              {errors.password && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-outline-primary">
                Login
              </button>
              <button className="btn btn-link ml-auto">
                <Link to="/signup">New User</Link>
              </button>
            </div>
          </form>
          {/* <button onClick={loginDemoUser} className="btn btn-outline-primary" id="demoUser">
                Demo
              </button> */}
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
