export default class BoardBuilder {
  appendCells(row, col, value) {
    //value is null, ship.name, hit or miss
    return `<div class="cell ${value}" data-row="${row}" data-col="${col}" ></div>`;
  }
  renderBoard(parent, board) {
    this.resetBoard(parent);
    let matrix = "";
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        let value = board[i][j]; //might need to change
        if (value === null) {
          value = "";
        } else if (value.name) {
          if (board.owner === "human") {
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

  renderFleet(board) {
    const shipContainer = document.getElementById("ships");
    for (let i = 0; i < board.fleet.length; i++) {
      let ship = board.fleet[i];
      shipContainer.classList.add(`${ship.name}-docked`);
      shipContainer.setAttribute("draggable", true);
      shipContainer.dataset.ship = `${ship.name}`;
      for (let j = 0; j < ship.length; i++) {
        shipContainer.innerHTML += `<div class=${ship.name} data-index='${i}'></div>`;
      }
      elements.fleetDraggable.prepend(shipContainer); //imported from an elements object
    }
  }

  resetBoard(parent) {
    parent.textContent = "";
  }
}
