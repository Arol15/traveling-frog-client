import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login'; 
import Signup from './Pages/Signup/Signup';
import NotFound from './Pages/NotFound/NotFound'; 
import Home from './Pages/Home';
import DetailsView from './Pages/DetailsView/DetailsVIew'
import PointOfInterestView from './Pages/PointOfInterestView/PointOfInterestView'

const authGuard = (Component) => () => {
    return JSON.parse(localStorage.getItem("data")).access_token ? (
      <Component />
    ) : (
      <Redirect to="/login" />
    );
  };

const Routes = (props) => {
  
    return (
        <Router {...props}>
            <Switch>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path="/signup"> 
                    <Signup />
                </Route>
                <Route path="/dashboard" render={authGuard(Dashboard)}>
                </Route>
                <Route exact path="/" render={authGuard(Home)}>
                </Route>
                <Route path='/types'>
                    <DetailsView />
                </Route>
                <Route path='/pointofinterest'>
                    <PointOfInterestView />
                </Route>
                <Route path='*'> 
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes; 
