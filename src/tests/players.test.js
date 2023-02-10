import Player from "../players";
import GameBoard from "../gameboard";

describe("Player class", () => {
  const computer = new Player("computer");
  test("name test", () => {
    expect(computer.name).toBe("computer");
  });
});
