// 最終課題を制作しよう

let balls;
let target;
const g = 1; // 重力加速度
const vyMax = 30;
let score = 0; // スコアを管理

function setup() {
  createCanvas(windowWidth, windowHeight);
  balls = [];
  generateNewTarget(); // 初期のターゲットを生成
}

function draw() {
  background(160, 192, 255);

  // ターゲットを描画
  fill(255, 0, 0);
  ellipse(target.x, target.y, target.size);

  // ターゲットの動き
  target.x += target.vx;
  target.y += target.vy;

  // 重力の影響
  target.vy = constrain(target.vy + g, -vyMax, vyMax);

  // 端の処理: 跳ね返る
  if (target.x < 0 || target.x > width) {
    target.vx = -target.vx;
  }
  if (target.y > height) {
    target.vy = -target.vy;
  }
  target.x = constrain(target.x, 0, width);
  target.y = constrain(target.y, 0, height);

  // ボールを描画・移動
  for (let i = balls.length - 1; i >= 0; i--) {
    let b = balls[i];
    fill(0, 100, 255);
    ellipse(b.x, b.y, b.size);
    b.x += b.vx;
    b.y += b.vy;

    // ボールがターゲットに当たったかチェック
    if (dist(b.x, b.y, target.x, target.y) < (b.size + target.size) / 2) {
      balls.splice(i, 1); // ボールを削除
      score++; // スコアを加算
      generateNewTarget(); // 新しいターゲットを生成
    } else if (b.x < 0 || b.x > width || b.y < 0 || b.y > height) {
      // ボールが画面外に出た場合削除
      balls.splice(i, 1);
    }
  }

  // スコアを表示
  fill(0);
  textSize(16);
  text(`Score: ${score}`, 10, 20);
}

function mouseDragged() {
  const dx = mouseX - pmouseX;
  const dy = mouseY - pmouseY;
  if (mag(dx, dy) > 5) {
    const size = random(3, 20);
    const b = { x: mouseX, y: mouseY, size: size, vx: dx, vy: dy };
    balls.push(b);
  }
}

// ターゲットのデータを生成
function generateNewTarget() {
  target = {
    x: width / 2,
    y: height / 2,
    size: 30, // ターゲットのサイズ
    vx: random(-8, 8), // 初期速度をランダムに設定
    vy: random(-8, 8)
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
