import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import EditIcon from "@material-ui/icons/Edit";
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import Avatar from '@material-ui/core/Avatar';
import config from "../../config";
// import './Dashboard.css'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: 'flex', 
    color: 'green'
  },
  appBar: {
    backgroundColor: "#fff"
  }, 
  tfAvatar: {
    backgroundColor: "green", 
    fontWeight: 900
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [dashboard, setDashboard] = useState(null);
  const history = useHistory();

  const logout = () => {
    /* eslint-disable */
    const toLogout = confirm("Are you sure to logout?");
    /* eslint-enable */
    if (toLogout) {
      localStorage.clear();
      history.push("/login");
    }
  };

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("data")).user.email;
    fetch(`${config.baseUrl}/users/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("data")).access_token,
      },
    })
      .then((res) => res.json())
      .then(({ error, data }) => {
        // console.log(data)
        setDashboard(data);
      });
  }, []);

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <section className={classes.leftToolBar}>
        <IconButton onClick={() => history.push("/")} aria-label="Dashboard">
            <Avatar className={classes.tfAvatar}>TF</Avatar>
          </IconButton>
        </section>
        <Typography variant="h6" gutterButtom className={classes.title}>
          Traveling Frog 
        </Typography>
        <div className={classes.root}>
          <Avatar alt="profile-pic" src={dashboard?.user?.image}/>
        </div>
        <section className={classes.rightToolbar}>
          <IconButton onClick={() => history.push('/myprofile')} aria-label="Dashboard">
            <DashboardIcon />
          </IconButton>
          <IconButton onClick={() => history.push("/editprofile")} aria-label="Edit">
            <EditIcon />
          </IconButton>
          <Button onClick={logout}>Logout</Button>
        </section>
      </Toolbar>
    </AppBar>
  );

  // return (
  //   <div className="dashboard-container">
  //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
  //       <a className="navbar-brand" href="/">
  //         Traveling Frog
  //       </a>
  //       <div className="collapse navbar-collapse" id="navbarText">
  //         <ul className="navbar-nav mr-auto">
  //           <li className="nav-item active">
  //             <a className="nav-link cursor-pointer" href="/myprofile">
  //               Dashboard <span className="sr-only">(current)</span>
  //             </a>
  //           </li>
  //           <li className="nav-item">
  //             <a href='/'
  //               className="nav-link cursor-pointer"
  //               onClick={() => logout()}
  //             >
  //               Logout
  //             </a>
  //           </li>
  //           <li className="nav-item">
  //             <a className="nav-link cursor-pointer" href="/editprofile">
  //               <span className="navbar-text">{dashboard?.user?.first_name}</span>
  //             </a>
  //             <a className="nav-link cursor-pointer">
  //               <img onClick={() => console.log("hello")} style={{width: "40px", height: "40px", borderRadius: 50}} src={dashboard?.user?.image} alt='pic'/>
  //             </a>
  //           </li>
  //         </ul>
  //       </div>
  //     </nav>
  //   </div>
  // );
};

export default Dashboard;
