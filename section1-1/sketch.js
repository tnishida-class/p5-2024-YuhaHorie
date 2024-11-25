let cols = 10; // グリッドの列数
let rows = 20; // グリッドの行数
let grid;
let currentPiece;
let pieces = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[1, 1, 1], [0, 1, 0]], // T
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
  [[1, 1, 1], [1, 0, 0]], // L
  [[1, 1, 1], [0, 0, 1]]  // J
];

function setup() {
  createCanvas(300, 600);
  grid = createEmptyGrid(cols, rows);
  currentPiece = new Piece(random(pieces));
}

function draw() {
  background(0);
  drawGrid(grid);
  currentPiece.show();
  currentPiece.update();

  if (currentPiece.landed) {
    mergePieceToGrid(currentPiece, grid);
    clearFullRows(grid);
    currentPiece = new Piece(random(pieces));
    if (!currentPiece.isValid(grid)) {
      noLoop(); // ゲームオーバー
      console.log("Game Over");
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    currentPiece.move(-1);
  } else if (keyCode === RIGHT_ARROW) {
    currentPiece.move(1);
  } else if (keyCode === DOWN_ARROW) {
    currentPiece.drop();
  } else if (keyCode === UP_ARROW) {
    currentPiece.rotate();
  }
}

function createEmptyGrid(cols, rows) {
  let arr = [];
  for (let i = 0; i < rows; i++) {
    arr.push(new Array(cols).fill(0));
  }
  return arr;
}

function drawGrid(grid) {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) fill(255);
      else fill(50);
      stroke(0);
      rect(x * 30, y * 30, 30, 30);
    }
  }
}

function mergePieceToGrid(piece, grid) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] === 1) {
        grid[piece.y + y][piece.x + x] = 1;
      }
    }
  }
}

function clearFullRows(grid) {
  for (let y = grid.length - 1; y >= 0; y--) {
    if (grid[y].every(cell => cell === 1)) {
      grid.splice(y, 1);
      grid.unshift(new Array(cols).fill(0));
      y++; // 再チェックのため
    }
  }
}

class Piece {
  constructor(shape) {
    this.shape = shape;
    this.x = floor(cols / 2) - floor(shape[0].length / 2);
    this.y = 0;
    this.landed = false;
    this.dropTime = 0;
  }

  show() {
    fill(200, 0, 200);
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x] === 1) {
          rect((this.x + x) * 30, (this.y + y) * 30, 30, 30);
        }
      }
    }
  }

  update() {
    this.dropTime++;
    if (this.dropTime > 30) { // 落下速度調整
      this.y++;
      if (!this.isValid(grid)) {
        this.y--;
        this.landed = true;
      }
      this.dropTime = 0;
    }
  }

  move(dir) {
    this.x += dir;
    if (!this.isValid(grid)) {
      this.x -= dir; // 移動が無効なら戻す
    }
  }

  drop() {
    this.y++;
    if (!this.isValid(grid)) {
      this.y--;
      this.landed = true;
    }
  }

  rotate() {
    let newShape = this.shape[0].map((_, i) => this.shape.map(row => row[i]).reverse());
    let oldShape = this.shape;
    this.shape = newShape;

    if (!this.isValid(grid)) {
      this.shape = oldShape; // 回転が無効なら元に戻す
    }
  }

  isValid(grid) {
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x] === 1) {
          let newX = this.x + x;
          let newY = this.y + y;
          if (newX < 0 || newX >= cols || newY >= rows || (newY >= 0 && grid[newY][newX] === 1)) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
