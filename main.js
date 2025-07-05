// main.js
import { createEmptyBoard, createBoard, updateBoard } from './js/board.js';
import { dropDisc, checkWin } from './js/game.js';
import { getBestMove } from './js/ai.js';
import { showStartScreen, showGameScreen } from './js/screen.js'
import { getPlayerTypeAndName } from './js/playerInfo.js';

const board = createEmptyBoard();
const boardDiv = document.getElementById("board");
const message = document.getElementById("message");
const startButton = document.getElementById("start-button");
let currentPlayer = 1;
let player1, player2, player1Type, player2Type;

showStartScreen();

startButton.addEventListener("click", () => {
  player1 = getPlayerTypeAndName("one-player-type", "one-player-name")||"おまえ";
  player2 = getPlayerTypeAndName("two-player-type", "two-player-name")||"てめえ";
  player1Type = player1 === "AI" ? "AI" : "human";
  player2Type = player2 === "AI" ? "AI" : "human";

  showGameScreen();
  message.textContent = player1 + "のばん";
  createBoard(boardDiv, handlePlayerMove);
  updateBoard(boardDiv, board);

  if (getCurrentPlayerType() === "AI") {
    setTimeout(handleAIMove, 500);
  }
});


function handlePlayerMove(col) {
  if (getCurrentPlayerType() !== "human") return;

  if (dropDisc(board, col, currentPlayer)) {
    updateBoard(boardDiv, board);
    if (checkWin(board, currentPlayer)) {
      message.textContent = getCurrentPlayerName() + "のかち！";
      return;
    }
    switchTurn();
  }
}

function handleAIMove() {
  const aiCol = getBestMove(board, currentPlayer);
  dropDisc(board, aiCol, currentPlayer);
  updateBoard(boardDiv, board);
  if (checkWin(board, currentPlayer)) {
    message.textContent = getCurrentPlayerName() + "のかち！";
    return;
  }
  switchTurn();
}

function switchTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  message.textContent = getCurrentPlayerName() + "のばん";

  if (getCurrentPlayerType() === "AI") {
    setTimeout(handleAIMove, 500);
  }
}

function getCurrentPlayerType() {
  return currentPlayer === 1 ? player1Type : player2Type;
}

function getCurrentPlayerName() {
  return currentPlayer === 1 ? player1 : player2;
}