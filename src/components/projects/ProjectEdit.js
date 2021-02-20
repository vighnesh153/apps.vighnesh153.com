import React, {useEffect} from "react";

import ValidationsStore from "../../stores/Validations";

import clsx from 'clsx';

import {useForm} from "react-hook-form";
import {Draggable} from "react-beautiful-dnd";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  container: {
    width: '95%',
    margin: 'auto',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2, 1),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  isDragging: {
    borderColor: theme.palette.secondary.main,
    borderWidth: '5px',
  },
  formContainer: {
    width: '91%',
  },
  form: {
    width: '100%',
  },
  dragHandle: {
    width: '9%',
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

function ProjectEdit({project, updateProject, projectIndex, deleteProject}) {
  const classes = useStyles();

  const {register, watch, errors, trigger} = useForm({
    defaultValues: project,
    mode: 'onTouched',  // trigger validation mode: https://react-hook-form.com/api
  });

  const onChange = async () => {
    const newValues = {
      ...project,
      ...watch(),
    };
    updateProject(newValues);
  };

  const deleteProjectLocal = () => {
    deleteProject(project.id.toString());
  };

  useEffect(() => {
    const subscription = ValidationsStore.triggerValidations.subscribe(() => {
      trigger();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [trigger]);

  return (
    <Draggable
      draggableId={project.id.toString()}
      index={projectIndex}
    >
      {
        (provided, snapshot) => (
          <Grid
            item container
            justify={"space-between"}
            className={clsx({
              [classes.container]: true,
              [classes.isDragging]: snapshot.isDragging,
            })}
            {...provided.draggableProps}
            innerRef={provided.innerRef}
          >
            <Grid item className={classes.formContainer}>
              <form
                className={classes.form}
                onChange={onChange}
              >
                {
                  formControls.map((formControl) => (
                    <FormControl
                      key={formControl.label}
                      className={clsx(classes.formControl, classes.bottomSpacing)}
                    >
                      <TextField
                        variant={"outlined"}
                        color={"primary"}
                        required
                        name={formControl.name}
                        label={formControl.label}
                        inputRef={register({required: 'This field is required.', minLength: 1})}
                        multiline={formControl.multiline}
                        rows={formControl.rows}
                        autoComplete="off"
                        error={Boolean(errors[formControl.name] && errors[formControl.name].message)}
                        helperText={(errors[formControl.name] && errors[formControl.name].message) || ""}
                      />
                    </FormControl>
                  ))
                }
              </form>
            </Grid>
            <Grid
              item container direction={"column"}
              alignItems={"center"} justify={"flex-start"}
              className={classes.dragHandle}
            >
              <Grid item>
                <IconButton {...provided.dragHandleProps}>
                  <DragIndicatorIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={deleteProjectLocal}>
                  <DeleteIcon color={"error"} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )
      }
    </Draggable>
  );
}

export default ProjectEdit;
