// DOM Element
const boxes = document.getElementsByClassName("box");
const scoreBoard = document.getElementById("score-board");
const messageBox = document.getElementById("message-box");

// Variables
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let table = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let whoseTurn = 1; // 1 = X, 2 = O
let xScore = 0;
let yScore = 0;
let isEnded = false;

// Put an X or O in the clicked box
function play(id) {
  let box = document.getElementById(id);
  if (box.innerHTML == "") {
    if (whoseTurn === 1) {
      box.innerHTML = "X";
      table[id] = 1;
      updateState(whoseTurn);
      whoseTurn = 2;
    } else {
      box.innerHTML = "O";
      table[id] = 2;
      updateState(whoseTurn);
      whoseTurn = 1;
    }
  }
}

// Push clicked indexes into arrays for playing user
function updateState(player) {
  let xIndex = [];
  let yIndex = [];
  if (player === 1) {
    for (let i = 0; i < table.length; i++) {
      if (table[i] === 1) {
        xIndex.push(i);
      }
    }
    if (xIndex.length >= 3) {
      checkIfEnds(1, xIndex);
    }
  } else {
    for (let i = 0; i < table.length; i++) {
      if (table[i] === 2) {
        yIndex.push(i);
      }
    }
    if (yIndex.length >= 3) {
      checkIfEnds(2, yIndex);
    }
  }
}

// Check if playing user has a winning position
function checkIfEnds(playedUser, playedIndex) {
  if (!table.includes(0) && !isEnded) {
    console.log("Tie");
    isEnded = true;
    setTimeout(resetGame, 2000);
  }
  winningPositions.forEach(function(el) {
    let count = 0;
    for (let i = 0; i < playedIndex.length; i++) {
      for (let j = 0; j < 3; j++) {
        if (playedIndex[i] == el[j]) {
          count++;
          if (count == 3) {
            if (playedUser === 1) {
              console.log("X WON !!!");
              xScore++;
              setTimeout(resetGame, 2000);
            } else {
              console.log("O WON !!!");
              yScore++;
              setTimeout(resetGame, 2000);
            }
            scoreBoard.innerHTML = `<strong>X</strong>: ${xScore} | <strong>O</strong>: ${yScore}`;
            isEnded = true;
          }
        }
      }
    }
  });
}

// Reset everything
function resetGame() {
  isEnded = false;
  table = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  whoseTurn = 1;
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
  }
}
