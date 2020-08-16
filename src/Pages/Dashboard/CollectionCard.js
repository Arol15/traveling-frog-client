import React from 'react';
import config from "../../config";

const CollectionCard = () => {

    fetch(`${config.baseUrl}/collections`, {
        // method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
      //   .then((data) => {
            console.log(data)
        })

    return (
        <div> 
            Hello from Collection card
        </div>
    )
}

export default CollectionCard; 