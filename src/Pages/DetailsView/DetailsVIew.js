import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import ListItems from "./List";
import Map from "./Map";
// import "./DetailsView.css";
import { Grid, Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // detailsContainer: {
  //   width: "100%",
  //   height: "100%",
  // },
  // navContainer: {
  //   height: "10%"
  // },
  // mapContainer: {
  //   height: '100%'
  // }
}));

const DetailsView = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.detailsContainer} >
      <Grid item className={classes.navContainer}>
        <Dashboard />
      </Grid>
      <Grid item container >
        <Grid item xs={3}>
          <ListItems />
        </Grid>
        <Grid item xs={9} className={classes.mapContainer}>
          <Map />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailsView;
