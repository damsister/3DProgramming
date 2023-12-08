const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

let heartPoints = []; 

// 하트를 그리는 함수
function drawHeart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "red";
  ctx.beginPath();

  for (let t = 0; t <= Math.PI * 2; t += 0.01) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    heartPoints.push({ x, y });
  }

  for (let i = 0; i < heartPoints.length; i++) {
    ctx.lineTo(canvas.width / 2 + heartPoints[i].x, canvas.height / 2 + heartPoints[i].y);
  }


  ctx.stroke();
  ctx.closePath();
}

// 초기화 함수
function resetCanvas() {
  heartPoints = [];
  drawHeart();
  document.getElementById("translateX").value = 0;
  document.getElementById("translateY").value = 0;
  document.getElementById("rotateAngleX").value = 0;
  document.getElementById("rotateAngleY").value = 0;
  document.getElementById("rotateAngleZ").value = 0;
  document.getElementById("scaleX").value = 1;
  document.getElementById("scaleY").value = 1;
  document.getElementById("scaleZ").value = 1;
}

// 행렬 곱 함수
function hwMatrixMultiply(matrix1, matrix2) {
  const result = [];
  for (let i = 0; i < matrix1.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrix1[0].length; k++) {
        sum += matrix1[i][k] * matrix2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

// 이동 행렬 함수
function hwTranslateMatrix(tx, ty) {
  return [
    [1, 0, tx],
    [0, 1, ty],
    [0, 0, 1]
  ];
}

// 확대/축소 행렬 함수
function hwScaleMatrix(sx, sy) {
  return [
    [sx, 0, 0],
    [0, sy, 0],
    [0, 0, 1]
  ];
}

// 회전 행렬 함수
function hwRotationMatrix(angle) {
  const rad = angle * (Math.PI / 180);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return [
    [cos, -sin, 0],
    [sin, cos, 0],
    [0, 0, 1]
  ];
}

// 현재 적용된 행렬
let currentMatrix = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
];

// 버튼 클릭 이벤트 핸들러
document.getElementById("draw").addEventListener("click", function () {
  drawHeart();
});

document.getElementById("reset").addEventListener("click", function () {
  resetCanvas();
});

// 이동 값 변경시 Canvas에 적용
document.getElementById("translateX").addEventListener("input", function () {
  translateX = parseFloat(this.value);
  drawHeart();
});

document.getElementById("translateY").addEventListener("input", function () {
  translateY = parseFloat(this.value);
  drawHeart();
});