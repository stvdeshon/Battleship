import GameBoard from "../gameboard";

describe("Game Board class", () => {
  const grid = new GameBoard("player");
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
