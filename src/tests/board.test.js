import GameBoard from "../gameboard";
import Ship from "../ships";
import Player from "../players";

describe("Game Board class", () => {
  const grid = new GameBoard("player");
  // const cruiser = new Ship("Cruiser", 3);
  beforeEach(() => {
    grid.generateBoard();
  });

  test("returns a properly sized grid", () => {
    expect(grid.board.length).toBe(10);
    expect(grid.board.flat().length).toBe(100);
  });

  test("index value is null", () => {
    expect(grid.board[5][5]).toBe(null);
  });
});

describe("Adding ships", () => {
  const grid = new GameBoard("player");
  const carrier = new Ship("Carrier", 5);
  const battleship = new Ship("Battleship", 4);
  const destroyer = new Ship("Destroyer", 3);
  const cruiser = new Ship("Cruiser", 3);
  const submarine = new Ship("Submarine", 2);
  const fleet = [carrier, battleship, destroyer, cruiser, submarine];

  beforeEach(() => {
    grid.generateBoard();
    for (let i = 0; i < fleet.length; i++) {
      grid.instantiateShips(fleet[i]);
    }
  });
  test("Ship is in fleet", () => {
    expect(grid.fleet[0].name).toBe("Carrier");
  });
  test("Ship is in proper place", () => {
    grid.placeShip(submarine, 5, 5);
    expect(grid.board[5][5].name).toBe("Submarine");
  });
  test("Attacks are received", () => {
    grid.placeShip(submarine, 5, 5);
    grid.receiveAttack(5, 5);
    expect(grid.board[5][5]).toBe("hit");
  });
  test("Misses are tracked", () => {
    grid.receiveAttack(5, 5);
    expect(grid.board[5][5]).toBe("miss");
  });
  test("Multiple clicks do nothing", () => {
    grid.placeShip(submarine, 5, 5);
    grid.receiveAttack(5, 5);
    grid.receiveAttack(5, 5);
    expect(grid.board[5][5]).toBe("hit");
  });
});

describe("Game over", () => {
  const grid = new GameBoard("player");
  const cruiser = new Ship("Cruiser", 3);
  const submarine = new Ship("Submarine", 2);
  const fleet = [cruiser, submarine];

  beforeEach(() => {
    grid.generateBoard();
    for (let i = 0; i < fleet.length; i++) {
      grid.instantiateShips(fleet[i]);
    }
  });

  test("returns false properly", () => {
    cruiser.hit(0);
    grid.gameOver();
    expect(grid.loser).toBe(false);
  });

  test("returns true properly", () => {
    cruiser.hit(0);
    cruiser.hit(1);
    cruiser.hit(2);
    submarine.hit(0);
    submarine.hit(1);
    grid.gameOver();
    expect(grid.loser).toBe(true);
  });
});
