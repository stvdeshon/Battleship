// import GameBoard from "./gameboard";
// import Ship from "./ships";
// import Player from "./players";

// computerPlacement() {
//     const row = this.random(),
//       col = this.random();

//     for (let s = 0; s < this.fleet.length; s++) {
//       this.randomOrientation(this.fleet[s]);
//       console.log(this.fleet[s].orientation + " " + this.fleet[s].name);
//       if (
//         this.fleet[s].orientation === "horizontal" &&
//         !this.isLegal(this.fleet[s], row, col)
//       ) {
//         this.computerPlacement();
//       } else if (
//         this.fleet[s].orientation === "vertical" &&
//         !this.isLegal(this.fleet[s], row, col)
//       ) {
//         this.computerPlacement();
//       } else if (
//         this.fleet[s].orientation === "horizontal" &&
//         this.isLegal(this.fleet[s], row, col)
//       ) {
//         console.log(this.isLegal(this.fleet[s], row, col));
//         for (let i = 0; i < this.fleet[s].length; i++) {
//           this.board[row][col + i] = this.fleet[s];
//         }
//       } else if (
//         this.fleet[s].orientation === "vertical" &&
//         this.isLegal(this.fleet[s], row, col)
//       ) {
//         console.log(this.isLegal(this.fleet[s], row, col));
//         for (let i = 0; i < this.fleet[s].length; i++) {
//           this.board[row + i][col] = this.fleet[s];
//         }
//       }
//     }
//     console.log(this.board);
//   }
