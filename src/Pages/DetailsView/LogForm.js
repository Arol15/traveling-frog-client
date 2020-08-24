import React, {useState} from "react";
import { useForm } from "react-hook-form";
import "./LogForm.css";
import config from "../../config";
// import Rating from './Rating'
// import StarRatingComponent from 'react-star-rating-component';

const LogForm = ({ point, setShowPop, setPointsofinterest, getPointsofinterest }) => {
  //   console.log(point)
  const { register, handleSubmit } = useForm();
  const email = JSON.parse(localStorage.getItem("data")).user.email;
  const [loading, setLoading] = useState(false)
  // const [rating, setRating] = useState(null)
//   console.log(email);
  const onSubmit = (data, e) => {
    // console.log(data)
    setLoading(true)
    fetch(`${config.baseUrl}/visits/entry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    setTimeout(async() => {
        const data = await getPointsofinterest()
        setShowPop({})
        setPointsofinterest(data.pointsofinterest)
        alert("Visit added!")
    }, 2000)
  };

  // const onStarClick =(rating, name) => {
  //   setRating();
  // }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="logform">
        <label htmlFor="images">Images: </label>
        <input name="images" type="file" ref={register} />
        <label htmlFor="visitDate">Visit Date: </label>
        <input name="visitDate" type="date" required ref={register} />
        <label htmlFor="rating">Rating: </label>
        <input
          name="rating"
          type="number"
          placeholder="Enter from 1 to 5"
          ref={register({
            required: {
              value: true,
              message: "Please enter your rating",
            },
          })}
        />
        <input name="point" value={point} ref={register} type="hidden"></input>
        <input name="email" value={email} ref={register} type="hidden"></input>
        <button disabled={loading}>{loading ? "Loading" : "Submit"}</button>
      </form>
    </div>
  );
};

export default LogForm;
