import Ship from "../ships";
import GameBoard from "./gameboard";
import Player from "./players";

//initialize computer board
const computerBoard = new GameBoard("computer");
computerBoard.generateBoard();

const carrier = new Ship("Carrier", 5);
const battleship = new Ship("Battleship", 4);
const destroyer = new Ship("Destroyer", 3);
const cruiser = new Ship("Cruiser", 3);
const submarine = new Ship("Submarine", 2);
const fleet = [carrier, battleship, destroyer, cruiser, submarine];
for (let i = 0; i < fleet.length; i++) {
  computerBoard.addShips(fleet[i]);
}
