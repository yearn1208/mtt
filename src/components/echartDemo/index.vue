<template>
  <div>
    <div ref="echart"></div>
  </div>
</template>

<script>
import world from "./world.json";
// import china from "./china.json";
export default {
  name: "",
  data() {
    let geoCoordMap = [
      { name: "芬兰", value: [24.909912, 60.169095], symbolSize: 8, data: 111 },
      { name: "德国", value: [13.402393, 52.518569], symbolSize: 8 },
      { name: "英国", value: [-0.126608, 51.208425], symbolSize: 8 },
      { name: "韩国", value: [126.979208, 37.53875], symbolSize: 8 },
      { name: "日本", value: [139.710164, 35.706962], symbolSize: 8 },
      { name: "中国", value: [116.512885, 39.847469], symbolSize: 8 },
    ];
    let arr = ["China", "Japan"];
    return {
      Echart: "",
      chartOption: {
        // 进行相关配置
        // backgroundColor: "#02AFDB",
        tooltip: {
          show: true,
        }, // 鼠标移到图里面的浮动提示框
        geo: {
          // 这个是重点配置区
          map: "world", // 表示中国地图
          roam: false,
          regions: [
            //这个地方是关键,通过设置regions,可以实现不同的省份边界线配置不同的颜色,
            {
              name: "China", //这个名字要和china.js保持一致
              itemStyle: {
                normal: {
                  areaColor: "#FD9A9A", // 背景颜色
                  // color: "#FD9A9A",
                  // borderWidth: 5, // 边框宽度
                  // shadowBlur: 20, // 阴影泛化程度
                  // shadowOffsetX: 4, //阴影水平方向上的偏移距离
                  // shadowOffsetY: 10, //阴影垂直方向上的偏移距离
                },
              },
            },
          ],
        },
        visualMap: {
          type: "piecewise",
          pieces: [
            { min: 1500 }, // 不指定 max，表示 max 为无限大（Infinity）。
            { min: 900, max: 1500 },
            { min: 310, max: 1000 },
            { min: 200, max: 300 },
            { min: 10, max: 200, label: "10 到 200（自定义label）" },
            { value: 123, label: "123（自定义特殊颜色）", color: "grey" }, // 表示 value 等于 123 的情况。
            { max: 5 }, // 不指定 min，表示 min 为无限大（-Infinity）。
          ],
          // min: 0,
          // max: 10000,
          // text: ["High", "Low"],
          // realtime: false,
          // calculable: true,
          // inRange: {
          //   color: ["lightskyblue", "yellow", "red"],
          // },
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo",
            roam: false,
            tooltip: {
              show: false,
              formatter: "{b}:{c}",
            },
            // zlevel:10,
            label: {
              show: true,
              position: "right",
              formatter: "{b}",
              color: "#000",
              fontWeight: "bold",
              fontSize: "16px",
            },
            itemStyle: {
              color: "red",
            },
            data: geoCoordMap,
          },

          {
            type: "map",
            map: "world",
            roam: false,
            tooltip: {
              show: true,
              // valueFormatter: (value) => value?value:0,
              formatter: function (params) {
                if (params.value) {
                  return params.name + "活跃用户数：" + params.value;
                } else {
                  return params.name + "活跃用户数：" + "0";
                }
              },
            },

            itemStyle: {
              opacity: 0.3,
            },
            label: {
              show: false,
              // formatter: function (params) {
              //   if (params.value) {
              //     return params.name;
              //   } else {
              //     return "";
              //   }
              // },
            },
            data: [
              { name: "China", value: 2000 },
              { name: "Japan", value: 2000 },
              { name: "Germany", value: 5000 },
              { name: "Finland", value: 9000 },
            ],
            colorBy: "data",
            nameMap: {
              // China: "中国",
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.init();
    console.log(world);
  },
  methods: {
    init() {
      this.$echarts.registerMap("world", world);
      this.Echart = this.$echarts.init(this.$refs.echart, null, {
        height: "800px",
      });
      this.Echart.setOption(this.chartOption);
      this.Echart.on("click", function (e) {
        console.log(e);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
