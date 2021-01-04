import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Grid from "@material-ui/core/Grid";

import Project from "./Project";
import Buttons from "../Buttons";
import * as AuthService from "../../services/auth.service";

const useStyles = makeStyles((theme) => ({
  container: {
    width: '97%',
    [theme.breakpoints.up("sm")]: {
      width: '80%',
    },
    maxWidth: 700,
    margin: theme.spacing(5, 'auto'),
  },
}));

function ProjectList() {
  const classes = useStyles();
  const history = useHistory();

  const [inEditMode, setInEditMode] = useState(false);

  const list = [
    {
      id: Math.random(),
      name: 'Personal Website',
      url: 'https://vighnesh153.com',
      description: 'A profile-display web app hosted on Firebase ' +
        'and made with ❤️ using Angular.'
    },
    {
      id: Math.random(),
      name: 'Personal Blog',
      url: 'https://blog.vighnesh153.com',
      description: 'A place where I write about anything, mostly Technology, ' +
        'and hosted on Blogger.'
    },
    {
      id: Math.random(),
      name: 'List of hosted Apps',
      url: 'https://apps.vighnesh153.com',
      description: 'A collection of all my apps that are hosted either on ' +
        '*.vighnesh153.com or on vighnesh153.github.io built using React, Material & Nodejs.'
    },
  ];

  useEffect(() => {
    if (AuthService.loginSuccess() && AuthService.isAdmin()) {
      setInEditMode(true);
    }
    history.replace('/');
  }, [setInEditMode, history]);

  return (
    <React.Fragment>
      <Grid
        container
        direction={"column"}
        className={classes.container}
      >
        <Buttons
          inEditMode={inEditMode}
          setInEditMode={setInEditMode}
        />
        {
          list.map((project) => (
            <Project
              key={project.id}
              project={project}
              inEditMode={inEditMode}
            />
          ))
        }
      </Grid>
    </React.Fragment>
  );
}

export default ProjectList;
