var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

drawBackground();
drawSun();

// Первая ветка идет прямо вверх (-Math.PI / 2), всего у дерева будет 12 уровней ветвей, и начальная ширина 15 px;
drawTree(320, 600, 60, -Math.PI / 2, 12, 15);
drawTree(500, 600, 60, -Math.PI / 2, 12, 7);
drawTree(680, 600, 60, -Math.PI / 2, 12, 15);
drawTree(750, 600, 60, -Math.PI / 2, 12, 15);

function drawTree(startX, startY, length, angle, depth, branchWidth) {
  var rand = Math.random;
  var newLength, newAngle, newDepth, maxBranch = 3,
      endX, endY, maxAngle = 2 * Math.PI / 6, subBranches;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  endX = startX + length * Math.cos(angle);
  endY = startY + length * Math.sin(angle);
  ctx.lineCap = 'round';
  ctx.lineWidth = branchWidth;
  ctx.lineTo(endX, endY);

  //если глубина не более 2 (мы находимся в верхушке дерева) меняем цвет на более светлый
  //выражение x >> 0 применяется для того чтобы быстро выполнить операцию округления
  if (depth <= 2) {
    ctx.strokeStyle = 'rgb(0,' + (((rand() * 64) + 128) >> 0) + ',0)';
  }
  else {
    ctx.strokeStyle = 'rgb(0,' + (((rand() * 64) + 64) >> 0) + ',20)';
  }
  ctx.stroke();
  newDepth = depth - 1;

  if(!newDepth) {
    return;
  }
  subBranches = (rand() * (maxBranch - 1)) + 1;
  branchWidth *= 0.7;

  for (var i = 0; i < subBranches; i++) {
    newAngle = angle + rand() * maxAngle - maxAngle * 0.5;
    newLength = length * (0.7 + rand() * 0.3);
    //рекурсивный вызов функции с новыми параметрами
    drawTree(endX, endY, newLength, newAngle, newDepth, branchWidth);
  }

}

function drawBackground() {
  var lg = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  lg.addColorStop(0, "#00BFFF");
  lg.addColorStop(0.5, "white");
  lg.addColorStop(0.5, "#55DD00");
  lg.addColorStop(1, "white");
  ctx.fillStyle = lg;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawSun() {
  var rg = ctx.createRadialGradient(1100, 64, 48, 1100, 64, 64);
  rg.addColorStop(0, 'white');
  rg.addColorStop(1, 'rgba(255, 255, 0, 0)');
  ctx.fillStyle = rg;
  ctx.fillRect(1000, 0, 200, 200);
}