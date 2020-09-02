import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
      maxWidth: '100%',
    },
    media: {
      height: 250,
    },
  });

const CollectionCard = ({
  collection: { type },
  collection: { id },
  collection: { image },
}) => {

  let history = useHistory();
  const redirectToPlaces = () => {
    history.push(`/types/${id}`, { id });
  };
  const classes = useStyles();

  return (
    <Card onClick={redirectToPlaces} className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={type}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {type}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );

  // return (
  //     <div onClick={redirectToPlaces} className='card-container'>
  //         <div className="card-container-img">
  //             <img src={image} alt='park'></img>
  //         </div>
  //         <div className='card-title'>
  //             {type}
  //         </div>
  //     </div>
  // )
};

export default CollectionCard;
