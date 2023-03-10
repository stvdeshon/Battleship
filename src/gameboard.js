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

  fillBucket(ship) {
    if (this.bucket.includes(ship)) {
      return;
    } else {
      this.bucket.push(ship);
    }
  }

  assembleFleet(ship) {
    if (this.fleet.includes(ship)) {
      return;
    } else {
      this.fleet.push(ship);
    }
  }

  placeShip(ship, row, col) {
    let index = this.bucket.indexOf(ship);
    if (!this.isLegal(ship, row, col)) return false;
    if (ship.orientation === "horizontal") {
      this.assembleFleet(ship);
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col + i] = ship;
      }
    } else {
      this.assembleFleet(ship);
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col] = ship;
      }
    }
    this.bucket.splice(index, 1);
    return true;
  }

  random() {
    return Math.floor(Math.random() * 10);
  }

  randomOrientation(ship) {
    const newDirection = Math.random() < 0.5;

    for (let i = 0; i < this.fleet.length; i++) {
      if (newDirection) ship.changeOrientation();
    }
  }

  computerPlacement() {
    const row = this.random(),
      col = this.random();

    for (let s = 0; s < this.bucket.length; s++) {
      this.randomOrientation(this.bucket[s]);
      if (this.bucket.length === 0) return;
      if (!this.isLegal(this.bucket[s], row, col)) {
        this.computerPlacement();
      } else if (
        this.bucket[s].orientation === "horizontal" &&
        this.isLegal(this.bucket[s], row, col)
      ) {
        for (let i = 0; i < this.bucket[s].length; i++) {
          this.board[row][col + i] = this.bucket[s];
        }
      } else if (
        this.bucket[s].orientation === "vertical" &&
        this.isLegal(this.bucket[s], row, col)
      ) {
        for (let i = 0; i < this.bucket[s].length; i++) {
          this.board[row + i][col] = this.bucket[s];
        }
      }
      this.bucket.shift();
      this.computerPlacement();
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
      for (let i = 0; i < this.fleet.length; i++) {
        if (this.board[row][col].name === this.fleet[i].name) {
          this.fleet[i].hit("hit");
        }
      }
      this.board[row][col] = "hit";
    }
  }

  gameOver() {
    return (this.loser = this.fleet.every((ship) => ship.isSunk()));
  }
}
