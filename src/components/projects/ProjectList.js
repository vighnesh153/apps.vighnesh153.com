import React, {useEffect, useState} from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";

import clsx from 'clsx';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

import Project from "./Project";
import Buttons from "../Buttons";
import NoProjectsFound from "./NoProjectsFound";
import IsFetching from "./IsFetching";
import MyAlert from "../Alert";

import * as ProjectsService from '../../services/projects.service';
import {apiRequest} from "../../hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '97%',
    [theme.breakpoints.up("sm")]: {
      width: '80%',
    },
    maxWidth: 700,
    margin: theme.spacing(5, 'auto'),
  },
  container: {
    paddingTop: theme.spacing(1),
  },
  alertContainer: {
    width: '95%',
    margin: 'auto',
  },
  isDraggingOver: {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function ProjectList() {
  const classes = useStyles();

  const [projectsList, setProjectsList] = useState([]);
  const [inEditMode, setInEditMode] = useState(false);

  const [alertObj, setAlertObj] = useState({
    type: '',
    title: '',
    content: ''
  });
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const {data, error, loading, makeRequest} = apiRequest()

  useEffect(() => {
    makeRequest({ type: 'GET', path: '/apps' });
  }, [makeRequest]);

  useEffect(() => {
    if (loading) {
      setIsAlertOpen(false);
    }
  }, [loading]);

  useEffect(() => {
    if (error !== null) {
      setAlertObj(error);
      setIsAlertOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (data === 'OK') {
      setInEditMode(false);
      return;
    }
    if (data !== null) {
      const sortedProjects = data.sort((p1, p2) => p1.priority - p2.priority);
      const transformedProjects = sortedProjects.map((p) => ({...p, id: p._id}));
      setProjectsList(transformedProjects);
    }
  }, [data]);

  const onDragEnd = (result) => {
    const {source: src, destination: dest} = result;
    if (dest && src.index !== dest.index) {
      const clone = [...projectsList];
      const dragEl = clone.splice(src.index, 1);
      clone.splice(dest.index, 0, dragEl);
      setProjectsList(clone);
    }
  };

  const projectComponentList = projectsList.map((project, projectIndex) => (
    <Project
      key={project.id}
      projectIndex={projectIndex}
      updateProject={(updatedProject) =>
        ProjectsService.updateProject(updatedProject, projectsList, setProjectsList)}
      project={project}
      inEditMode={inEditMode}
    />
  ));

  const droppableContainer = (provided, snapshot) => (
    <Grid
      item container
      className={clsx({
        [classes.container]: true,
        [classes.isDraggingOver]: snapshot.isDraggingOver,
      })}
      {...provided.droppableProps}
      innerRef={provided.innerRef}
    >
      {projectComponentList}
      {provided.placeholder}
    </Grid>
  );

  const modificationButtons = (
    <Buttons
      setIsAlertOpen={setIsAlertOpen}
      setAlertObj={setAlertObj}
      loading={loading}
      inEditMode={inEditMode}
      setInEditMode={setInEditMode}
      addNewProject={() => ProjectsService.addNewProject(projectsList, setProjectsList)}
      onSaveClick={() =>
        ProjectsService.onSaveClick(makeRequest, projectsList)}
    />
  );

  const projectsListDnD = (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={'apps'}>
        {droppableContainer}
      </Droppable>
    </DragDropContext>
  );

  return (
    <Grid container direction={"column"} className={classes.root}>
      <MyAlert
        isOpen={isAlertOpen && !loading}
        setIsOpen={setIsAlertOpen}
        alertObj={alertObj}
      />
      {modificationButtons}
      {projectsListDnD}
      <IsFetching isFetching={loading}/>
      <NoProjectsFound projectsList={projectsList} isFetching={loading}/>
    </Grid>
  );
}

export default ProjectList;
