import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import config from "../../config";
import styles from "./EditProfile.module.css";
// import ProfilePicForm from "./ProfilePicForm";

const EditProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("data")).user;
  // console.log(localStorage.getItem("data"))
  const history = useHistory();

  const [user, setUser] = useState({
    first_name: storedUser.first_name,
    last_name: storedUser.last_name,
    image: storedUser.image,
    email: storedUser.email,
  });

  const { register, errors, handleSubmit } = useForm();
  const [message, setMessage] = useState();
  const [inputValue, setInputValue] = useState("");

  // console.log(storedUser);

  const onSubmit = (data, e) => {
    setMessage({
      data: "Update is in progress...",
      type: "alert-warning",
    });
    fetch(`${config.baseUrl}/users/${storedUser.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        setMessage({
          data: "Updated successfully",
          type: "alert-success",
        });
        setTimeout(() => {
          // console.log(data.first_name);
          const alldata = JSON.parse(localStorage.getItem("data"));
          alldata.user = data;
          localStorage.setItem("data", JSON.stringify(alldata));
          console.log(data);
          setUser({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            image: data.image,
          });
          history.push("/");
        }, 2000);
        // alert("Updated!");
        //   e.target.reset();
      });
  };
  //TODO:create a new form component to update pic and also route on backend
  return (
    <div
      className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}
    >
      <div className={styles.editProfileFormContainer}>
       <h3>Edit your profile</h3>
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
        <div className={styles.bothforms}>
          <fieldset>
            {/* <legend
              className={`${styles.editProfileFormLegend} border rounded p-1 text-center`}
            >
              Edit your profile
            </legend> */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                  onChange={(e) => setInputValue(e.target.value)}
                  id="inputForFirstName"
                  name="first_name"
                  type="text"
                  className="form-control"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please re-enter your first name",
                    },
                    minLength: {
                      value: 1,
                      message: "Minimum 1 characters are allowed",
                    },
                    maxLength: {
                      value: 255,
                      message: "Maximum 255 characters are allowed",
                    },
                  })}
                  placeholder={user.first_name}
                ></input>
                {errors.first_name && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.first_name.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  onChange={(e) => setInputValue(e.target.value)}
                  id="inputForLastName"
                  name="last_name"
                  type="text"
                  className="form-control"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please re-enter your last name",
                    },
                    minLength: {
                      value: 1,
                      message: "Minimum 1 characters are allowed",
                    },
                    maxLength: {
                      value: 255,
                      message: "Maximum 255 characters are allowed",
                    },
                  })}
                  placeholder={user.last_name}
                ></input>
                {errors.last_name && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.last_name.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="inputForEmail"
                  name="email"
                  type="email"
                  className="form-control"
                  aria-describedby="Enter email address"
                  value={user.email}
                  // onChange={(e) => setInputValue(e.target.value)}
                  name="email"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please re-enter your email address",
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
                  placeholder={user.email}
                />
                {errors.email && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <button type="submit" className="btn btn-outline-primary">
                  Save Changes
                </button>
                <button className="btn btn-link">
                  <Link to="/">Cancel</Link>
                </button>
              </div>
            </form>
          </fieldset>
          {/* <fieldset>
            <ProfilePicForm />
          </fieldset> */}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
