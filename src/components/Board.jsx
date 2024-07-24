import { useState } from "react";
import { solveSudoku } from "../Utils/Solver";
import React from "react";
import { fetchBoard } from "../Utils/helpers";
import CreateGrid from "./Grid";

const Board = () => {
  const [grid, setGrid] = useState([]);
  const [invalidRows, setInvalidRows] = useState(new Set());
  const [invalidCols, setInvalidCols] = useState(new Set());
  const [invalidCellRowIndex, setInvalidCellRowIndex] = useState(null);
  const [invalidCellColIndex, setInvalidCellColIndex] = useState(null);

  const handleFetchBoard = async () => {
    const board = await fetchBoard(setGrid);
    setGrid(board);
  };

  const handleInputChange = (e, rowIndex, colIndex) => {
    const value = e.target.value;
    if (value === "" || (/^[1-9]$/.test(value) && value.length === 1)) {
      const newGrid = grid.map((row) => [...row]);
      newGrid[rowIndex][colIndex].value = value;
      setGrid(newGrid);
      checkValidity(newGrid, rowIndex, colIndex, value);
    }
  };

  const checkValidity = (grid, rowIndex, colIndex, value) => {
    const newInvalidRows = new Set(invalidRows);
    const newInvalidCols = new Set(invalidCols);

    for (let i = 0; i < 9; i++) {
      if (i !== colIndex && grid[rowIndex][i].value === value && value !== "") {
        newInvalidRows.add(rowIndex);
        break;
      } else {
        newInvalidRows.delete(rowIndex);
      }
    }
    for (let i = 0; i < 9; i++) {
      if (i !== rowIndex && grid[i][colIndex].value === value && value !== "") {
        newInvalidCols.add(colIndex);
        break;
      } else {
        newInvalidCols.delete(colIndex);
      }
    }

    setInvalidRows(newInvalidRows);
    setInvalidCols(newInvalidCols);

    let sqrt = Math.sqrt(9);
    let boxRowStart = rowIndex - (rowIndex % sqrt);
    let boxColStart = colIndex - (colIndex % sqrt);

    for (let r = boxRowStart; r < boxRowStart + sqrt; r++) {
      for (let d = boxColStart; d < boxColStart + sqrt; d++) {
        if (
          r !== rowIndex &&
          d != colIndex &&
          grid[r][d].value === value &&
          value !== ""
        ) {
          setInvalidCellRowIndex(r);
          setInvalidCellColIndex(d);
          break;
        } else {
          setInvalidCellColIndex(null);
          setInvalidCellRowIndex(null);
        }
      }
    }
  };

  const generateAnswer = () => {
    const gridCopy = grid.map((row) =>
      row.map((cell) => (cell === "0" || cell === "" ? 0 : parseInt(cell)))
    );
    solveSudoku(gridCopy);
    console.log(`Solved grid: ${gridCopy}`);
    setGrid(gridCopy.map((row) => row.map((cell) => cell.toString())));
  };

  return (
    <>
      {grid.length !== 0 ? (
        <div className="grid-container">
          <CreateGrid
            grid={grid}
            invalidRows={invalidRows}
            invalidCols={invalidCols}
            invalidCellRowIndex={invalidCellRowIndex}
            invalidCellColIndex={invalidCellColIndex}
            handleInputChange={handleInputChange}
          />
        </div>
      ) : null}
      <button
        type="button"
        className="btn btn-outline-info generate-board"
        onClick={handleFetchBoard}
      >
        Generate new board
      </button>
      {grid.length !== 0 ? (
        <button
          type="button"
          className="btn btn-outline-success generate-answer"
          onClick={generateAnswer}
        >
          Generate answer
        </button>
      ) : null}
    </>
  );
};

export default Board;