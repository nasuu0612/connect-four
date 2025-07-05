// DOM操作（盤面生成・描画更新・入力受付）

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
 * 盤面のHTML要素を作成し、指定されたコンテナに追加する関数。
 * それぞれのセルは div 要素で作られ、クリックすると列番号を引数にして
 * コールバック関数 onColumnClick が呼ばれる。
 * 
 * @param {HTMLElement} container 盤面を表示する親要素（DOMノード）
 * @param {function} onColumnClick 列がクリックされたときに呼ばれる関数。引数に列番号（0〜6）を受け取る
 */
export function createBoard(container, onColumnClick) {
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = r;  // → <div data-row="r">
      cell.dataset.col = c;
      cell.addEventListener("click", () => onColumnClick(c));
      container.appendChild(cell);
    }
  }
}

/**
 * 盤面の状態に合わせて、HTMLのセルの見た目を更新する関数。
 * board 配列の値に応じて、それぞれのセルに色のクラスを付与する。
 *
 * @param {HTMLElement} container 盤面の親要素（すべてのセルが子要素として入っている）
 * @param {number[][]} board 盤面の状態を示す2次元配列（6行×7列）、0=空、1=赤、2=黄
 */
export function updateBoard(container, board) {
  const cells = container.children;
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const r = parseInt(cell.dataset.row);
    const c = parseInt(cell.dataset.col);
    cell.className = "cell"; // classをリセットすることできちんと色が入るようにしている
    if (board[r][c] === 1) cell.classList.add("red");
    if (board[r][c] === 2) cell.classList.add("yellow");
  }
}
