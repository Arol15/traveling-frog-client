import React, { useState, useEffect } from "react";
import CollectionCard from "./CollectionCard";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import config from "../../config";
import "./Collections.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // paper: {
  //   paddingTop: 20,
  //   height: 140,
  //   width: 100,
  // },
}));

const Collections = () => {
  const classes = useStyles();
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    const res = await fetch(`${config.baseUrl}/collections`);
    const data = await res.json();
    // console.log(data);
    return data;
  };

  useEffect(() => {
    (async () => {
      const collections = await getCollections();
      setCollections(collections);
    })();
  }, []);

  return (
    
        <Grid container spacing={4} alignItems="">
            {collections.map((collection) => (
              <Grid item xs={4}>
                <CollectionCard className={classes.paper} key={collection.id} collection={collection} />
              </Grid>
            ))}
        </Grid>
  );
};

export default Collections;
