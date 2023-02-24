import GameBoard from "../gameboard";
import Ship from "../ships";

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath; //All 'random' test coordinates must == 5 to match this

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

describe("Human can place ships", () => {
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
      grid.assembleFleet(fleet[i]);
    }
  });
  test("Ship is in fleet", () => {
    expect(grid.fleet[0].name).toBe("Carrier");
  });
  test("Ship places horizontally", () => {
    grid.placeShip(submarine, 5, 5);
    expect(grid.board[5][6].name).toBe("Submarine");
  });
  test("Ship places vertically", () => {
    submarine.changeOrientation(); //should make it vertical
    grid.placeShip(submarine, 5, 5); //should extend downward to (row 6, column 5)
    expect(grid.board[6][5].name).toBe("Submarine");
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

describe("Ship placement validity", () => {
  const grid = new GameBoard("player");
  const carrier = new Ship("Carrier", 5);
  const battleship = new Ship("Battleship", 4);
  const destroyer = new Ship("Destroyer", 3);
  const cruiser = new Ship("Cruiser", 3);
  const submarine = new Ship("Submarine", 2);
  const fleet = [carrier, battleship, destroyer, cruiser, submarine];

  grid.generateBoard();
  for (let i = 0; i < fleet.length; i++) {
    grid.assembleFleet(fleet[i]);
  }

  test("Horizontal overlap prevented", () => {
    grid.placeShip(submarine, 5, 5);
    grid.placeShip(destroyer, 5, 6);
    expect(grid.isLegal(destroyer.orientation, 5, 6)).toBe(true);
    expect(grid.board[5][5].name).toBe("Submarine");
    expect(grid.board[5][6].name).toBe("Submarine");
  });

  test("Vertical overlap prevented", () => {
    carrier.changeOrientation();
    grid.placeShip(carrier, 2, 3);
    grid.placeShip(cruiser, 4, 2);
    expect(grid.board[4][2]).toBe(null);
  });

  test("Can not place too close to edge", () => {
    grid.placeShip(destroyer, 5, 9);
    expect(grid.board[5][5]).toBe(null);
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
      grid.assembleFleet(fleet[i]);
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

describe("Computer can place ships", () => {
  const grid = new GameBoard("player");
  const carrier = new Ship("Carrier", 5);
  const fleet = [carrier];

  grid.generateBoard();
  for (let i = 0; i < fleet.length; i++) {
    grid.assembleFleet(fleet[i]);
  }

  test("Ship places horizontally", () => {
    grid.computerPlacement();
    expect(grid.board[5][5].name).toBe("Carrier");
    expect(grid.board[5][7].name).toBe("Carrier");
  });

  test("Ship places vertically", () => {
    carrier.changeOrientation();
    grid.computerPlacement();
    expect(grid.board[5][5].name).toBe("Carrier");
    expect(grid.board[6][5].name).toBe("Carrier");
  });
});
