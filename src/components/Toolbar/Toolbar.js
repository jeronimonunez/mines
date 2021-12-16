import React from "react";
import Button from "../Button";
import './../../styling/Toolbar.css';

const Toolbar = () => {
  return (
    <div className="toolbar">
      <h2>Hello Toolbar</h2>
      <Button>Start new game</Button>
      <Button>Change difficulty</Button>
      <Button>Pause</Button>
    </div>
  )
};

export default Toolbar;