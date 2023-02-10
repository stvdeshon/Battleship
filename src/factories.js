import Ship from "../ships";

const carrier = new Ship("Carrier", 5);
const battleship = new Ship("Battleship", 4);
const destroyer = new Ship("Destroyer", 3);
const cruiser = new Ship("Cruiser", 3);
const submarine = new Ship("Submarine", 2);

export const fleet = [carrier, battleship, destroyer, cruiser, submarine];
