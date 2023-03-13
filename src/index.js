import BoardBuilder from "./board-builder";
import GameBoard from "./gameboard";
import DragDrop from "./dragDrop";
import Player from "./players";

const userBoardDiv = document.getElementById("player-container");
const compBoardDiv = document.getElementById("computer-container");
const builder = new BoardBuilder();
const user = new Player("human");
const userBoard = new GameBoard("human");
const computer = new Player("computer");
const computerBoard = new GameBoard("computer");

const shipSelect = document.getElementById("ship-select");
const drag = DragDrop(userBoard, userBoardDiv);

window.addEventListener("DOMContentLoaded", () => {
  const compFleet = builder.newFleet();
  const userFleet = builder.newFleet();
  userBoard.generateBoard();
  computerBoard.generateBoard();

  for (let i = 0; i < compFleet.length; i++) {
    computerBoard.fillBucket(compFleet[i]);
    computerBoard.assembleFleet(compFleet[i]);
  }

  //the following two loops create a fleet for the user and their bucket and the DOM
  for (let i = 0; i < userFleet.length; i++) {
    userBoard.fillBucket(userFleet[i]);
  }
  for (let i = 0; i < userBoard.bucket.length; i++) {
    builder.renderPieces(shipSelect, userBoard.bucket[i]);
  }
  computerBoard.computerPlacement();
  builder.renderBoard(userBoardDiv, userBoard);
  builder.renderBoard(compBoardDiv, computerBoard);
  drag.combineEvents();
});

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
    userBoard.bucket[i].changeOrientation();
    if (bucket[i].classList.contains("docked")) {
      bucket[i].classList.toggle(`${userBoard.bucket[i].name}-horizontal`);
      bucket[i].classList.toggle(`${userBoard.bucket[i].name}-vertical`);
    }
  }
});

const restart = document.getElementById("restart");
restart.addEventListener("click", () => {
  const compFleet = builder.newFleet();
  const userFleet = builder.newFleet();
  userBoard.fleet = [];
  computerBoard.fleet = [];
  userBoard.generateBoard();
  computerBoard.generateBoard();

  for (let i = 0; i < compFleet.length; i++) {
    computerBoard.fillBucket(compFleet[i]);
    computerBoard.assembleFleet(compFleet[i]);
  }

  //the following two loops create a fleet for the user and their bucket and the DOM
  for (let i = 0; i < userFleet.length; i++) {
    userBoard.fillBucket(userFleet[i]);
  }
  for (let i = 0; i < userBoard.bucket.length; i++) {
    builder.renderPieces(shipSelect, userBoard.bucket[i]);
  }
  computerBoard.computerPlacement();
  builder.renderBoard(userBoardDiv, userBoard);
  builder.renderBoard(compBoardDiv, computerBoard);
  drag.combineEvents();
  document.getElementById("result").style.visibility = "hidden";
  compBoardDiv.style.visibility = "hidden";
  startBtn.style.visibility = "visible";
  flipBtn.style.visibility = "visible";
});

compBoardDiv.addEventListener("click", (e) => {
  const target = e.target;
  const row = target.dataset.row;
  const col = target.dataset.col;
  const result = document.getElementById("result");
  const winner = document.getElementById("winner");
  console.log(computerBoard.fleet);
  if (target.classList.contains("hit") || target.classList.contains("miss"))
    return;
  user.attack(computerBoard, row, col);
  if (computerBoard.board[row][col] === "miss") {
    target.classList.add("miss");
  } else {
    target.classList.add("hit");
  }
  computer.computerAttack(userBoard);
  builder.renderBoard(userBoardDiv, userBoard);
  if (computerBoard.gameOver() === true) {
    result.style.visibility = "visible";
    winner.textContent = "You won!";
  }
  if (userBoard.gameOver() === true) {
    result.style.visibility = "visible";
    winner.textContent = "You lose...";
  }
});
