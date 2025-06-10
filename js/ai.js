// AI（最善手を選ぶロジック）

import { dropDisc, checkWin } from './game.js';

const MAX_DEPTH = 8;

export function getBestMove(board, player) {
  // 1手で勝てる手があれば優先
  for (let c = 0; c < 7; c++) {
    const temp = cloneBoard(board);
    if (dropDisc(temp, c, player) && checkWin(temp, player)) {
      return c;
    }
  }

  return alphaBetaRoot(board, player, MAX_DEPTH);
}

// アルファベータ探索
// 最善手のある列を返す、無ければランダムな列を返す
function alphaBetaRoot(board, player, depth) {
  let bestScore = -Infinity; //マイナス無限大
  let bestMove = -1; //最大スコアを出した列を記録

  for (let col = 0; col < 7; col++) {
    if (board[0][col] !== 0) continue; // 列が満杯ならスキップ
    const temp = cloneBoard(board); // 盤面をコピーして探索してみる
    dropDisc(temp, col, player);
    const score = alphaBeta(temp, depth - 1, -Infinity, Infinity, false, player);

    if (score > bestScore) {
      bestScore = score;
      bestMove = col;
    }
  }

  return bestMove !== -1 ? bestMove : getRandomMove(board);
}

// アルファベータ探索（評価値をもとに枝刈りして探索）
function alphaBeta(board, depth, alpha, beta, isMaximizing, currentPlayer) {
  const opponent = currentPlayer === 1 ? 2 : 1;

  if (checkWin(board, currentPlayer)) return 1000;
  if (checkWin(board, opponent)) return -1000;
  if (depth === 0 || isFull(board)) return evaluateBoard(board, currentPlayer);

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let col = 0; col < 7; col++) {
      if (board[0][col] !== 0) continue;
      const temp = cloneBoard(board);
      dropDisc(temp, col, currentPlayer);
      const evalScore = alphaBeta(temp, depth - 1, alpha, beta, false, currentPlayer);
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let col = 0; col < 7; col++) {
      if (board[0][col] !== 0) continue;
      const temp = cloneBoard(board);
      dropDisc(temp, col, opponent);
      const evalScore = alphaBeta(temp, depth - 1, alpha, beta, true, currentPlayer);
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

// 盤面を評価する関数
// 自分の2連: +10点、3連: +100点、4連: +1000点（勝利）
// 相手の3連はマイナス点にして防御も意識させる
function evaluateBoard(board, player) {
  const opponent = player === 1 ? 2 : 1;
  let score = 0;

  // 横・縦・斜めのすべてのラインを見る
  const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1]
  ];

  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      for (const [dr, dc] of directions) {
        let countPlayer = 0;
        let countOpponent = 0;
        for (let k = 0; k < 4; k++) {
          const nr = r + dr * k;
          const nc = c + dc * k;
          if (nr >= 0 && nr < 6 && nc >= 0 && nc < 7) {
            if (board[nr][nc] === player) countPlayer++;
            if (board[nr][nc] === opponent) countOpponent++;
          }
        }
        if (countPlayer > 0 && countOpponent === 0) {
          if (countPlayer === 2) score += 10;
          if (countPlayer === 3) score += 100;
          if (countPlayer === 4) score += 1000;
        } else if (countOpponent > 0 && countPlayer === 0) {
          if (countOpponent === 3) score -= 80; // 相手の3連はブロックしたい
          if (countOpponent === 4) score -= 1000;
        }
      }
    }
  }

  return score;
}

// 盤面が満杯かどうか
function isFull(board) {
  return board[0].every(cell => cell !== 0);
}

// 盤面をディープコピーする
function cloneBoard(board) {
  return board.map(row => [...row]);
}

// ランダムで合法手を選ぶ（詰み対策）
function getRandomMove(board) {
  const valid = [];
  for (let c = 0; c < 7; c++) {
    if (board[0][c] === 0) valid.push(c);
  }
  return valid[Math.floor(Math.random() * valid.length)];
}
