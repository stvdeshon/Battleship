export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.orientation = "horizontal";
    this.hits = [];
  }

  hit(counter) {
    this.hits.push(counter);
  }

  isSunk() {
    if (this.hits.length === this.length) {
      return true;
    }
  }

  changeOrientation() {
    return this.orientation === "horizontal"
      ? (this.orientation = "vertical")
      : (this.orientation = "horizontal");
  }
}
