const canvas = document.getElementById("heartCanvas");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const scale = 1;

    // Vector3 클래스 정의
    class Vector3 {
      constructor(x, y, z) {
        this.X = x;
        this.Y = y;
        this.Z = z;
      }

      // Vector3를 아핀 변환 행렬로 곱하는 메서드
      multiply(matrix) {
        return new Vector3(
          this.X * matrix[0] + this.Y * matrix[3] + this.Z * matrix[6],
          this.X * matrix[1] + this.Y * matrix[4] + this.Z * matrix[7],
          this.X * matrix[2] + this.Y * matrix[5] + this.Z * matrix[8]
        );
      }
    }

    // 아핀 변환 행렬 생성 함수
    function createAffineMatrix(hwScaleMatrix, hwRotationMatrix, hwTranslateMatrix) {
      const cos = Math.cos(hwRotationMatrix);
      const sin = Math.sin(hwRotationMatrix);

      return [
        scale * cos, -scale * sin, hwScaleMatrix.X,
        scale * sin, scale * cos, hwScaleMatrix.Y,
        0, 0, 1
      ];
    }

    // 하트를 아핀 변환 행렬로 변환하여 그리는 함수
    function drawTransformedHeart(matrix) {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "red";
      ctx.beginPath();

      for (var t = 0; t <= Math.PI * 2; t += 0.01) {
        var x = 16 * Math.pow(Math.sin(t), 3);
        var y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        var heartPoint = new Vector3(x, y, 1.0);
        var transformedPoint = heartPoint.multiply(matrix);

        ctx.lineTo(width / 2 + transformedPoint.X * scale, height / 2 + transformedPoint.Y * scale);
      }

      ctx.stroke();
      ctx.closePath();
    }

    document.getElementById("draw").addEventListener("click", function() {
      const currentScale = 1;
      const currentDegree = 0;
      const currentPosition = new Vector3(10, 50, 1);
  
      const affineMatrix = createAffineMatrix(currentScale, currentDegree, currentPosition);
      drawTransformedHeart(affineMatrix);
    });

    document.getElementById("reset").addEventListener("click", function() {
      const currentScale = 1;
      const currentDegree = 0;
      const currentPosition = new Vector3(10, 50, 1);
  
      const affineMatrix = createAffineMatrix(currentScale, currentDegree, currentPosition);
      drawTransformedHeart(affineMatrix);
    });