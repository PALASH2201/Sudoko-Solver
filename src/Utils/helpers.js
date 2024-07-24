export const fetchBoard = async (setGrid) => {
  try {
    setGrid([]);
    const response = await fetch(
      "https://sugoku.onrender.com/board?difficulty=easy"
    );
    const data = await response.json();
    return data.board.map((row) =>
      row.map((cell) => ({
        value: cell.toString(),
        classname: cell === 0 ? "userCell" : "problemCell",
      }))
    );
  } catch (error) {
    console.error("Error fetching Sudoku board:", error);
    return [];
  }
};

export const initializeRefs = (grid, cellRefs) => {
  cellRefs.current = grid.map((row, rowIndex) =>
    row.map((_, colIndex) => React.createRef())
  );
};
