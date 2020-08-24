import React, {useState} from "react";
import { useForm } from "react-hook-form";
import "./LogForm.css";
import config from "../../config";
import { FaStar } from "react-icons/fa";
// import StarRatingComponent from 'react-star-rating-component';

const LogForm = ({ point, setShowPop, setPointsofinterest, getPointsofinterest }) => {
  //   console.log(point)
  const { register, handleSubmit } = useForm();
  const email = JSON.parse(localStorage.getItem("data")).user.email;
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

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

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className="logform">
        <div className='form-group'>
          <label className='lg' htmlFor="images">Images: </label>
          <input className='lg'name="images" type="file" ref={register} />
        </div>
        <div>
          <label className='lg'htmlFor="visitDate">Visit Date: </label>
          <input className='lg' name="visitDate" type="date" required ref={register} />
        </div>
        <div className='rating-container'>
          <div>Rating: </div>
          <div htmlFor='rating' className='stars-container'> 
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1; 
              return (
                <label>
                  <FaStar
                  color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  className="star"
                  size={35}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  />
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    ref={register({
                      required: {
                        value: true,
                        message: "Please re-enter your first name",
                      },
                    })}
                    required
                    onClick={() => setRating(ratingValue)} 
                  ></input>
                </label>
              )
            })}
          </div>
        </div>
        <input name="point" value={point} ref={register} type="hidden"></input>
        <input name="email" value={email} ref={register} type="hidden"></input>
        <button className="btn btn-outline-secondary" disabled={loading}>{loading ? "Loading" : "Submit"}</button>
      </form>
    </div>
  );
};

export default LogForm;
