import React from "react";

import NavBar from "./NavBar";
import ProjectList from "./projects";
import {useTheme} from "@material-ui/core/styles";

function App() {
  const theme = useTheme();

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: theme.palette.background.default,
        overflow: 'auto',
      }}
    >
      <NavBar />
      <ProjectList />
    </div>
  );
}

export default App;
