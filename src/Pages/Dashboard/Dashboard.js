import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import config from "../../config";
import Collections from "./Collections";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const history = useHistory();

  const logout = () => {
    /* eslint-disable */
    const toLogout = confirm("Are you sure to logout ?");
    /* eslint-enable */
    if (toLogout) {
      localStorage.clear();
      history.push("/login");
    }
  };

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
        setDashboard(data);
      });
  }, []);
// debugger
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Traveling Frog
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link cursor-pointer" href="/dashboard">
                Dashboard <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link cursor-pointer"
                onClick={() => logout()}
              >
                Logout
              </a>
            </li>
          </ul>
          <span className="navbar-text">Welcome! {dashboard?.user?.first_name}</span>
        </div>
      </nav>
      <div className="px-3">
        {/* <h1>{dashboard?.user?.last_name}</h1>
        <p>{dashboard?.content}</p> */}
        <Collections />
      </div>
    </>
  );
};

export default Dashboard;
