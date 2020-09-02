import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom'
import config from '../../config'
// import ListCard from './ListCard'
// import './List.css'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    avatar:  {
        backgroundColor: "#00b0ff",
    }
  }));

const ListItems = () => {
    const classes = useStyles();
    const locations = useLocation();
    const typeid = locations.state.id; 
    const [pointsofinterest, setPointsofinterest] = useState([])

    const getPointsofinterest = async () => {
        const res = await fetch(`${config.baseUrl}/pointsofinterest/${typeid}`);
        const data = await res.json();
        // console.log(data)
        return data
    }
    // getPointsofinterest()
    useEffect(() => {
        (async () => {
            const data = await getPointsofinterest()
            // console.log(data)
            setPointsofinterest(data.pointsofinterest)
        })();
    }, [])

    return (
        <List dense className={classes.root}>
            {pointsofinterest.map((point) => {
                const labelId = `checkbox-list-secondary-label-${point.id}`; 
                return (
                    <>
                        <ListItem key={point.id} button>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}> {point.id}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={point.title} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </> 
                );             
            })}
        </List>
    )
}

export default ListItems; 
//  <ListCard key={point.id} point={point}/>