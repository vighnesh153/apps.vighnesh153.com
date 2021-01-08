import React from "react";

import useTheme from "@material-ui/core/styles/useTheme";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {CircularProgress} from "@material-ui/core";

function IsFetching({isFetching}) {
  const theme = useTheme();

  const style = {
    width: '95%',
    margin: 'auto',
    border: `1px solid ${theme.palette.primary.main}`,
  };

  if (!isFetching) {
    return null;
  }

  return (
    <Grid item style={style}>
      <Paper style={{padding: theme.spacing(2)}}>
        <Grid container alignItems={"center"} justify={"center"}>
          <CircularProgress />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default IsFetching;
