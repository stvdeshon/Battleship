import BoardBuilder from "./board-builder";
import GameBoard from "./gameboard";
import DragDrop from "./dragDrop";
// import Ship from "./ships";
// import Player from "./players";

//all of this is for testing and will be moved to proper locations later

const userBoardDiv = document.getElementById("player-container");
const compBoardDiv = document.getElementById("computer-container");
const userBoard = new GameBoard("human");
const computerBoard = new GameBoard("computer");
const builder = new BoardBuilder();

//returns a new fleet so each board gets its own unique array of ships

const shipSelect = document.getElementById("ship-select");
const drag = DragDrop(userBoard, userBoardDiv);

window.addEventListener("DOMContentLoaded", () => {
  console.log("new");
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
    builder.renderPieces(shipSelect, userBoard.bucket[i].name);
  }
  computerBoard.computerPlacement();
  builder.renderBoard(userBoardDiv, userBoard);
  builder.renderBoard(compBoardDiv, computerBoard);
  drag.combineEvents();
});

//below is the ship flipping and placing logic for human players
//next I must change the individual ship objects orientation attribute

const flipBtn = document.getElementById("flip");

function flip() {
  const bucket = Array.from(shipSelect.children);
  for (let i = 0; i < bucket.length; i++) {
    userBoard.bucket[i].changeOrientation(); //will need to empty bucket to prevent this from affecting ships in the gameboard
    console.log(userBoard.bucket[i].orientation);
    if (bucket[i].classList.contains("docked")) {
      bucket[i].classList.toggle(`${userBoard.bucket[i].name}-horizontal`);
      bucket[i].classList.toggle(`${userBoard.bucket[i].name}-vertical`);
    }
  }
  // console.log(bucket);
  console.log(computerBoard.board);
}

flipBtn.addEventListener("click", flip);

/*
let draggedShip;
function dragStart(e) {
  console.log(e.target);
}
function dragOver(e) {
  e.preventDefault();
}
function dropShip(e) {
  const startId = e.target.id;
  // const ship = 
} 
bucket.forEach((ship) => ship.addEventListener("dragstart", dragStart));
*/
