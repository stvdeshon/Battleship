export default class BoardBuilder {
  appendCells(row, col, value) {
    //value is null, ship.name, hit or miss
    return `<div class="cell ${value}" data-row="${row}" data-col="${col}" ></div>`;
  }
  renderBoard(parent, grid) {
    this.resetBoard(parent);
    let matrix = "";
    for (let i = 0; i < grid.board.length; i++) {
      for (let j = 0; j < grid.board.length; j++) {
        let value = grid.board[i][j]; //might need to change
        if (value === null) {
          value = "";
        } else if (value !== null && typeof value === "object") {
          if (grid.owner === "computer") {
            //this condition is temporary and will need to be rethought later
            value = value.name;
          } else {
            value = "";
          }
        }
        matrix += this.appendCells(i, j, value);
      }
    }
    parent.insertAdjacentHTML("afterbegin", matrix);
  }

  resetBoard(parent) {
    parent.textContent = "";
  }
}
