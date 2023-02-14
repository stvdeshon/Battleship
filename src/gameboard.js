export default class GameBoard {
  constructor(owner) {
    this.owner = owner;
    this.board = [];
    this.fleet = []; //this is used to hold the board's ship objects to track the win/lose condition
    this.bucket = []; //this holds the pieces to be placed, removed as they are placed
    this.loser = false;
  }

  generateBoard() {
    for (let i = 0; i < 10; i++) {
      this.board[i] = new Array(10).fill(null);
    }
    return this.board;
  }

  assembleFleet(ship) {
    if (this.fleet.includes(ship)) {
      return;
    } else {
      this.bucket.push(ship);
      this.fleet.push(ship);
    }
  }

  placeShip(ship, row, col) {
    if (!this.isLegal(ship, row, col)) return;
    if (ship.orientation === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col + i] = ship;
        //may or may not need to shift() this.bucket for human players
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col] = ship;
      }
    }
  }

  random() {
    return Math.floor(Math.random() * 10);
  }

  computerPlacement() {
    const row = this.random(),
      col = this.random();
    for (let s = 0; s < this.fleet.length; s++) {
      if (
        this.fleet[s].orientation === "horizontal" &&
        !this.isLegal(this.fleet[s], row, col)
      ) {
        for (let i = 0; i < this.fleet[s].length; i++) {
          this.board[row][col + i] = this.fleet[s];
        }
      } else {
        for (
          let i = 0;
          i < this.fleet[s].length;
          i++ && !this.isLegal(this.fleet[s], row, col)
        ) {
          this.board[row + i][col] = this.fleet[s];
        }
      }
    }
  }

  isLegal(ship, row, col) {
    if (row < 0 || row > 9 || col < 0 || col > 9) return false;
    if (ship.orientation === "horizontal") {
      if (col + ship.length > 9) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col + i]) return false;
      }
    } else if (ship.orientation === "vertical") {
      if (row + ship.length > 9) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][col]) return false;
      }
    }

    return true;
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

  gameOver() {
    this.loser = this.fleet.every((ship) => ship.isSunk());
  }
}
