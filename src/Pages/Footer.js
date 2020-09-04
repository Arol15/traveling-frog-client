import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

function Copyright() {
  return (
    <Typography variant="h6">
      {"Lora Rusinouskaya © "}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '} */}
      {new Date().getFullYear()}
      {/* {'.'} */}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2, 2),
    marginTop: "auto",
    backgroundColor: "#233044",
    color: "white",
    textAlign: "center",
  },
  icons: {
    color: "white",
    outline: "none", 
    border: 'none'
  },
  root: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="lg" className={classes.root}>
          {/* <Container>
            <Typography variant="h6">
              {"Lora Rusinouskaya © "} {new Date().getFullYear()}
            </Typography>
          </Container> */}
          <Container>
            <Typography variant="body1">
              {"Lora Rusinouskaya © "} {new Date().getFullYear()}
            </Typography>
            <IconButton className={classes.icons}>
              <GitHubIcon onClick={() => window.open('https://github.com/Arol15', '_blank')}  fontSize="sm" />
            </IconButton>
            <IconButton>
              <LinkedInIcon onClick={() => window.open('https://www.linkedin.com/in/lorarusinouskaya/', '_blank')} className={classes.icons} fontSize="sm" />
            </IconButton>
          </Container>
        </Container>
      </footer>
    </div>
  );
}
