import BoardBuilder from "./board-builder";
import GameBoard from "./gameboard";
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

window.addEventListener("DOMContentLoaded", () => {
  console.log("updateme");
  const fleet = builder.newFleet();
  userBoard.generateBoard();
  computerBoard.generateBoard();
  //what follows is a nascent gameStart function
  for (let i = 0; i < fleet.length; i++) {
    userBoard.fillBucket(fleet[i]); //fills user's bucket for display to dom, to be dragged into the fleet and grid next
    computerBoard.assembleFleet(fleet[i]); //assemble fleet and fill bucket are separated so the logic
  }

  //the following two loops create a fleet for the user and their bucket and the DOM
  for (let i = 0; i < fleet.length; i++) {
    const fleet = builder.newFleet();
    computerBoard.fillBucket(fleet[i]); //is more flexible for computer and human players
  }
  for (let i = 0; i < userBoard.bucket.length; i++) {
    builder.renderPieces(shipSelect, userBoard.bucket[i].name);
  }

  computerBoard.computerPlacement();
  builder.renderBoard(userBoardDiv, userBoard);
  builder.renderBoard(compBoardDiv, computerBoard);
});

//below is the ship flipping and placing logic for human players

const flipBtn = document.getElementById("flip");

let angle = 0;

function flip() {
  const bucket = Array.from(shipSelect.children);
  angle === 0 ? (angle = 90) : (angle = 0);

  bucket.forEach((ship) => (ship.style.transform = `rotate(${angle}deg)`));
  console.log(userBoard.bucket);
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
