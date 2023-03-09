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
      humanBoard.assembleFleet(fleet[i]);
    }
  });

  test("Can hit", () => {
    humanBoard.placeShip(submarine, 5, 5);
    computer.computerAttack(humanBoard);
    expect(humanBoard.board[5][5]).toBe("hit");
  });

  test("Can miss", () => {
    humanBoard.placeShip(submarine, 5, 8);
    computer.computerAttack(humanBoard);
    expect(humanBoard.board[5][5]).toBe("miss");
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
      computerBoard.assembleFleet(fleet[i]);
    }
  });

  test("Can hit", () => {
    computerBoard.placeShip(submarine, 5, 6);
    human.attack(computerBoard, 5, 6);
    expect(computerBoard.board[5][6]).toBe("hit");
  });

  test("Can miss", () => {
    computerBoard.placeShip(submarine, 5, 8);
    human.attack(computerBoard, 5, 6);
    expect(computerBoard.board[5][6]).toBe("miss");
  });
});
