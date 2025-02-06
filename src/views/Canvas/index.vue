<template>
  <div>
    <canvas id="myCanvas" width="400" height="300"></canvas>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const canvas = document.getElementById("myCanvas");

      const ctx = canvas.getContext("2d");

      let x = 200;

      let y = 200;
      ctx.beginPath();
      ctx.moveTo(10, 130); //线条起始点移动到10，130
      ctx.lineTo(130, 130); //绘制线条终点130，130
      ctx.lineWidth = 1;
      ctx.strokeStyle = "green"; //描边颜色
      ctx.closePath(); //closePath 会把起点和终点连成一条线
      ctx.stroke();

      const a = ctx.save();
      console.log("aaa", a);
    },
  },
};
</script>

<style lang="scss" scoped></style>
