import React from "react";

import useTheme from "@material-ui/core/styles/useTheme";

import NavBar from "./NavBar";
import Projects from "./projects";

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
      <Projects />
    </div>
  );
}

export default App;
