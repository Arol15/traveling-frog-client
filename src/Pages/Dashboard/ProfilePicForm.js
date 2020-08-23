import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import config from '../../config'

const ProfilePicForm = () => {
  const { register, handleSubmit } = useForm();
  const [image, setImage] =useState("")
  
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("data")).user.email
    fetch(`${config.baseUrl}/users/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("data")).access_token
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
        {/* <div className="form-group">
          <label htmlFor="images">Change picture</label>
          <input name="image" type="file" ref={register}></input>
        </div> */}
        <div>
          <button type="submit" className="btn btn-outline-primary">
            Upload an image
          </button>
        </div>
        <div>
          <button className="btn btn-link">
            <Link to="/editprofile">Remove photo</Link>
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProfilePicForm;
