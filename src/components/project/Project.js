import React from "react";

import ProjectEdit from "./ProjectEdit";
import ProjectShow from "./ProjectShow";


function Project({project, inEditMode}) {
  const Component = inEditMode ? ProjectEdit : ProjectShow;

  return (
    <Component project={project} />
  )
}

Project.defaultProps = {
  inEditMode: false,
};

export default React.memo(Project);
