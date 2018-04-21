import "./LoadingWheel.css";
import React from "react";

const LoadingWheel = () => (
    <img src={require('../../images/loadingwheel.png')} className = "responsive-img wheel" alt="LoadingWheel" id="wheel" />
);

export default LoadingWheel;