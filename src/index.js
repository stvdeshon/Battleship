import BoardBuilder from "./board-builder";
import GameBoard from "./gameboard";
import DragDrop from "./dragDrop";
// import Ship from "./ships";
import Player from "./players";

const userBoardDiv = document.getElementById("player-container");
const compBoardDiv = document.getElementById("computer-container");
const builder = new BoardBuilder();
const user = new Player("human");
const userBoard = new GameBoard("human");
const computer = new Player("computer");
const computerBoard = new GameBoard("computer");

//returns a new fleet so each board gets its own unique array of ships

const shipSelect = document.getElementById("ship-select");
const drag = DragDrop(userBoard, userBoardDiv);

window.addEventListener("DOMContentLoaded", () => {
  const compFleet = builder.newFleet();
  const userFleet = builder.newFleet();
  userBoard.generateBoard();
  computerBoard.generateBoard();
  //what follows is a nascent gameStart function
  for (let i = 0; i < compFleet.length; i++) {
    userBoard.fillBucket(compFleet[i]); //fills user's bucket for display to dom, to be dragged into the fleet and grid next
    computerBoard.assembleFleet(compFleet[i]); //assemble fleet and fill bucket are separated so the logic
  }

  //the following two loops create a fleet for the user and their bucket and the DOM
  for (let i = 0; i < userFleet.length; i++) {
    computerBoard.fillBucket(userFleet[i]); //is more flexible for computer and human players
  }
  for (let i = 0; i < userBoard.bucket.length; i++) {
    builder.renderPieces(shipSelect, userBoard.bucket[i]);
  }
  computerBoard.computerPlacement();
  builder.renderBoard(userBoardDiv, userBoard);
  builder.renderBoard(compBoardDiv, computerBoard);
  drag.combineEvents();
});

//below is the ship flipping and placing logic for human players
//next I must change the individual ship objects orientation attribute

const startBtn = document.getElementById("start");
const flipBtn = document.getElementById("flip");

startBtn.addEventListener("click", () => {
  if (userBoard.bucket.length <= 0) {
    compBoardDiv.style.visibility = "visible";
    flipBtn.style.visibility = "hidden";
    startBtn.style.visibility = "hidden";
  }
});

flipBtn.addEventListener("click", () => {
  const bucket = Array.from(shipSelect.children);
  for (let i = 0; i < bucket.length; i++) {
    userBoard.bucket[i].changeOrientation(); //will need to empty bucket to prevent this from affecting ships in the gameboard
    if (bucket[i].classList.contains("docked")) {
      bucket[i].classList.toggle(`${userBoard.bucket[i].name}-horizontal`);
      bucket[i].classList.toggle(`${userBoard.bucket[i].name}-vertical`);
    }
  }
});

compBoardDiv.addEventListener("click", (e) => {
  const target = e.target;
  const row = target.dataset.row;
  const col = target.dataset.col;
  if (target.classList.contains("hit") || target.classList.contains("miss"))
    return;
  user.attack(computerBoard, row, col);
  if (computerBoard.board[row][col] === "miss") {
    target.classList.add("miss");
  } else {
    target.classList.add("hit");
  }
  console.log(computerBoard.fleet);
  console.log(computerBoard.gameOver());
});
