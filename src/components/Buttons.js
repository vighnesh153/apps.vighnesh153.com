import React, {useCallback, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import Edit from "@material-ui/icons/Edit";
import Save from "@material-ui/icons/Save";

import * as AuthService from "../services/auth.service";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    margin: theme.spacing(1, 0),
  },
  saveEditButton: {
    marginLeft: theme.spacing(1),
  },
}));

function Buttons(props) {
  const {inEditMode, setInEditMode, addNewProject} = props;
  const classes = useStyles();
  const history = useHistory();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const onEditClick = useCallback(() => {
    if (AuthService.isLoggedIn() === false) {
      window.location.href = AuthService.getAuthUrl();
      return;
    }
    if (AuthService.isAdmin() === false) {
      setIsAlertOpen(true);
      return;
    }
    setInEditMode(true);
  }, [setInEditMode]);

  const onSaveClick = async () => {
    setIsSaving(true);
    await props.onSaveClick();
    setIsSaving(false);
    setInEditMode(false);
  };

  useEffect(() => {
    if (AuthService.loginSuccess()) {
      onEditClick();
      history.replace('/');
    }
  }, [setInEditMode, history, onEditClick]);

  const unauthorizedAlert = isAlertOpen && (
    <Alert
      variant="filled"
      severity="error"
      onClose={() => setIsAlertOpen(false)}
    >
      <AlertTitle><strong>Unauthorized</strong></AlertTitle>
      <strong>Only Vighnesh Raut is allowed to edit this.</strong>
    </Alert>
  );

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
      onClick={inEditMode ? onSaveClick : onEditClick}
      variant={"contained"}
      color={"primary"}
      className={classes.saveEditButton}
      disabled={isSaving}
      endIcon={inEditMode
        ? (isSaving ? <CircularProgress size={20}/> : <Save/>)
        : <Edit/>
      }
    >
      {inEditMode ? 'Save' : 'Edit'}
    </Button>
  );

  return (
    <React.Fragment>
      {unauthorizedAlert}
      <Grid item container justify={"flex-end"} className={classes.buttonContainer}>
        {addNewAppBtn}
        {saveEditBtn}
      </Grid>
    </React.Fragment>
  );
}

export default Buttons;
