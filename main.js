(()=>{"use strict";class e{constructor(e,t){this.name=e,this.length=t,this.orientation="horizontal",this.hits=[]}hit(e){this.hits.includes(e)||e<0||e>=this.length||this.hits.push(e)}isSunk(){return this.hits.length===this.length}changeOrientation(){return"horizontal"===this.orientation?this.orientation="vertical":this.orientation="horizontal"}}class t{constructor(e){this.owner=e,this.board=[],this.fleet=[],this.bucket=[],this.loser=!1}generateBoard(){for(let e=0;e<10;e++)this.board[e]=new Array(10).fill(null);return this.board}fillBucket(e){this.bucket.includes(e)||this.bucket.push(e)}assembleFleet(e){this.fleet.includes(e)||this.fleet.push(e)}placeShip(e,t,n){let r=this.bucket.indexOf(e);if(!this.isLegal(e,t,n))return!1;if("horizontal"===e.orientation){this.assembleFleet(e);for(let r=0;r<e.length;r++)this.board[t][n+r]=e}else{this.assembleFleet(e);for(let r=0;r<e.length;r++)this.board[t+r][n]=e}return this.bucket.splice(r,1),!0}random(){return Math.floor(10*Math.random())}randomOrientation(e){const t=Math.random()<.5;for(let n=0;n<this.fleet.length;n++)t&&e.changeOrientation()}computerPlacement(){const e=this.random(),t=this.random();for(let n=0;n<this.bucket.length;n++){if(this.randomOrientation(this.bucket[n]),0===this.bucket.length)return;if(this.isLegal(this.bucket[n],e,t)){if("horizontal"===this.bucket[n].orientation&&this.isLegal(this.bucket[n],e,t))for(let r=0;r<this.bucket[n].length;r++)this.board[e][t+r]=this.bucket[n];else if("vertical"===this.bucket[n].orientation&&this.isLegal(this.bucket[n],e,t))for(let r=0;r<this.bucket[n].length;r++)this.board[e+r][t]=this.bucket[n]}else this.computerPlacement();this.bucket.shift(),this.computerPlacement()}}isLegal(e,t,n){if(t<0||t>9||n<0||n>9)return!1;if("horizontal"===e.orientation){if(n+e.length>9)return!1;for(let r=0;r<e.length;r++)if(this.board[t][n+r])return!1}else if("vertical"===e.orientation){if(t+e.length>9)return!1;for(let r=0;r<e.length;r++)if(this.board[t+r][n])return!1}return!0}receiveAttack(e,t){"hit"!==this.board[e][t]&&"miss"!==this.board[e][t]&&(null===this.board[e][t]?this.board[e][t]="miss":this.board[e][t]="hit")}gameOver(){this.loser=this.fleet.every((e=>e.isSunk()))}}const n=document.getElementById("player-container"),r=document.getElementById("computer-container"),i=new t("human"),o=new t("computer"),s=new class{appendCells(e,t,n){return`<div class="cell ${n}" data-row="${e}" data-col="${t}" ></div>`}appendPieces(e){return`<div id="${e}" class="${e}-horizontal docked" data-type="${e}" draggable="true"></div>`}renderPieces(e,t){let n=this.appendPieces(t.name);e.innerHTML+=n}renderBoard(e,t){this.resetBoard(e);let n="";for(let e=0;e<t.board.length;e++)for(let r=0;r<t.board.length;r++){let i=t.board[e][r];null===i?i="":null!==i&&"object"==typeof i&&(i="computer"===t.owner?i.name:""),n+=this.appendCells(e,r,i)}e.insertAdjacentHTML("afterbegin",n)}resetBoard(e){e.textContent=""}newFleet(){return[new e("carrier",5),new e("battleship",4),new e("destroyer",3),new e("cruiser",3),new e("submarine",2)]}},l=document.getElementById("ship-select"),a=((e,t)=>{let n;function r(e){n=e.target,console.log("start")}function i(e){e.preventDefault(),console.log("over")}function o(e){e.preventDefault(),console.log("enter")}function s(){console.log("leave")}function l(){console.log("end")}function a(t){const r=t.target,i=function(){for(let t=0;t<e.bucket.length;t++)if(e.bucket[t].name===n.dataset.type)return e.bucket[t]}(),o=Number(r.dataset.row),s=Number(r.dataset.col);e.placeShip(i,o,s)&&(e.placeShip(i,o,s),console.log(e.fleet),c(),n.parentElement.removeChild(n)),console.log(e.board)}function c(){const e=document.querySelectorAll(".docked"),n=t.childNodes;for(const t of e)t.addEventListener("dragstart",r),t.addEventListener("dragend",l);for(const e of n)e.addEventListener("dragover",i),e.addEventListener("dragenter",o),e.addEventListener("dragleave",s),e.addEventListener("drop",a)}return{combineEvents:c}})(i,n);window.addEventListener("DOMContentLoaded",(()=>{console.log("buc");const e=s.newFleet(),t=s.newFleet();i.generateBoard(),o.generateBoard();for(let t=0;t<e.length;t++)i.fillBucket(e[t]),o.assembleFleet(e[t]);for(let e=0;e<t.length;e++)o.fillBucket(t[e]);for(let e=0;e<i.bucket.length;e++)s.renderPieces(l,i.bucket[e]);o.computerPlacement(),s.renderBoard(n,i),s.renderBoard(r,o),a.combineEvents()})),document.getElementById("flip").addEventListener("click",(function(){const e=Array.from(l.children);for(let t=0;t<e.length;t++)i.bucket[t].changeOrientation(),console.log(i.bucket[t].orientation),e[t].classList.contains("docked")&&(e[t].classList.toggle(`${i.bucket[t].name}-horizontal`),e[t].classList.toggle(`${i.bucket[t].name}-vertical`))}))})();
//# sourceMappingURL=main.js.map