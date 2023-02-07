import GameBoard from "../gameboard";

describe("Game Board class", () => {
  const grid = new GameBoard("player");
  beforeEach(() => {
    grid.generateBoard();
  });

  test("returns a properly sized grid", () => {
    expect(grid.board.length).toBe(100);
  });
});
