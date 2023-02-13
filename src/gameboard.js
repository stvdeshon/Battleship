export default class GameBoard {
  constructor(owner) {
    this.owner = owner;
    this.board = [];
    this.fleet = []; //this is used to hold the board's ship objects to track the win/lose condition
    this.loser = false;
  }

  generateBoard() {
    for (let i = 0; i < 10; i++) {
      this.board[i] = new Array(10).fill(null);
    }
    return this.board;
  }

  instantiateShips(ship) {
    if (this.fleet.includes(ship)) {
      return;
    } else {
      this.fleet.push(ship);
    }
  }

  placeShip(ship, row, col) {
    return (this.board[row][col] = ship);
  }

  receiveAttack(row, col) {
    if (this.board[row][col] === "hit" || this.board[row][col] === "miss") {
      return;
    } else if (this.board[row][col] === null) {
      this.board[row][col] = "miss";
    } else {
      this.board[row][col] = "hit";
    }
  }

  random() {
    return Math.floor(Math.random() * 10);
  }

  gameOver() {
    this.loser = this.fleet.every((ship) => ship.isSunk());
  }
}
