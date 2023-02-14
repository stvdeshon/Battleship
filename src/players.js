export default class Player {
  constructor(name) {
    this.name = name;
  }

  humanAttack(opponent, row, col) {
    opponent.receiveAttack(row, col);
  }

  random() {
    return Math.floor(Math.random() * 10);
  }

  computerAttack(opponent) {
    const row = this.random(),
      col = this.random();
    const coordinate = opponent.board[row][col];
    if (coordinate === "hit" || coordinate === "miss") {
      this.computerAttack(opponent);
    } else {
      opponent.receiveAttack(row, col);
    }
  }
}
