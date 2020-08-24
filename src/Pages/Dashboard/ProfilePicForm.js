import React, {useState, useEffect} from "react";
// import { useForm } from "react-hook-form";
import config from '../../config'

const ProfilePicForm = () => {
//   const { register, handleSubmit } = useForm();
  const [image, setImage] =useState("")
  
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("data")).user.email
    fetch(`${config.baseUrl}/users/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": JSON.parse(localStorage.getItem("data")).access_token
      },
    })
      .then((res) => res.json())
      .then(({ error, data }) => {
        console.log(data)
        setImage(data);
      });
  }, []);

  return (
    <div>
      <div>
        <img src={image?.user?.image} alt="pic" />
      </div>
      <form>
       <input type="file" name="file"></input>
       <input type="submmit"></input>
      </form>
    </div>
  );
};
export default ProfilePicForm;
