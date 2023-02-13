import Player from "../players";
import GameBoard from "../gameboard";
import Ship from "../ships";

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath; //All 'random' test coordinates must == 5 to match this

describe("Computer player class", () => {
  const humanBoard = new GameBoard("humanBoard");
  const computer = new Player("computer");
  const cruiser = new Ship("Cruiser", 3);
  const submarine = new Ship("Submarine", 2);
  const fleet = [cruiser, submarine];

  beforeEach(() => {
    humanBoard.generateBoard();
    for (let i = 0; i < fleet.length; i++) {
      humanBoard.instantiateShips(fleet[i]);
    }
  });

  test("Computer can attack", () => {
    humanBoard.placeShip(submarine, 5, 5);
    computer.computerAttack(humanBoard);
    expect(humanBoard.board[5][5]).toBe("hit");
  });
});

describe("Human player class", () => {
  const computerBoard = new GameBoard("computer");
  const human = new Player("human");
  const cruiser = new Ship("Cruiser", 3);
  const submarine = new Ship("Submarine", 2);
  const fleet = [cruiser, submarine];

  beforeEach(() => {
    computerBoard.generateBoard();
    for (let i = 0; i < fleet.length; i++) {
      computerBoard.instantiateShips(fleet[i]);
    }
  });

  test("Human player attacks", () => {
    computerBoard.placeShip(submarine, 5, 5);
    human.humanAttack(5, 5, computerBoard);
    expect(computerBoard.board[5][5]).toBe("hit");
  });
});
