import propTypes from "prop-types";
import React from "react";
import './../../styling/Buttons.css';

const Button = ({ className, dataRevealed, onClick, children }) => {
  let cssClasses = `button ${className}`
  return <button className={cssClasses} data-revealed={dataRevealed} onClick={onClick}>{ children }</button>
}

export default Button;