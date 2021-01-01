import React from "react";

import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  name: {
    marginRight: theme.spacing(1),
  },
  url: {
    color: theme.palette.secondary.main,
    display: 'flex',
    alignItems: 'center',
    wordBreak: "break-word",
  },
  description: {
    marginTop: theme.spacing(1),
  },
}));

function Project({project}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid item className={classes.container} container>
      <Grid item container justify={"space-between"}>
        <Typography variant='h5' color={"primary"} className={classes.name}>
          {project.name}
        </Typography>
        <a
          className={classes.url}
          href={project.url}
          target="_blank"
          rel="nofollow noreferrer noopener"
        >
          {project.url.slice(8)}
          <OpenInNewIcon
            style={{
              width: '1.5rem',
              marginLeft: theme.spacing(.5)
            }}
          />
        </a>
      </Grid>
      <Typography variant={"body1"} className={classes.description}>
        {project.description}
      </Typography>
    </Grid>
  );
}

export default Project;
