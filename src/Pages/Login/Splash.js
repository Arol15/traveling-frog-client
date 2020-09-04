import React from 'react'; 
import Login from './Login'
import './Splash.css';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    tfAvatar: {
      backgroundColor: "green", 
    //   color: "green",
      fontWeight: 900
    }
  })); 

const Splash = () => {
    const classes = useStyles();
    return(
        <div className='splashContainer'>
            <div className='logo-container'>
                <Avatar className={classes.tfAvatar}>TF</Avatar>
                <h2>Traveling Frog</h2>
            </div>
            <div>
                <Login />
            </div>
            <div className='footer'>
                <footer>
                {"Lora Rusinouskaya © "} {new Date().getFullYear()}
                </footer>
            </div>
        </div>
    )
}

export default Splash; 