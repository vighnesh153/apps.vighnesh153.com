import React from "react";

import clsx from 'clsx';

import {useForm} from "react-hook-form";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Grid from "@material-ui/core/Grid";

import {FormControl, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  formControl: {
    width: '100%',
  },
  bottomSpacing: {
    marginBottom: theme.spacing(2),
  },
}));

const formControls = [
  {
    name: 'name',
    label: 'Name of App/Project',
    multiline: false,
    rows: 1,
  },
  {
    name: 'url',
    label: 'App/Project URL',
    multiline: false,
    rows: 1,
  },
  {
    name: 'description',
    label: 'App/Project Description',
    multiline: true,
    rows: 3,
  },
];

function ProjectEdit({project, updateProject}) {
  const classes = useStyles();

  const {register, watch} = useForm({defaultValues: project});

  const onChange = async () => {
    const newValues = {
      ...project,
      ...watch(),
    };
    updateProject(newValues);
  };

  return (
    <Grid item className={classes.container} container>
      <form onChange={onChange}>
        {
          formControls.map((formControl) => (
            <FormControl
              key={formControl.label}
              className={clsx(classes.formControl, classes.bottomSpacing)}
            >
              <TextField
                variant={"outlined"}
                required
                name={formControl.name}
                label={formControl.label}
                inputRef={register({required: true})}
                multiline={formControl.multiline}
                rows={formControl.rows}
                autoComplete="off"
              />
            </FormControl>
          ))
        }
      </form>
    </Grid>
  );
}

export default ProjectEdit;
