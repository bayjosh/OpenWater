import "./DashboardBackground.css";
import React from "react";

const DashboardBackground = props => (
    //Why the ...props again????
    <div id="Dashboard-background" {...props} />
);

export default DashboardBackground;