export default class GameBoard {
  constructor(owner) {
    this.owner = owner;
    this.board = [];
  }

  generateBoard() {
    for (let i = 0; i < 100; i++) {
      this.board.push(i);
    }
  }

  placeShip() {
    //for placing ships in eligible cells by instantiating ships
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

/*on this Battleship grid, the x-axis is A-J from left to right
and the y-axis is 1-10 descending from top to bottom*/
