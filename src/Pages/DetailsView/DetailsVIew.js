import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import List from "./List";
import Map from "./Map";
import "./DetailsView.css";

const DetailsView = () => {
  return (
    <div className="details-container">
      <div className="navbar-container">
        <Dashboard />
      </div>
      <div className="details-body">
        <List />
        <Map />
      </div>
    </div>
  );
};

export default DetailsView;
