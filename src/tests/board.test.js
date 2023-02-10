import GameBoard from "../gameboard";
import Ship from "../ships";
import Player from "../players";

describe("Game Board class", () => {
  const grid = new GameBoard("player");
  const cruiser = new Ship("Cruiser", 3);
  beforeEach(() => {
    grid.generateBoard();
  });

  test("returns a properly sized grid", () => {
    expect(grid.board.length).toBe(10);
    expect(grid.board.flat().length).toBe(100);
  });

  test("index value is null", () => {
    expect(grid.board[0][0]).toBe(null);
  });
});
