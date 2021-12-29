import React, { useEffect, useState } from "react";
import Button from "../Button";
import MineIcon from "../Icons/MineIcon";
import './../../styling/Matrix.css';
import PropTypes from "prop-types";
import FaceIcon from "../Icons/FaceIcon";

const Matrix = ({ width, height, mines }) => {

  let rows = [];
  let numrows = height;
  let numcolumns = width;
  let minesCounter = mines;
  let matrixHelper = [];
  let matrix = [];

  const [gameOver, setGameOver] = useState(false);

  const createBoardMatrix = (width, height) => {
    for (let i = 0; i < height; i++) {
      matrixHelper.push([]);
      for (let j = 0; j < width; j++) {
        matrixHelper[i][j] = 0;
      }
    }
    return matrixHelper;
  }

  // for (var i = 0; i < numrows; i++) {
  //   rows.push(<Row numColums={numcolumns} numRows={numrows} key={i} />);
  // }

  const fillBoard = () => {

    // def llenar_tablero(t, bombs=99, p=None):
    // if not p:
    //     p = bombs / (len(t) * len(t[0]))
    // bombs = 99
    // while bombs > 0:
    //     for row in t:
    //         #print("procesando row")
    //         for posicion, i in enumerate(row):
    //             pb = random.random()
    //             if pb < p and not i:
    //                 row[posicion] = "*"
    //                 bombs -= 1
    //                 if bombs == 0:
    //                     print_t(t)
    //                     return

    let p = minesCounter / (width * height);
    while (minesCounter > 0) {

      for (let index = 0; index < matrix.length; index++) {
        let row = matrix[index];

        for (let j = 0; j < row.length; j++) {

          let pb = Math.random();

          if (pb < p && row[j] != -1) {
            console.log('aqui');
            row[j] = -1;
            minesCounter--;
            console.log(matrix)
            if (minesCounter == 0) {
              return;
            }
          }
        }
      }
    }
  }

  const checkAdjacent = (matrix, i, j) => {

    let counter = 0;

    if (i > 0 && j > 0 && matrix[i - 1][j - 1] == -1) counter++;
    if (i > 0 && matrix[i - 1][j] == -1) counter++;
    if (i > 0 && j < matrix[0].length - 1 && matrix[i - 1][j + 1] == -1) counter++;
    if (j > 0 && matrix[i][j - 1] == -1) counter++;
    if (j > 0 && j < matrix[0].length - 1 && matrix[i][j + 1] == -1) counter++;
    if (i < matrix.length - 1 && j > 0 && matrix[i + 1][j - 1] == -1) counter++;
    if (i < matrix.length - 1 && matrix[i + 1][j] == -1) counter++;
    if (i < matrix.length - 1 && j < matrix[0].length - 1 && matrix[i + 1][j + 1] == -1) counter++;

    return counter;
  }

  const fillValues = () => {
    for (let i = 0; i < matrix.length; i++) {
      let row = matrix[i];
      for (let j = 0; j < row.length; j++) {
        let value = matrix[i][j];
        if (value == -1) {
          continue;
        } else {
          matrix[i][j] = checkAdjacent(matrix, i, j);
        }
      }
    }
  }

  const handleCellAction = value => {
    console.log(value);
    switch (value) {
      case -1:
        setGameOver(true);
        break;
    
      default:
        break;
    }
  }

  matrix = createBoardMatrix(width, height);

  fillBoard();
  fillValues();

  return (
    <div className="matrix-container">
      <FaceIcon sad={gameOver} />
      <div className="matrix large">
        {/* Default 30x16 */}
        {
          matrix.map((row, index) => (
            <Row key={index} rowIndex={index} cells={row} handleCellAction={handleCellAction} />
          ))
        }
      </div>
    </div>
  )
};

const Row = ({ cells, rowIndex, handleCellAction }) => {

  return (
    <div className="row">
      {
        cells.map((cell, index) => (
          <Cell value={cell} rowIndex={rowIndex} cellIndex={index} key={index} handleCellAction={handleCellAction} />
        ))
      }
    </div>
  )

}

const Cell = ({ value, rowIndex, cellIndex, handleCellAction }) => {
  const [revealed, setRevealed] = useState(false);
  const [flagged, setFlagged] = useState(false);

  const toggleState = () => {
    console.log(revealed);
    setRevealed(true);
  }

  const toggleFlag = () => {
    setFlagged(!flagged);
  }

  const handleRightClick = evt => {
    evt.preventDefault();
    console.log(evt);
    toggleFlag();
  };

  const handleLeftClick = () => {
    !flagged && toggleState();
  };

  const handleInteraction = evt => {
    console.log(evt.type);
    if (evt.type == 'click') {
      handleLeftClick();
    } else if (evt.type == 'contextmenu') {
      handleRightClick(evt);
    }
    if(!flagged) handleCellAction(value);
  }

  return (
    <div className="cell">
      <Button className="matrix-button" dataRevealed={revealed} dataFlagged={flagged} onClick={handleInteraction} onContextMenu={handleInteraction} dataCellId={`cell-id-${rowIndex}-${cellIndex}`}></Button>
      <span className={`cell-value cell-color-${value}`} data-revealed={revealed}>
        {value == -1 && <MineIcon />}
        {value != -1 && value != 0 && <>{value}</>}
      </span>
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

Cell.propTypes = {
  value: PropTypes.number
}

Cell.defaultProps = {
  value: 0
}

export default Matrix;