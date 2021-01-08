import React, {useCallback, useEffect} from 'react';
import {useHistory} from "react-router-dom";

import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Edit from "@material-ui/icons/Edit";
import Save from "@material-ui/icons/Save";

import * as AuthService from "../services/auth.service";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    width: '95%',
    margin: theme.spacing(1, 'auto'),
  },
  saveEditButton: {
    marginLeft: theme.spacing(1),
  },
}));

function Buttons(props) {
  const {inEditMode, setInEditMode, addNewProject, setIsAlertOpen, setAlertObj, loading} = props;
  const classes = useStyles();
  const history = useHistory();

  const onEditClick = useCallback(() => {
    if (AuthService.isLoggedIn() === false) {
      window.location.href = AuthService.getAuthUrl();
      return;
    }
    if (AuthService.isAdmin() === false) {
      setAlertObj({
        type: 'error',
        title: 'Unauthorized',
        content: 'Only Vighnesh Raut is allowed to edit this.'
      });
      setIsAlertOpen(true);
      return;
    }
    setInEditMode(true);
  }, [setInEditMode, setAlertObj, setIsAlertOpen]);

  useEffect(() => {
    if (AuthService.loginSuccess()) {
      onEditClick();
      history.replace('/');
    }
  }, [history, onEditClick]);

  let addNewAppBtn = null;
  if (inEditMode) {
    addNewAppBtn = (
      <Button
        variant={"contained"}
        color={"primary"}
        onClick={addNewProject}
      >
        New App
      </Button>
    );
  }

  const saveEditBtn = (
    <Button
      onClick={inEditMode ? props.onSaveClick : onEditClick}
      variant={"contained"}
      color={"primary"}
      className={classes.saveEditButton}
      disabled={loading}
      endIcon={loading ? <CircularProgress size={20}/> : <Save/>}
    >
      {inEditMode ? 'Save' : 'Edit'}
    </Button>
  );

  if (loading && !inEditMode) {
    return null;
  }

  return (
    <Grid item container justify={"flex-end"} className={classes.buttonContainer}>
      {addNewAppBtn}
      {saveEditBtn}
    </Grid>
  );
}

export default Buttons;
