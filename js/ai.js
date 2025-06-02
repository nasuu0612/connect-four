//AI(最善手を選ぶロジック）

import { dropDisc, checkWin } from './game.js';

export function getBestMove(board, player) {
  for (let c = 0; c < 7; c++) {
    const temp = board.map(row => [...row]);
    // 一時的にディスクを落としてみて、1手で勝てるならそこに置く
    if (dropDisc(temp, c, player) && checkWin(temp, player)) {
      return c;
    }
  }
  // 今はランダムに選ぶだけ
  // ここにAI入れたい
  return getRandomMove(board);
}

function getRandomMove(board) {
  const valid = [];
  for (let c = 0; c < 7; c++) {
    if (board[0][c] === 0) valid.push(c);
  }
  return valid[Math.floor(Math.random() * valid.length)];
}
