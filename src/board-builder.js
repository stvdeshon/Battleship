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
        console.log("working");
        let value = grid.board[i][j]; //might need to change
        if (value === null) {
          value = "";
        } else if (value.name) {
          if (grid.owner === "human") {
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
