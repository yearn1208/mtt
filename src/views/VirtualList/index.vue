<template>
  <div>
    <div id="wrapper">
      <div id="content" ref="content">
        <div id="content-item" v-for="i in tableData" :key="i.id">
          {{ i.name }}
        </div>
      </div>
    </div>
    <el-button @click="goBottom">底部</el-button>
    <el-button @click="goTop">顶部</el-button>
    <!-- <recycle-scroller
      class="virtual-list"
      :buffer="20"
      :prerender="200"
      style="height: 400px"
      :item-size="24"
      key-field="id"
      :items="tableData"
      @scroll-end="loadMore"
    >
      <template v-slot="{ item, index }">
  
        <div class="list-item" :key="item.id">
          <span>{{ item.id }}</span>
          <span>{{ item.name }}</span>
            {{item.id}}
        </div>
      </template>
    </recycle-scroller> -->
    <br />
    <br />
    <br />
    <br />
    <br />
    <!-- <el-select
      ref="selectRef"
      @visible-change="changeSlect"
      v-model="v"
      v-loadmore="getMore"
      filterable
    >
      <el-option
        v-for="(item, index) in optionList"
        :key="index"
        :value="item.value"
        :label="item.value+'----'+item.label"
      ></el-option>
    </el-select> -->
  </div>
</template>

<script>
import { RecycleScroller } from "vue-virtual-scroller"; // 引入它
export default {
  name: "VirtualList",
  data() {
    return {
      tableData: [],
      isFirst: true,
      optionList: [],
      v: "",
      scrollTop: 0,
    };
  },
  components: {
    RecycleScroller,
  },
  mounted() {
    for (let i = 1; i < 31; i++) {
      this.optionList.push({ value: i, label: i + i + 1 });
    }
    for (let i = 1; i < 100; i++) {
      this.tableData.push({ id: i, name: "guy" + Math.random() });
    }
    console.log("000", this.$refs.content.scrollHeight);
    // 滚动容器
    let scrollWrapper = document.getElementById("content");
    scrollWrapper.onscroll = (e) => {
      if (
        this.$refs.content.scrollHeight ==
        scrollWrapper.scrollTop + scrollWrapper.clientHeight
      ) {
        //   //  模拟动态请求数据
        // let leng = this.tableData.length;
        // setTimeout(() => {
        //   for (let i = leng; i < leng + 50; i++) {
        //     this.tableData.push({ id: i + 1, name: "guy" + Math.random() });
        //   }
        // }, 100);
      }
    };
    scrollWrapper.scrollTo({
      behavior: "smooth",
    });
  },
  methods: {
    goBottom() {
      console.log(document.querySelector("#content").offsetHeight);
      //获取中间内容盒子的可见区域高度
      this.scrollTop =
        document.querySelector("#content").scrollHeight -
        document.querySelector("#content").offsetHeight;
      // setTimeout((res) => {
      //   //加个定时器，防止上面高度没获取到，再获取一遍。
      //   if (this.scrollTop != this.$refs.content.offsetHeight) {
      //     this.scrollTop = document.querySelector("#content").offsetHeight;
      //   }
      // }, 100);
      //scrollTop：滚动条距离顶部的距离。
      //回到底部
      // this.$refs.content.scrollTop = this.scrollTop;
      this.$refs.content.scrollTo({
        behavior: "smooth",
        top: this.scrollTop,
      });
    },
    goTop() {
      this.$refs.content.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    },
    loadMore() {
      if (this.isFirst) {
        //   第一次进来不触发请求
        this.isFirst = false;
        return;
      }
      let leng = this.tableData.length;
      setTimeout(() => {
        //  模拟动态请求数据
        for (let i = leng; i < leng + 50; i++) {
          this.tableData.push({ id: i + 1, name: "guy" + Math.random() });
        }
        console.log("后面", this.tableData);
      }, 100);
    },
    getMore() {
      console.log("加载了", this.optionList.length);
      let l = this.optionList.length;
      for (let i = l; i < l + 20; i++) {
        this.optionList.push({ value: i, label: i });
      }
    },
    changeSlect() {},
  },
};
</script>

<style lang="scss" scoped>
#wrapper {
  height: 600px;
  width: 400px;
  border: 1px solid #000;
  // padding: 10px;

  #content {
    height: 100%;
    overflow: auto;

    box-sizing: border-box;
    #content-item {
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
