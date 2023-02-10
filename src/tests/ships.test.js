import Ship from "../ships";

describe("Ship class", () => {
  const cruiser = new Ship("Cruiser", 3);
  test("Default orientation is horizontal", () => {
    expect(cruiser.orientation).toBe("horizontal");
  });
  test("Changes orientation", () => {
    cruiser.changeOrientation();
    expect(cruiser.orientation).toBe("vertical");
  });
});

test("Does it sink with bad input", () => {
  const cruiser = new Ship("Cruiser", 3);
  cruiser.hit(1);
  cruiser.hit(2);
  cruiser.hit(3);
  expect(cruiser.isSunk()).toBe(false);
});

test("Does it sink with proper input", () => {
  const cruiser = new Ship("Cruiser", 3);
  cruiser.hit(0);
  cruiser.hit(1);
  cruiser.hit(2);
  expect(cruiser.isSunk()).toBe(true);
});

test("Does it prevent multiple inputs of the same value", () => {
  const cruiser = new Ship("Cruiser", 3);
  cruiser.hit(0);
  cruiser.hit(1);
  cruiser.hit(1);
  expect(cruiser.isSunk()).toBe(false);
});
