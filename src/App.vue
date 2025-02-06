<template>
  <div id="app">
    <div class="app-link">
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
      <router-link :to="{ name: 'Svg' }" tag="button">Svg</router-link>
      <router-link :to="{ name: 'Scroll' }" tag="button">Scroll</router-link>
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
  .app-link {
    position: -webkit-sticky;
    position: sticky;
    top: 10px;
    background-color: rgb(243, 240, 240);
    z-index: 9999999999;
    padding: 10px;
    button{
      border-style: none;
      margin-right: 10px;
      background-color: rgb(211, 209, 209);
      min-height: 40px;
      border-radius: 10px;
      &:hover{
        background-color: #ace;
        cursor: pointer;
        transform: scale(1.2);
        transition: 0.4s;
      }
    }
  }
  .app-container {
    margin: 10px;
    border: 1px #ccc solid;
    padding: 20px;
    height: 100vh;
    width: 100vw;
  }
}
</style>
