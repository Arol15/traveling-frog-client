import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import "bootstrap/dist/css/bootstrap.css";
import theme from './theme'; 
import { ThemeProvider } from '@material-ui/core/styles'

// const cors = require("cors")

// dotenv.config();
// app.use(cors())

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Routes /> 
    </ThemeProvider>,
document.getElementById('root')
);
