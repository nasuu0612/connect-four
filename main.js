// main.js
import { createBoard, updateBoard } from './js/board.js';
import { createEmptyBoard, dropDisc, checkWin } from './js/game.js';
import { getBestMove } from './js/ai.js';
import { showStartScreen, showGameScreen } from './js/screen.js'
import { getPlayerTypeAndName } from './js/start.js';

const board = createEmptyBoard();
const boardDiv = document.getElementById("board");
const message = document.getElementById("message");
const startButton = document.getElementById("start-button");
let currentPlayer = 1;
let player1, player2;

showStartScreen();

startButton.addEventListener("click", () => {
  player1 = getPlayerTypeAndName("one-player-type", "one-player-name")||"おまえ";
  player2 = getPlayerTypeAndName("two-player-type", "two-player-name")||"てめえ";
  showGameScreen();
  message.textContent = player1 + "のばん";
  createBoard(boardDiv, handlePlayerMove);
  updateBoard(boardDiv, board);
});


function handlePlayerMove(col) {
  if (currentPlayer !== 1) return;
  if (dropDisc(board, col, 1)) {
    updateBoard(boardDiv, board);
    if (checkWin(board, 1)) {
      message.textContent = player1 + "のかち！";
      return;
    }
    currentPlayer = 2;
    message.textContent = player2 + "のばん";
    setTimeout(handleAIMove, 500);
  }
}

function handleAIMove() {
  const aiCol = getBestMove(board, 2);
  dropDisc(board, aiCol, 2);
  updateBoard(boardDiv, board);
  if (checkWin(board, 2)) {
    message.textContent = player2 + "のかち！";
    return;
  }
  currentPlayer = 1;
  message.textContent = player1 + "のばん";
}