import "./LoginBackground.css";
import React from "react";

const LoginBackground = props => (
  //Why the ...props again????
  <body><main id="login-background-initZoom" {...props} /></body>
);

export default LoginBackground;
