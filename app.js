"use strict";

var gCells = 16;
var gBoard;
var currCount = 1;

// init();

function init() {
  gBoard = createBoard(gCells);
  renderBoard(gBoard);
  console.log("initialized");
}

function numsObj() {
  var shuffled = [];
  var nums = [];
  for (var i = 0; i < gCells; i++) {
    var num = { num: i };
    nums.push(num);
  }
  shuffled = shuffle(nums);
  return shuffled;
}

function createBoard(gCells) {
  var board = [];
  for (var i = 0; i < Math.sqrt(gCells); i++) {
    board[i] = [];
    for (var j = 0; j < Math.sqrt(gCells); j++) {
      board[i][j] = j;
    }
  }
  console.table(board);
  return board;
}

function renderBoard(gBoard) {
  console.table(gBoard);
  console.log(gCells);
  var shuffled = numsObj();
  var cell = 0;
  var strHTML = "";
  for (var i = 0; i < Math.sqrt(gCells); i++) {
    strHTML += "<tr>";
    for (var j = 0; j < Math.sqrt(gCells); j++) {
      strHTML += `<td onClick="checkPop(this)" class="cell">${
        shuffled[cell].num + 1
      }</td>`;
      cell++;
    }
    strHTML += "</tr>";
  }
  var elBoard = document.querySelector(".board");
  elBoard.innerHTML = strHTML;
}

function checkPop(num) {
  console.log(currCount);
  console.log(num.innerText);
  if (currCount === +num.innerText) {
    if (currCount === 1 ) {
      secsCountdown();
    }
    if (currCount === gCells) {
      checkVictory();
    }
    num.classList.remove("cell");
    num.classList.add("correctAns");
    currCount++;
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;  
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function secsCountdown() {
  var secs = document.querySelector(".secs");
  secs.innerText = "";
  var timeleft = 30;

  var countdownClock = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(countdownClock);
      secs.innerHTML = "00.000";
      alert("Game Over");
    } else {
      secs.innerHTML = timeleft.toFixed(3);
    }
    timeleft -= 0.001;
  }, 10);
}

function changeLevel(level) {
  var cellsNum = 0;
  console.log(level.classList);
  if (level.classList[0] === "hard") {
    cellsNum = 36;
  }
  if (level.classList[0] === "medium") {
    cellsNum = 25;
  }
  if (level.classList[0] === "easy") {
    cellsNum = 16;
  }

  resetGame(cellsNum);
}

function resetGame(dig) {
  gCells = dig;
  currCount = 1;
  gBoard = createBoard(dig); // returns 2d array
  renderBoard(gBoard);
}

function checkVictory() {
  if (currCount === gCells) {
    alert("victory");
  }
}
