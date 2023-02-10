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
      grid.addShips(fleet[i]);
    }
  });
  test("Ship is in fleet", () => {
    expect(grid.fleet[0].name).toBe("Carrier");
  });
  test("Ship is in proper place", () => {
    grid.placeShip(submarine, 5, 5);
    expect(grid.board[5][5]).toBe("Submarine");
  });
});
