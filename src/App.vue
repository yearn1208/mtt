<template>
  <div id="app">
    <div class="app-link">
      <el-button @click="go">goooo</el-button>
      <!-- <button @click="goSignaturePad">签名</button> -->
      <router-link :to="{ name: '签名' }" tag="button"
        >SignaturePad</router-link
      >
      <router-link :to="{ name: '弹幕' }" tag="button">Baberrage</router-link>
      <router-link :to="{ name: 'jodit' }" tag="button">jodit</router-link>
      <router-link :to="{ name: '表格多行多列' }" tag="button"
        >MultipleTable</router-link
      >
      <router-link :to="{ name: '虚拟列表' }" tag="button"
        >VirtualList</router-link
      >
      <router-link :to="{ name: '普通' }" tag="button">Common</router-link>
      <router-link :to="{ name: '解析EXCEL' }" tag="button">Excel</router-link>
      <router-link :to="{ name: 'chat' }" tag="button">chat</router-link>
      <router-link :to="{ name: '语音' }" tag="button">audioRecord</router-link>
      <router-link :to="{ name: '地图' }" tag="button">MyMap</router-link>
      <router-link :to="{ name: 'Canvas' }" tag="button">Canvas</router-link>
    </div>
    <div class="app-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    // MyIframe,
    // SignaturePad
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    go() {
      this.$router.push({
        name: "jodit",
        query: {
          a: 1,
          b: 2,
        },
      });
    },
    goSignaturePad() {
      this.$router.push({
        name: "签名",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 10px;
  .app-container {
    border: 1px #ccc solid;
    padding: 20px;
    height: 100vh;
    width: 100vw;
  }
}
</style>
