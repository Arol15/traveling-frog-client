import React from "react";

const ProfilePicForm = () => {
  return (
    <div>
      <div>
        <img src={storedUser.image} alt="pic" />
      </div>
      <form>
        <label htmlFor="images">Change picture</label>
        <input name="image" type="file" ref={register}></input>
      </form>
    </div>
  );
};
export default ProfilePicForm;
