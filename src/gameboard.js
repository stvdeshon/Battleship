export default class GameBoard {
  constructor(owner) {
    this.owner = owner;
    this.board = new Array(10);
    this.fleet = [];
  }

  generateBoard() {
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(10).fill(null);
    }
    return this.board;
  }

  addShips(ship) {
    if (this.fleet.includes(ship)) {
      return;
    } else {
      this.fleet.push(ship);
    }
  }

  placeShip(ship, row, col) {
    return (this.board[row][col] = ship.name);
  }

  receiveAttack() {
    //takes coordinates, determines whether a hit or miss, records hits on
    //corresponding ship, and records misses as well for the DOM
  }

  gameOver() {
    //win/loss is displayed depending on however many occupied cells there are
    //or perhaps whether all the ship objects return 1 on isSunk()
  }
}
