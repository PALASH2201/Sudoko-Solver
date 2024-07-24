export function solveSudoku(grid) {
    let row = -1;
    let col = -1;
    let isEmpty = true;
  
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0 || grid[i][j] === '') {
          row = i;
          col = j;
          isEmpty = false;
          break;
        }
      }
      if (!isEmpty) {
        break;
      }
    }
  
    if (isEmpty) {
      return true;
    }
  
    for (let num = 1; num <= 9; num++) {
      if (isSafe(grid, row, col, num)) {
        grid[row][col] = num;
        if (solveSudoku(grid)) {
          return true;
        } else {
          grid[row][col] = 0;
        }
      }
    }
    return false;
  }
  
  function isSafe(grid, row, col, num) {
    
    for (let d = 0; d < 9; d++) {
      if (grid[row][d] === num) {
        return false;
      }
    }
    for (let r = 0; r < 9; r++) {
      if (grid[r][col] === num) {
        return false;
      }
    }
    let sqrt = Math.sqrt(9);
    let boxRowStart = row - (row % sqrt);
    let boxColStart = col - (col % sqrt);
  
    for (let r = boxRowStart; r < boxRowStart + sqrt; r++) {
      for (let d = boxColStart; d < boxColStart + sqrt; d++) {
        if (grid[r][d] === num) {
          return false;
        }
      }
    }
  
    return true;
  }
  