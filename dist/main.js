(()=>{"use strict";class e{constructor(e,t){this.name=e,this.length=t,this.orientation="horizontal",this.hits=[]}hit(e){this.hits.includes(e)||e<0||e>=this.length||this.hits.push(e)}isSunk(){return this.hits.length===this.length}changeOrientation(){return"horizontal"===this.orientation?this.orientation="vertical":this.orientation="horizontal"}}class t{constructor(e){this.owner=e,this.board=[],this.fleet=[],this.bucket=[],this.loser=!1}generateBoard(){for(let e=0;e<10;e++)this.board[e]=new Array(10).fill(null);return this.board}fillBucket(e){this.bucket.includes(e)||this.bucket.push(e)}assembleFleet(e){this.fleet.includes(e)||this.fleet.push(e)}placeShip(e,t,i){if(this.isLegal(e,t,i))if("horizontal"===e.orientation)for(let n=0;n<e.length;n++)this.board[t][i+n]=e;else for(let n=0;n<e.length;n++)this.board[t+n][i]=e}random(){return Math.floor(10*Math.random())}randomOrientation(e){const t=Math.random()<.5;for(let i=0;i<this.fleet.length;i++)t&&e.changeOrientation()}computerPlacement(){const e=this.random(),t=this.random();for(let i=0;i<this.bucket.length;i++){if(this.randomOrientation(this.bucket[i]),0===this.bucket.length)return;if(this.isLegal(this.bucket[i],e,t)){if("horizontal"===this.bucket[i].orientation&&this.isLegal(this.bucket[i],e,t))for(let n=0;n<this.bucket[i].length;n++)this.board[e][t+n]=this.bucket[i];else if("vertical"===this.bucket[i].orientation&&this.isLegal(this.bucket[i],e,t))for(let n=0;n<this.bucket[i].length;n++)this.board[e+n][t]=this.bucket[i]}else this.computerPlacement();this.bucket.shift(),this.computerPlacement()}}isLegal(e,t,i){if(t<0||t>9||i<0||i>9)return!1;if("horizontal"===e.orientation){if(i+e.length>9)return!1;for(let n=0;n<e.length;n++)if(this.board[t][i+n])return!1}else if("vertical"===e.orientation){if(t+e.length>9)return!1;for(let n=0;n<e.length;n++)if(this.board[t+n][i])return!1}return!0}receiveAttack(e,t){"hit"!==this.board[e][t]&&"miss"!==this.board[e][t]&&(null===this.board[e][t]?this.board[e][t]="miss":this.board[e][t]="hit")}gameOver(){this.loser=this.fleet.every((e=>e.isSunk()))}}const i=document.getElementById("player-container"),n=document.getElementById("computer-container"),r=new t("human"),s=new t("computer"),o=new class{appendCells(e,t,i){return`<div class="cell ${i}" data-row="${e}" data-col="${t}" ></div>`}appendPieces(e){return`<div class="${e}-docked-horizontal ${e}" draggable="true"></div>`}renderPieces(e,t){let i=this.appendPieces(t);e.innerHTML+=i}renderBoard(e,t){this.resetBoard(e);let i="";for(let e=0;e<t.board.length;e++)for(let n=0;n<t.board.length;n++){let r=t.board[e][n];null===r?r="":null!==r&&"object"==typeof r&&(r="computer"===t.owner?r.name:""),i+=this.appendCells(e,n,r)}e.insertAdjacentHTML("afterbegin",i)}resetBoard(e){e.textContent=""}newFleet(){return[new e("carrier",5),new e("battleship",4),new e("destroyer",3),new e("cruiser",3),new e("submarine",2)]}},l=document.getElementById("ship-select");window.addEventListener("DOMContentLoaded",(()=>{console.log("they flip");const e=o.newFleet(),t=o.newFleet();r.generateBoard(),s.generateBoard();for(let t=0;t<e.length;t++)r.fillBucket(e[t]),s.assembleFleet(e[t]);for(let e=0;e<t.length;e++)s.fillBucket(t[e]);for(let e=0;e<r.bucket.length;e++)o.renderPieces(l,r.bucket[e].name);s.computerPlacement(),o.renderBoard(i,r),o.renderBoard(n,s)})),document.getElementById("flip").addEventListener("click",(function(){const e=Array.from(l.children);for(let t=0;t<e.length;t++)console.log(e[t]),e[t].classList.contains(r.bucket[t].name)&&(e[t].classList.toggle(`${r.bucket[t].name}-docked-horizontal`),e[t].classList.toggle(`${r.bucket[t].name}-docked-vertical`))}))})();
//# sourceMappingURL=main.js.map