import React, { useState, useEffect } from 'react';

const List = () => {
    
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
            // console.log(data)
            setDashboard(data);
          });
      }, []);

    return (
        <div>Hello from list container</div>
    )
}

export default List; 