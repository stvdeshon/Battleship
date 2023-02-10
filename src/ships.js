export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.orientation = "horizontal";
    this.hits = [];
  }

  hit(index) {
    if (this.hits.includes(index) || index < 0 || index >= this.length) {
      return;
    } else {
      this.hits.push(index);
    }
  }

  isSunk() {
    return this.hits.length === this.length;
  }

  changeOrientation() {
    return this.orientation === "horizontal"
      ? (this.orientation = "vertical")
      : (this.orientation = "horizontal");
  }
}
