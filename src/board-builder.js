import Ship from "./ships";

export default class BoardBuilder {
  appendCells(row, col, value) {
    //value is null, ship.name, hit or miss
    return `<div class="cell ${value}" data-row="${row}" data-col="${col}" ></div>`;
  }

  appendPieces(shipName) {
    return `<div id="${shipName}" class="${shipName}-horizontal docked" data-type="${shipName}" draggable="true"></div>`;
  }

  renderPieces(parent, ship) {
    let pieces = this.appendPieces(ship.name);
    parent.innerHTML += pieces;
  }

  renderBoard(parent, grid) {
    this.resetBoard(parent);
    let matrix = "";
    for (let i = 0; i < grid.board.length; i++) {
      for (let j = 0; j < grid.board.length; j++) {
        let value = grid.board[i][j];
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

  newFleet() {
    const carrier = new Ship("carrier", 5);
    const battleship = new Ship("battleship", 4);
    const destroyer = new Ship("destroyer", 3);
    const cruiser = new Ship("cruiser", 3);
    const submarine = new Ship("submarine", 2);
    return [carrier, battleship, destroyer, cruiser, submarine];
  }
}
