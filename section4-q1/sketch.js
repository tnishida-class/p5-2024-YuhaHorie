// テキスト「配列を使った描画」練習問題：折れ線グラフ

function setup(){
  createCanvas(400, 400);
  background(240);

  // 配列をランダムに初期化する
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores)

  // 横線を引く
  const n = 10;
  for(let i = 0; i < n; i++){ line(0, height * i / n, width, height * i / n); }

  //点グラフの描画
  for (let i = 0; i < scores.length; i++) {
    const x = i * (width / scores.length) + (width / scores.length) / 2; // x座標を計算
    const y = height - (scores[i] / 100) * height; 
    fill(0); // 点の色を黒に設定
    ellipse(x, y, 10, 10); // 各スコアを点で描画
  
  // 点と点を線でつなぐ
  if (i > 0) { // 2番目以降の点から線を描画
    line(previousX, previousY, x, y); // 前の点と現在の点を線で結ぶ
  }

  // 現在の点の座標を次のループ用に保存
  previousX = x;
  previousY = y;
}

  // ここからが本番
  //fill(0);
  //const dx = width / scores.length;
  let px, py; // 線を引くために一つ前の点を覚えておく変数
  for(let i = 0; i < scores.length; i++){
    // BLANK[1]
  }
}
