import BoardBuilder from "./board-builder";
const DragDrop = (userBoardClass, userBoardDiv) => {
  const builder = new BoardBuilder();
  let draggedShip;

  function dragStart(e) {
    draggedShip = e.target;
    console.log("start");
  }

  function dragOver(e) {
    e.preventDefault();
    console.log("over");
  }

  function dragEnter(e) {
    e.preventDefault();
    console.log("enter");
  }

  function dragLeave() {
    console.log("leave");
  }

  function dragEnd() {
    console.log("end");
  }

  function index() {
    for (let i = 0; i < userBoardClass.bucket.length; i++) {
      if (userBoardClass.bucket[i].name === draggedShip.dataset.type) {
        return userBoardClass.bucket[i];
      }
    }
  }

  function dragDrop(e) {
    const cell = e.target;

    const ship = index();

    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    const legal = userBoardClass.placeShip(ship, row, col);
    if (legal) {
      userBoardClass.placeShip(ship, row, col);
      builder.renderBoard(userBoardDiv, userBoardClass);
      combineEvents();
      draggedShip.parentElement.removeChild(draggedShip);
    }
    console.log(userBoardClass.board);
  }

  function combineEvents() {
    const docked = document.querySelectorAll(".docked");
    const grid = userBoardDiv.childNodes;

    for (const ship of docked) {
      ship.addEventListener("dragstart", dragStart);
      ship.addEventListener("dragend", dragEnd);
    }
    for (const cells of grid) {
      cells.addEventListener("dragover", dragOver);
      cells.addEventListener("dragenter", dragEnter);
      cells.addEventListener("dragleave", dragLeave);
      cells.addEventListener("drop", dragDrop);
    }
  }

  return { combineEvents };
};

export default DragDrop;
