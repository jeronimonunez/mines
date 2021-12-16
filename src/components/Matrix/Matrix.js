import React, { useState } from "react";
import Button from "../Button";
import './../../styling/Matrix.css';
import PropTypes from "prop-types";

const Matrix = ({ width, height, mines }) => {

  let rows = [];
  let numrows = height;
  let numcolumns = width;
  
  for (var i = 0; i < numrows; i++) {
    rows.push(<Row numColums={numcolumns} numRows={numrows} key={i} />);
  }
  
  return (
    <div className="matrix large">
      {/* Default 30x16 */}
      {rows}
    </div>
  )
};

const Row = ({numColums, numRows}) => {
  let cells = [];
  
  for (var i = 0; i < numColums; i++) {
    cells.push(<Cell key={i} />);
  }

  return (
    <div className="row">{cells}</div>
  )

}

const Cell = ({}) => {
  let value = 0;
  const [revealed, setRevealed] = useState(false);
  console.log(revealed)

  const toggleState = () => {
    console.log(revealed);
    setRevealed(true);
  }

  return (
    <div className="cell">
      <Button className="matrix-button" dataRevealed={revealed} onClick={toggleState}></Button>
      <span className="cell-value" data-revealed={revealed}>{value}</span>
    </div>
  )
}

Matrix.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  mines: PropTypes.number
}

Matrix.defaultProps = {
  width: 30,
  height: 16,
  mines: 99
}

export default Matrix;