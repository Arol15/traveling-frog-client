import React from "react";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Collections from "../Pages/Dashboard/Collections";
import { Grid, Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    titleContainer: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      textAlign: "center",
    },
  }));

export default function Home() {

  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid item>
        <Dashboard />
      </Grid>
      <Container maxWidth="lg" className={classes.titleContainer}>
        <Typography variant="h4" color="black">
          Your Travel Collections
        </Typography>
      </Container>
      <Grid item container>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8} alignContent="center">
          <Collections />
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
}
