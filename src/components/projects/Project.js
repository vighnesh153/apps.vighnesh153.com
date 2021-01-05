import React from "react";

import ProjectEdit from "./ProjectEdit";
import ProjectShow from "./ProjectShow";


function Project({project, inEditMode, updateProject}) {
  if (inEditMode) {
    return (
      <ProjectEdit
        project={project}
        updateProject={updateProject}
      />
    );
  } else {
    return (
      <ProjectShow
        project={project}
      />
    );
  }
}

Project.defaultProps = {
  inEditMode: false,
};

export default React.memo(Project);
