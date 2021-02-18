import ValidationsStore from "../stores/Validations";

export const updateProject = (updatedProject, projectsList, setProjectsList) => {
  const projectsListClone = projectsList
    .map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
  setProjectsList(projectsListClone);
};

export const addNewProject = (projectsList, setProjectsList) => {
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

export const onSaveClick = (makeRequest, projectsList) => {
  ValidationsStore.triggerValidations.next();
  makeRequest({ type: 'PUT', path: '/apps', data: projectsList });
};
