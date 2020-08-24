import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Rating.css";


const Rating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div className="rating-container">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <lable className="star-label">
            <FaStar
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              className="star"
              size={40}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)} 
            ></input>
          </lable>
        );
      })}
    </div>
  );
};

export default Rating;
