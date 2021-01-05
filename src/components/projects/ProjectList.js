import React, {useState} from "react";

import Project from "./Project";
import Buttons from "../Buttons";
import NoProjectsFound from "./NoProjectsFound";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Grid from "@material-ui/core/Grid";

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

  return (
    <React.Fragment>
      <Grid
        container
        direction={"column"}
        className={classes.container}
      >
        <Buttons
          inEditMode={inEditMode}
          setInEditMode={setInEditMode}
          addNewProject={addNewProject}
          onSaveClick={onSaveClick}
        />
        {
          projectsList.map((project) => (
            <Project
              key={project.id}
              updateProject={updateProject}
              project={project}
              inEditMode={inEditMode}
            />
          ))
        }
        <NoProjectsFound projectsList={projectsList} />
      </Grid>
    </React.Fragment>
  );
}

export default ProjectList;
