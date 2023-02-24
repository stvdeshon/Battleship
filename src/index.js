import BoardBuilder from "./board-builder";
// import renderBoard from "./board-builder";
import GameBoard from "./gameboard";
import Ship from "./ships";
// import Player from "./players";

//all of this is for testing and will be moved to proper locations later

const userBoardDiv = document.getElementById("player-container");
const compBoardDiv = document.getElementById("computer-container");
const userBoard = new GameBoard("human");
const computerBoard = new GameBoard("computer");
const builder = new BoardBuilder();

//builds fleet, move later
const carrier = new Ship("Carrier", 5);
const battleship = new Ship("Battleship", 4);
const destroyer = new Ship("Destroyer", 3);
const cruiser = new Ship("Cruiser", 3);
const submarine = new Ship("Submarine", 2);
const fleet = [carrier, battleship, destroyer, cruiser, submarine];

window.addEventListener("DOMContentLoaded", () => {
  console.log("hi");
  userBoard.generateBoard();
  computerBoard.generateBoard();
  for (let i = 0; i < fleet.length; i++) {
    computerBoard.assembleFleet(fleet[i]);
  }
  computerBoard.computerPlacement();
  console.log("working");
  builder.renderBoard(userBoardDiv, userBoard);
  builder.renderBoard(compBoardDiv, computerBoard);
});

//instantiate board object, generateboard(), build fleet from array, place ships
