import React from "react";
import './LogForm.css'

const LogForm = () => {
  return (
    <div>
      <form className="logform">
        <label htmlFor="image">Image</label>
        <input name="image" type="file" />
        <label htmlFor="visitDate">Visit Date</label>
        <input name="visitDate" type='date'/>
        <label htmlFor="rating">Rating</label>
        <input name="rating" placeholder="Enter from 1 to 10"/>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default LogForm;
