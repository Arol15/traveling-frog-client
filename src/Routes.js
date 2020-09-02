import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MyProfile from "./Pages/Dashboard/MyProfile";
import EditProfile from "./Pages/Dashboard/EditProfile";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home";
import DetailsView from "./Pages/DetailsView/DetailsVIew";


const authGuard = (Component) => () => {
  return JSON.parse(localStorage.getItem("data"))?.access_token ? (
    <Component />
  ) : (
    <Redirect to="/login" />
  );
};

const Routes = (props) => {
  return (
    <Router {...props}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/myprofile" render={authGuard(MyProfile)}></Route>
        <Route path="/editprofile" render={authGuard(EditProfile)}></Route>
        <Route exact path="/" render={authGuard(Home)}></Route>
        <Route path="/types">
          <DetailsView />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
