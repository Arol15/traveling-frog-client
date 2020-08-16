import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Signup.module.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import config from "../../config";

const Signup = () => {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState();
  const history = useHistory();
//   const [formInfo, setFormInfo] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//   });

//   const onChange = (e) => {
//     e.preventDefault();
//     const field = e.target.name;
//     setFormInfo({ ...formInfo, ...{ [field]: e.target.value } });
//   };
  const onSubmit = (data, e) => {
    // debugger;
    //   const data = formInfo
    console.log(data);
    setMessage({
      data: "Registration is in progress...",
      type: "alert-warning",
    });
    fetch(`${config.baseUrl}/session/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then(({error, data}) => {
        const hasError = "error" in data && data.error != null;
        setMessage({
          data: hasError ? data.error : "Registered successfully",
          type: hasError ? "alert-danger" : "alert-success",
        });
          // !error &&
          setTimeout(() => {
            console.log(data)
          localStorage.setItem("data", JSON.stringify(data));

          console.log(data)
          history.push("/dashboard");
        }, 2000);

      !error && e.target.reset();
    });
  };
  return (
    <div
      className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}
    >
      <div className={styles.registrationFormContainer}>
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
            className={`${styles.registrationFormLegend} border rounded p-1 text-center`}
          >
            Registration Form
          </legend>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <div className="form-group">
              <label htmlFor="inputForName">First Name</label>
              <span className="mandatory">*</span>
              <input
                id="inputForFirstName"
                name="first_name"
                type="text"
                className="form-control"
                aria-describedby="Enter your first name"
                placeholder="Enter your first name"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter your first name",
                  },
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 255 characters are allowed",
                  },
                })}
              />
              {errors.first_name && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.first_name.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputForLastName">Last Name</label>
              <span className="mandatory">*</span>
              <input
                id="inputForLastName"
                name="last_name"
                type="text"
                className="form-control"
                aria-describedby="Enter your last name"
                placeholder="Enter your last name"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter your last name",
                  },
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 255 characters are allowed",
                  },
                })}
              />
              {errors.last_name && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.last_name.message}
                </span>
              )}
            </div>
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
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Enter a valid email address",
                  },
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 255 characters are allowed",
                  },
                })}
              />
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
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 255 characters are allowed",
                  },
                })}
              />
              {errors.password && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <button className="btn btn-link">
                <Link to="/login">Cancel</Link>
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Signup;
