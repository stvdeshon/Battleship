import GameBoard from "../gameboard";

test("GameBoard class returns a properly sized grid", () => {
  const grid = new GameBoard("player");
  grid.generateBoard();
  expect(grid.board.length).toEqual(100);
});
