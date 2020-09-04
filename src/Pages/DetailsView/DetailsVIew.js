import React, {useState} from "react";
import Dashboard from "../Dashboard/Dashboard";
import ListItems from "./List";
import Map from "./Map";
// import "./DetailsView.css";
import { Grid, Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DetailsViewsContext } from '../../context/DetailsViewsContext'

const useStyles = makeStyles((theme) => ({
  // detailsContainer: {
  //   width: "100%",
  //   height: "100%",
  // },
  // navContainer: {
  //   marginTop: '10px'
  // },
  mainContainer: {
    marginTop: theme.spacing(0.5),
  }
}));

const DetailsView = () => {
  const classes = useStyles();
  const [pointsofinterest, setPointsofinterest] = useState([]);

  return (
    <DetailsViewsContext.Provider value={{pointsofinterest, setPointsofinterest }}>
      <Grid container direction="column" className={classes.detailsContainer} >
        <Grid item className={classes.navContainer}>
          <Dashboard />
        </Grid>
        <Grid item container className={classes.mainContainer}>
          <Grid item xs={3}>
            <ListItems />
          </Grid>
          <Grid item xs={9} className={classes.mapContainer}>
            <Map />
          </Grid>
        </Grid>
      </Grid>
    </DetailsViewsContext.Provider>
  );
};

export default DetailsView;
