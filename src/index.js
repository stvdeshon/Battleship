import BoardBuilder from "./board-builder";
import renderBoard from "./board-builder";
import GameBoard from "./gameboard";

//all of this is for testing and will be moved to proper locations later

const userBoardDiv = document.getElementById("player-container");
const compBoardDiv = document.getElementById("computer-container");
const userBoard = new GameBoard("human");
const computerBoard = new GameBoard("computer");
const builder = new BoardBuilder();

window.addEventListener("DOMContentLoaded", () => {
  userBoard.generateBoard();
  computerBoard.generateBoard();
  builder.renderBoard(userBoardDiv, userBoard);
  builder.renderBoard(compBoardDiv, computerBoard);
});
