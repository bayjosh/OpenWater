import "./HomeBackground.css";
import React from "react";

const HomeBackground = props => (
  //Why the ...props again????
  <main id="home-background-initZoom" {...props} />
);

export default HomeBackground;
