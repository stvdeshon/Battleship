export default class GameBoard {
  constructor(owner) {
    this.owner = owner;
    this.board = [];
    this.fleet = [];
    this.loser = false;
  }

  generateBoard() {
    for (let i = 0; i < 10; i++) {
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

  receiveAttack(row, col) {
    //if value == 'hit' or 'miss' return
    //if null, change value to 'miss
    //if not null change value to 'hit
    if (this.board[row][col] === "hit" || this.board[row][col] === "miss") {
      return;
    } else if (this.board[row][col] === null) {
      this.board[row][col] = "miss";
    } else {
      this.board[row][col] = "hit";
      //logic for tracking hits maybe should be here
    }
  }

  gameOver() {
    this.loser = this.fleet.every((ship) => ship.isSunk());
  }
}
