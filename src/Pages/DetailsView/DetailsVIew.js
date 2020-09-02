import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import ListItems from "./List";
import Map from "./Map";
import "./DetailsView.css";

const DetailsView = () => {
  return (
    <div className="details-container">
      <div className="navbar-container">
        <Dashboard />
      </div>
      <div className="details-body">
        <ListItems />
        <Map />
      </div>
    </div>
  );
};

export default DetailsView;
