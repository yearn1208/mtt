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

      let x = 50;

      let y = 50;

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();

        ctx.arc(x, y, 20, 0, 2 * Math.PI);

        ctx.fillStyle = "#ace";

        ctx.fill();

        x += 5;

        if (x > canvas.width) {
          x = 0;
        }

        requestAnimationFrame(draw);
      }

      draw();
    },
  },
};
</script>

<style lang="scss" scoped></style>
