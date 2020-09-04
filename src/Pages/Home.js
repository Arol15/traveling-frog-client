import React from "react";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Collections from "../Pages/Dashboard/Collections";
import Footer from './Footer'
import { Grid, Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    titleContainer: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(3),
      textAlign: "center",
      color: '#233044'
      // backgroundColor: '#EDF0F1'
    },
    homeContainer: {
      backgroundColor: "#EDF0F1", 
      // width: "100wh", 
      minHeight: "100vh",
      // minHeight: '100vh',
      
    }, 
    subTitle: {
      color: "green", 
      fontWeight: 900
    }, 
    main: {
      marginBottom: theme.spacing(6)
    }, 
    test: {

      marginTop: 'auto'
    }

  }));

export default function Home() {

  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.homeContainer}>
      <Grid item>
        <Dashboard />
      </Grid>
      <Container maxWidth="lg" className={classes.titleContainer}>
        <Typography variant="h3">
          Your Travel Collections
        </Typography>
        <Typography variant="h4" gutterBottom className={classes.subTitle}>
          Where will you go next?
        </Typography>
      </Container>
      <Grid item container className={classes.main}>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8} alignContent="center" >
          <Collections />
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
      <Grid item className={classes.test}>
        <Footer />
      </Grid>
    </Grid>
  );
}
