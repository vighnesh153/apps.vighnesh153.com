import React from "react";

import useTheme from "@material-ui/core/styles/useTheme";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function NoProjectsFound({projectsList}) {
  const theme = useTheme();

  const style = {
    border: `1px solid ${theme.palette.primary.main}`,
  };

  if (projectsList.length > 0) {
    return null;
  }

  return (
    <Grid item style={style}>
      <Paper style={{padding: theme.spacing(2)}}>
        <Typography color={"textSecondary"}>
          No apps or projects found. Start by adding some.
        </Typography>
      </Paper>
    </Grid>
  );
}

export default NoProjectsFound;
