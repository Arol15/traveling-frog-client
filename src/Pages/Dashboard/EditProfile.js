import React, { useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../config";
import "./EditProfile.css";

const EditProfile = () => {
    const storedUser = JSON.parse(localStorage.getItem("data")).user;

  const [user, setUser] = useState({
      first_name: storedUser.first_name, 
      last_name: storedUser.last_name,
      image: storedUser.image, 
      email: storedUser.email
  })

  const { register, handleSubmit } = useForm();
//   const [message, setMessage] = useState();
  const [inputValue, setInputValue] = useState("");

  // console.log(storedUser)

  const onSubmit = (data, e) => {
    // setMessage({
    //     data: "Update is in progress...",
    //     type: "alert-warning",
    // });
    fetch(`${config.baseUrl}/users/${storedUser.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
        .then((res) => {
            return res.json(); 
        })
        .then(() => {
            // setMessage({
            //     data: "Updated successfully",
            //     type: "alert-success",
            // });
            setTimeout(() => {
            console.log(data.first_name)
            localStorage.setItem("data", JSON.stringify(data));
            setUser()
            }, 2000);
            alert("Updated!")  
        //   e.target.reset();
        })
  };

  return (
    <div className="editprofile-container">
      <div>
        <img src={user.image} alt="pic" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="editprofile-form">
        <label htmlFor="images">Change picture</label>
        <input value="" name="image" type="file" ref={register}></input>
        <label htmlFor="first_name">First Name</label>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          name="first_name"
          ref={register}
          placeholder={user.first_name}
        ></input>
        <label htmlFor="last_name">Last Name</label>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          name="last_name"
          ref={register}
          placeholder={user.last_name}
        ></input>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          name="email" 
          ref={register}
          placeholder={user.email}
        ></input>
        <button>Update</button>
      </form>
    </div>
  );
};

export default EditProfile;
