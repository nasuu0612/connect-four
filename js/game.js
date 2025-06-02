//盤面データ操作（石を置く・勝敗判定・ターン管理）

/**
 * 6行7列の空の盤面（すべて0で初期化された2次元配列）を作成する。
 * 各要素は 0（未使用）で、1(先攻)や2(後攻)でプレイヤーの手を表す。
 *
 * @returns {number[][]} - 初期状態の盤面（6x7の2次元配列）
 */
export function createEmptyBoard() {
    return Array.from({ length: 6 }, () => Array(7).fill(0));
}

/**
 * 指定した列にプレイヤーのディスクを落とす関数。
 * 一番下の空いているマスにディスクを配置し、成功すれば true を返す。
 * 列が埋まっていて配置できない場合は false を返す。
 * 先攻(1)が4列目にディスクを落とすときはdropDisc(board, 3, 1);
 *
 * @param {number[][]} board 現在の盤面（6x7の2次元配列）
 * @param {number} col ディスクを落とす列（0〜6）
 * @param {number} player プレイヤー番号（1 = 先攻, 2 = 後攻）
 * @returns {boolean} ディスクの配置に成功したかどうか
 */
export function dropDisc(board, col, player) {
    for (let r = 5; r >= 0; r--) {
        if (board[r][col] === 0) {
            board[r][col] = player;
            return true;
        }
    }
    return false;
}

/**
 * プレイヤーが勝っているか（4つ並んでいるか）を確認する関数
 *
 * @param {number[][]} board 現在の盤面（6x7）
 * @param {number} player チェック対象のプレイヤー番号（1または2）
 * @returns {boolean} 勝っていれば true、勝っていなければ false
 */
export function checkWin(board, player) {
    const rowCount = 6;
    const colCount = 7;

    // 各マスをチェック
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            // 現在のマスが対象プレイヤーのディスクでなければスキップ
            if (board[row][col] !== player) continue;

            // 横（→）チェック
            if (col + 3 < colCount &&
                board[row][col + 1] === player &&
                board[row][col + 2] === player &&
                board[row][col + 3] === player) {
                return true;
            }

            // 縦（↓）チェック
            if (row + 3 < rowCount &&
                board[row + 1][col] === player &&
                board[row + 2][col] === player &&
                board[row + 3][col] === player) {
                return true;
            }

            // 右下（↘）チェック
            if (row + 3 < rowCount && col + 3 < colCount &&
                board[row + 1][col + 1] === player &&
                board[row + 2][col + 2] === player &&
                board[row + 3][col + 3] === player) {
                return true;
            }

            // 左下（↙）チェック
            if (row + 3 < rowCount && col - 3 >= 0 &&
                board[row + 1][col - 1] === player &&
                board[row + 2][col - 2] === player &&
                board[row + 3][col - 3] === player) {
                return true;
            }
        }
    }

    // どこにも4つ並びがなければfalseを返す
    return false;
}
