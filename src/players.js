export default class Player {
  constructor(name) {
    this.name = name;
  }

  attack(opponentBoardBoard, row, col) {
    opponentBoardBoard.receiveAttack(row, col);
  }

  random() {
    return Math.floor(Math.random() * 10);
  }

  computerAttack(opponentBoard) {
    const row = this.random(),
      col = this.random();
    const coordinate = opponentBoard.board[row][col];
    if (coordinate === "hit" || coordinate === "miss") {
      this.computerAttack(opponentBoard);
    } else {
      opponentBoard.receiveAttack(row, col);
    }
  }
}
