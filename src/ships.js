export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = [];
  }

  hit() {
    //some logic to track hits
  }

  isSunk() {
    return this.hits.length === this.length;
  }
}

// hits = Array(length).fill(null)
