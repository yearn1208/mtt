<template>
  <div class="contanier">
    <div class="canvas-wrap">
      <div id="drawCanvas"></div>
      <div id="imgCanvas"></div>
    </div>
    <div id="saveCanvas"></div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      wrapWidth: "",
      wrapHeight: "",
      imgCanvas: null,
      imgCtx: "",
      drawCanvas: null,
      drawCtx: "",
      saveCanvas: null,
      saveCtx: "",
      ratio: "",
      canvasHeight:'',
      canvasWidth:''
    };
  },
  methods: {
    initImgCanvas() {
      // 计算宽高比
      let ww = this.wrapWidth; // 画布宽度
      let wh = this.wrapHeight; // 画布高度
      let iw = this.imgWidth; // 图片宽度
      let ih = this.imgHeight; // 图片高度

      if (iw / ih < ww / wh) {
        // 以高为主
        this.ratio = ih / wh;
        this.canvasHeight = wh;
        this.canvasWidth = (wh * iw) / ih;
      } else {
        // 以宽为主
        this.ratio = iw / ww;
        this.canvasWidth = ww;
        this.canvasHeight = (ww * ih) / iw;
      }

      // 初始化画布大小
      this.imgCanvas.width = this.canvasWidth;
      this.imgCanvas.height = this.canvasHeight;
      this.drawCanvas.width = this.canvasWidth;
      this.drawCanvas.height = this.canvasHeight;
      this.saveCanvas.width = this.canvasWidth;
      this.saveCanvas.height = this.canvasHeight;

      // 图片加载绘制
      let img = document.createElement("img");
      img.src = this.imgUrl;
      img.onload = () => {
        console.log("图片已加载");
        this.imgCtx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
        this.renderDatas(); // 渲染原有数据
      };
    },
    startDraw() {
      // 绘制区域
      if (this.isDrawing) return;
      this.isDrawing = true;
      // 绘制逻辑
      this.drawCanvas.addEventListener("click", this.drawImageClickFn);
      this.drawCanvas.addEventListener("dblclick", this.drawImageDblClickFn);
      this.drawCanvas.addEventListener("mousemove", this.drawImageMoveFn);
    },

    drawImageClickFn(e) {
      let drawCtx = this.drawCtx;
      if (e.offsetX || e.layerX) {
        let pointX = e.offsetX == undefined ? e.layerX : e.offsetX;
        let pointY = e.offsetY == undefined ? e.layerY : e.offsetY;
        let lastPoint = this.drawingPoints[this.drawingPoints.length - 1] || [];
        if (lastPoint[0] !== pointX || lastPoint[1] !== pointY) {
          this.drawingPoints.push([pointX, pointY]);
        }
      }
    },

    drawImageMoveFn(e) {
      let drawCtx = this.drawCtx;
      if (e.offsetX || e.layerX) {
        let pointX = e.offsetX == undefined ? e.layerX : e.offsetX;
        let pointY = e.offsetY == undefined ? e.layerY : e.offsetY;
        // 绘制
        drawCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        // 绘制点
        drawCtx.fillStyle = "blue";
        this.drawingPoints.forEach((item, i) => {
          drawCtx.beginPath();
          drawCtx.arc(...item, 6, 0, 180);
          drawCtx.fill(); //填充
        });

        // 绘制动态区域
        drawCtx.save();
        drawCtx.beginPath();
        this.drawingPoints.forEach((item, i) => {
          drawCtx.lineTo(...item);
        });
        drawCtx.lineTo(pointX, pointY);
        drawCtx.lineWidth = "3";
        drawCtx.strokeStyle = "blue";
        drawCtx.fillStyle = "rgba(255, 0, 0, 0.3)";
        drawCtx.stroke();
        drawCtx.fill(); //填充
        drawCtx.restore();
      }
    },

    drawImageDblClickFn(e) {
      let drawCtx = this.drawCtx;
      let saveCtx = this.saveCtx;
      if (e.offsetX || e.layerX) {
        let pointX = e.offsetX == undefined ? e.layerX : e.offsetX;
        let pointY = e.offsetY == undefined ? e.layerY : e.offsetY;
        let lastPoint = this.drawingPoints[this.drawingPoints.length - 1] || [];
        if (lastPoint[0] !== pointX || lastPoint[1] !== pointY) {
          this.drawingPoints.push([pointX, pointY]);
        }
      }
      // 清空绘制图层
      drawCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      // 绘制区域至保存图层
      this.drawSaveArea(this.drawingPoints);

      this.drawedPoints.push(this.drawingPoints);
      this.drawingPoints = [];
      this.isDrawing = false;

      // 绘制结束逻辑
      this.drawCanvas.removeEventListener("click", this.drawImageClickFn);
      this.drawCanvas.removeEventListener("dblclick", this.drawImageDblClickFn);
      this.drawCanvas.removeEventListener("mousemove", this.drawImageMoveFn);
    },
    drawSaveArea(points) {
      if (points.length === 0) return;
      this.saveCtx.save();
      this.saveCtx.beginPath();
      points.forEach((item, i) => {
        this.saveCtx.lineTo(...item);
      });
      this.saveCtx.closePath();
      this.saveCtx.lineWidth = "2";
      this.saveCtx.fillStyle = "rgba(255,0, 255, 0.3)";
      this.saveCtx.strokeStyle = "red";
      this.saveCtx.stroke();
      this.saveCtx.fill();
      this.saveCtx.restore();
    },

    savePoints() {
      // 将画布坐标数据转换成提交数据
      let objectPoints = [];
      objectPoints = this.drawedPoints.map((area) => {
        let polygon = {};
        area.forEach((point, i) => {
          polygon[`x${i + 1}`] = Math.round(point[0] * this.ratio);
          polygon[`y${i + 1}`] = Math.round(point[1] * this.ratio);
        });
        return {
          polygon: polygon,
        };
      });
      this.submitData = objectPoints;
      console.log("最终提交数据", objectPoints);
    },
    renderDatas() {
      // 将提交数据数据转换成画布坐标
      this.drawedPoints = this.submitData.map((item) => {
        let polygon = item.polygon;
        let points = [];
        for (let i = 1; i < Object.keys(polygon).length / 2 + 1; i++) {
          if (!isNaN(polygon[`x${i}`]) && !isNaN(polygon[`y${i}`])) {
            points.push([
              polygon[`x${i}`] / this.ratio,
              polygon[`y${i}`] / this.ratio,
            ]);
          }
        }
        this.drawSaveArea(points);
        return points;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.contanier {
  width: 100%;
//   .canvas-wrap {
//     width: 100%;
//     height: 100vh;
//     background-image: url("@/assets/canvas/canvasImg.webp");
//     background-size: cover;
//     position: relative;
//     #drawCanvas {
//       position: absolute;
//       height: 100%;
//       width: 100%;
//     }
//   }
  #drawCanvas {
    width: 100%;
    height: 100vh;
    background-image: url("@/assets/canvas/canvasImg.webp");
    background-size: cover;
  }
}
</style>
