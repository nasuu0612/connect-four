// main.js
import { createBoard, updateBoard } from './js/board.js';
import { createEmptyBoard, dropDisc, checkWin } from './js/game.js';
import { getBestMove } from './js/ai.js';

const board = createEmptyBoard();
const boardDiv = document.getElementById("board");
const message = document.getElementById("message");
let currentPlayer = 1;

createBoard(boardDiv, handlePlayerMove);
updateBoard(boardDiv, board);

function handlePlayerMove(col) {
  if (currentPlayer !== 1) return;
  if (dropDisc(board, col, 1)) {
    updateBoard(boardDiv, board);
    if (checkWin(board, 1)) {
      message.textContent = "あなたの勝ち！";
      return;
    }
    currentPlayer = 2;
    setTimeout(handleAIMove, 500);
  }
}

function handleAIMove() {
  const aiCol = getBestMove(board, 2);
  dropDisc(board, aiCol, 2);
  updateBoard(boardDiv, board);
  if (checkWin(board, 2)) {
    message.textContent = "AIの勝ち！";
    return;
  }
  currentPlayer = 1;
  message.textContent = "あなたの番！";
}
