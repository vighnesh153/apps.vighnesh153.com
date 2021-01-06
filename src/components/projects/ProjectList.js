import React, {useState} from "react";

import clsx from 'clsx';

import Project from "./Project";
import Buttons from "../Buttons";
import NoProjectsFound from "./NoProjectsFound";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Grid from "@material-ui/core/Grid";

import {DragDropContext, Droppable} from 'react-beautiful-dnd';

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
  isDraggingOver: {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const hardcodedData = [
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

function ProjectList() {
  const classes = useStyles();

  const [projectsList, setProjectsList] = useState(hardcodedData);
  const [inEditMode, setInEditMode] = useState(false);

  const updateProject = (updatedProject) => {
    const projectsListClone = projectsList
      .map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      );
    setProjectsList(projectsListClone);
  };

  const addNewProject = () => {
    const newProject = {
      id: Math.random(),
      name: '',
      url: '',
      description: '',
    };
    const newProjectsList = [
      newProject,
      ...projectsList,
    ];
    setProjectsList(newProjectsList);
  };

  const onSaveClick = async () => {
    console.log(projectsList);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  };

  const onDragEnd = (result) => {
    const {source, destination} = result;

    if (!destination) {
      return;
    }

    if (source.index === destination.index) {
      return;
    }

    const projectsListClone = [...projectsList];
    [projectsListClone[source.index], projectsListClone[destination.index]]
      = [projectsListClone[destination.index], projectsListClone[source.index]];
    setProjectsList(projectsListClone);
  };

  const projectComponentList = projectsList.map((project, projectIndex) => (
    <Project
      key={project.id}
      projectIndex={projectIndex}
      updateProject={updateProject}
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
      inEditMode={inEditMode}
      setInEditMode={setInEditMode}
      addNewProject={addNewProject}
      onSaveClick={onSaveClick}
    />
  );

  return (
    <React.Fragment>
      <Grid
        container
        direction={"column"}
        className={classes.root}
      >
        {modificationButtons}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'apps'}>
            {droppableContainer}
          </Droppable>
        </DragDropContext>
        <NoProjectsFound projectsList={projectsList}/>
      </Grid>
    </React.Fragment>
  );
}

export default ProjectList;
