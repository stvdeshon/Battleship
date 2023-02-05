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
}
