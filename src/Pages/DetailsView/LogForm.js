import React, {useState} from "react";
import { useForm } from "react-hook-form";
import "./LogForm.css";
import config from "../../config";
import { FaStar } from "react-icons/fa";

// import StarRatingComponent from 'react-star-rating-component';

const LogForm = ({ point, setShowPop, pointsofinterest, setPointsofinterest}) => {
  //   console.log(point)
  const { handleSubmit } = useForm();
  const email = JSON.parse(localStorage.getItem("data")).user.email;
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const onSubmit = (data, e) => {
    // console.log(data)
    setLoading(true)
    const formData = new FormData();
    const file = document.querySelector('input[name="image"]')
    const visitDate = document.querySelector('input[name="visitDate"]')
    const rating = document.querySelector('input[name="rating"]')
    const pointField = document.querySelector('input[name="point"]')
    const email = document.querySelector('input[name="email"]')
    formData.append('image', file.files[0])
    console.log(file.value)
    formData.append('visitDate', visitDate.value)
    // console.log(visitDate.value)
    formData.append('rating', rating.value)
    // console.log(rating.value)
    formData.append('point', pointField.value)
    // console.log(pointField.value)
    formData.append('email', email.value)
    // console.log(email.value)
    fetch(`${config.baseUrl}/visits/entry`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify(data),
      body: formData, 
    })
    const filename = file.value.match(/\w+\.\w+$/gm)
    const s3path = `https://traveling-frog-app.s3.us-east-2.amazonaws.com/${filename}`

    // setTimeout(async() => {
    // const res = await getPointsofinterest()
    // console.log(res)
    setShowPop({})
    const updatedpointsofinterest = [...pointsofinterest]
    // console.log(updatedpointsofinterest)
    // console.log(point.title)
    // console.log(point)
    let visitedpoint = updatedpointsofinterest.find((p) => {
  
      return p.title === point.title
    })
    visitedpoint.visited = true 
    visitedpoint.image = s3path
    visitedpoint.rating = parseInt(rating.value, 10)
    visitedpoint.start_date_visited = visitDate.value

    setPointsofinterest(updatedpointsofinterest)
    //setPointsofinterest(res.pointsofinterest)
    // console.log(data.pointsofinterest)
    alert("Visit added!")
    // }, 2000)
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center">
      <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)} autoComplete='off' className="logform">
        <div className='form-group'>
          <label className='lg' htmlFor="image">Image:  </label>
          <input className='lg'name="image" type="file" accept='/image/jpeg' />
        </div>
        <div>
          <label className='lg'htmlFor="visitDate">Visit Date: </label>
          <input className='lg' name="visitDate" type="date" />
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
                    required
                    onClick={() => setRating(ratingValue)} 
                    value={rating}
                  ></input>
                </label>
              )
            })}
          </div>
        </div>
        <input name="point" value={point.id} type="hidden"></input>
        <input name="email" value={email} type="hidden"></input>
        <button className="btn btn-outline-secondary" disabled={loading}>{loading ? "Loading" : "Submit"}</button>
      </form>
    </div>
  );
};

export default LogForm;
