import React from "react";

import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Project from "./project";

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

  return (
    <Grid
      container
      direction={"column"}
      className={classes.container}
    >
      {
        list.map((project) => (
          <Project
            key={project.id}
            project={project}
          />
        ))
      }
    </Grid>
  );
}

export default ProjectList;
