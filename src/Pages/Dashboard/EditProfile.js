import React, {useState, useEffect} from "react";
import config from '../../config'

const EditProfile = () => {
    const [user, setUser] = useState([])

    useEffect(() => {
        const email = JSON.parse(localStorage.getItem("data")).user.email
        fetch(`${config.baseUrl}/users/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("data")).access_token
          },
        })
          .then((res) => 
          res.json())
          .then(({ error, data }) => {
            // console.log(data.user)
            setUser(data.user);
          });
      }, []);
  return (
    <div className="editprofile-container">
      <form>
        <div>
          <img src={user.image} alt="pic" />
        </div>
        <input type="file"></input>
        <input value={user.first_name}></input>
        <input value={user.last_name}></input>
        <input value={user.email}></input>
        <button>Update</button>
      </form>
    </div>
  );
};

export default EditProfile;
