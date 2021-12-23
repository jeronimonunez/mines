import React from "react";
import FlagIcon from "../Icons/FlagIcon";
import './../../styling/Buttons.css';

const Button = ({ className, dataRevealed, dataCellId, dataFlagged, onContextMenu, onClick, children }) => {
  let cssClasses = `button ${className}`
  return <button
    className={cssClasses}
    data-revealed={dataRevealed}
    data-cell-id={dataCellId}
    data-flagged={dataFlagged}
    onContextMenu={onContextMenu}
    onClick={onClick}
  >
    {children}
    {dataFlagged && <FlagIcon />}
  </button>
}

export default Button;