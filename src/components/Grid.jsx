const CreateGrid = ({
  grid,
  invalidRows,
  invalidCols,
  invalidCellRowIndex,
  invalidCellColIndex,
  handleInputChange,
}) => {
  return grid.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const isInvalid =
        invalidRows.has(rowIndex) ||
        invalidCols.has(colIndex) ||
        (invalidCellColIndex == colIndex && invalidCellRowIndex === rowIndex);
      const cellClass = `cell ${isInvalid ? "invalid" : ""} ${cell.classname} ${
        colIndex === 3 || colIndex === 6 ? "specialCol" : ""
      } ${rowIndex === 3 || rowIndex === 6 ? "specialRow" : ""}`.trim();
      return (
        <input
          style={{background:"transparent"}}
          key={`${rowIndex}-${colIndex}`}
          value={cell.value === "0" ? "" : cell.value}
          type="text"
          maxLength="1"
          className={cellClass}
          readOnly={cell.classname === "problemCell" ? true : false}
          onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
        />
      );
    })
  );
};

export default CreateGrid;
