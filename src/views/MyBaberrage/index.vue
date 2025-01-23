<template>
  <div class="barrage-container">
    <div v-for="(barrage, index) in barrageList" :key="index" class="barrage-item" :style="{ top: barrage.top + 'px' }">{{ barrage.text }}</div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
  return {
    barrageList: [
      { text: '弹幕1', top: 0 },
      { text: '弹幕2', top: 30 },
      { text: '弹幕3', top: 60 },
      { text: '弹幕4', top: 90 },
      { text: '弹幕5', top: 120 },
      { text: '弹幕6', top: 150 },
      { text: '弹幕7', top: 180 },
      { text: '...', top: 210 },
      // ...其他弹幕内容和初始位置
    ],
  };
},
mounted() {
  setInterval(() => {
    this.barrageList.forEach(barrage => {
      barrage.top += 1; // 控制弹幕滚动速度，根据实际需求调整
      if (barrage.top > 210) { // 重置弹幕位置，当超出容器高度时
        barrage.top = -30; // 设置为负数，使其重新回到容器顶部
      }
    });
  }, 100); // 控制弹幕滚动帧率，根据实际需求调整
},
  components:{
  }
}
</script>

<style lang="scss" scoped>
  .barrage-container {
  position: relative;
  height: 150px; /* 设置弹幕容器的高度，根据实际需求调整 */
 
  overflow: hidden; /* 设置溢出隐藏，只显示可视区域内的弹幕 */
  // background-color: #ace;
  opacity: 1;
}

.barrage-item {
  position: absolute;
  left: 10px;
  white-space: nowrap; /* 防止弹幕换行 */
  font-size: 16px; /* 弹幕字体大小，根据实际需求调整 */
  color: #FFF; /* 弹幕字体颜色，根据实际需求调整 */
  animation: move-barrage linear infinite; /* 弹幕滚动动画 */
   width:60px;
   height: 18px;
   border-radius: 5px;
   line-height: 18px;
  background-color: #000;
  opacity: .5;
}

@keyframes move-barrage {
  0% {
    transform: translateX(100%); /* 弹幕起始位置在容器右侧 */
  }
  100% {
    transform: translateX(-100%); /* 弹幕结束位置在容器左侧 */
  }
}
</style>
