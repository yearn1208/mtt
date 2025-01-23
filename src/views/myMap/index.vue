<template>
  <div>
    <div class="mapBox">
      <div class="searchBox">
        <el-input
          style="width: 250px"
          placeholder="请输入关键字"
          suffix-icon="el-icon-search"
          @input="searchByKeyword"
          @focus="searchByKeyword"
          size="medium"
          v-model="keyword"
        >
        </el-input>
        <div class="search-result" v-if="searchResult.length && isShowResult">
          <div
            class="result-item"
            v-for="item of searchResult"
            :key="item.id"
            @click="handleClickResult(item)"
          >
            <div class="area-name">{{ item.name }}</div>
            <div class="area-address">{{ item.district + item.address }}</div>
          </div>
        </div>
      </div>
      <div id="container" style="width: 100%; height: 800px"></div>
      <div style="margin-top: 30px">
        <el-form :inline="true" :model="loc">
          <el-form-item label="经度">
            <el-input
              style="width: 300px"
              v-model="loc.longitude"
              placeholder="经度"
            ></el-input>
          </el-form-item>
          <el-form-item label="纬度">
            <el-input
              style="width: 300px"
              v-model="loc.latitude"
              placeholder="纬度"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
window._AMapSecurityConfig = {
  securityJsCode: "ef9aaae77919a8015edd950af786c6b2", //填写你的安全密钥
};
export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
      map: null,
      loc: {
        longitude: "",
        latitude: "",
      },
      marker: null,
      autocomplete: null,
      placeSearch: null, //搜索框
      driving: null,
      keyword: "",
      searchResult: [],
      isShowResult: false,
      clickPoints: [],
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    // 地图初始化
    initMap() {
      AMapLoader.reset();
      AMapLoader.load({
        key: "aeef6b536679e762f2b6a59b56d98ae3", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.AutoComplete",
          "AMap.PlaceSearch",
          "AMap.MarkerClusterer",
          "AMap.DistrictSearch",
          "AMap.ZoomControl",
          "AMap.Polygon",
          "AMap.ToolBar",
          "AMap.Driving",
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            //设置地图容器id
            // viewMode: "3D",    //是否为3D地图模式
            resizeEnable: true,
            zoom: 12, //初始化地图级别
            center: [114.304569, 30.593354], //初始化地图中心点位置
          });

          this.map.on("click", (e) => {
            this.loc.latitude = e.lnglat.lat;
            this.loc.longitude = e.lnglat.lng;
            this.initMarket();
          });
          var autoOptions = {
            input: "tipinput",
          };
          this.autocomplete = new AMap.AutoComplete(autoOptions);
          this.placeSearch = new AMap.PlaceSearch({
            map: this.map,
          });
          this.driving = new AMap.Driving({
            map: this.map,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 点击搜索结果
    handleClickResult(e) {
      const { location, district, address } = e;
      const { lng, lat } = location || {};
      // 1. 如果当前搜索结果有经纬度, 直接在地图上选中, 并返回当前的值
      if (lng && lat) {
        this.map.clearMap(); //先清空点位
        this.changeValue(lng, lat, e.name, district + address);
      } else {
        this.isShowResult = false;
        this.placeSearch.search(district + address);
      }
    },
    // 输入框搜索显示下拉
    searchByKeyword() {
      this.autocomplete.search(this.keyword, (status, result) => {
        if (status === "complete" && result.info === "OK") {
          this.searchResult = result.tips.map((item) => {
            return {
              ...item,
              address: Array.isArray(item.address)
                ? item.address[0] || ""
                : item.address,
            };
          });
          this.isShowResult = true;
        }
      });
    },
    // 点击地图
    initMarket(name) {
      if (!(this.loc.longitude && this.loc.latitude)) {
        return;
      }
      this.isShowResult = false;
      if (this.map.getAllOverlays("marker").length) {
        // 地图已有标注，清除标注
        this.map.clearMap();
      }
      this.marker = new AMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [this.loc.longitude, this.loc.latitude],
        offset: new AMap.Pixel(-10, -26),
        zIndex: 102,
      });
      if (name) {
        let num = name.length * 4;
        marker.value.setLabel({
          offset: new AMap.value.Pixel(-num, 35),
          content: name,
        });
      }
      this.map.add(this.marker);
      if (this.clickPoints.length >= 2) {
        this.clickPoints.shift();
        this.clickPoints.push(this.marker);
      } else {
        this.clickPoints.push(this.marker);
        this.driving.clear();
      }
      this.getDriving();
    },
    getDriving() {
      console.log("=====", this.clickPoints);
      if (this.clickPoints.length > 1) {
        // 设置起点和终点（示例数据）
        const start = new AMap.LngLat(
          this.clickPoints[0]._position[0],
          this.clickPoints[0]._position[1]
        ); // 起点经纬度
        const end = new AMap.LngLat(
          this.clickPoints[1]._position[0],
          this.clickPoints[1]._position[1]
        ); // 终点经纬度
        this.driving.search(start, end, (status, result) => {
          if (status === "complete") {
            console.log("驾驶路线规划成功:", result);
          } else {
            console.error("驾驶路线规划失败:", result);
          }
        });
      } else {
        this.driving.clear();
      }
    },
    changeValue(longitude, latitude, name, address) {
      this.isShowResult = false;
      this.loc.longitude = longitude;
      this.loc.latitude = latitude;
      const center = new AMap.LngLat(longitude, latitude);
      // 将地图的中心点移动到指定的经纬度
      this.map.setCenter(center);
      this.marker = new AMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [this.loc.longitude, this.loc.latitude],
        zIndex: 103,
      });
      this.map.add(this.marker);
    },
  },
};
</script>
<style scoped lang="scss">
.mapBox {
  position: relative;
  .searchBox {
    position: absolute;
    z-index: 111;
    top: 10px;
    left: 10px;
  }
}
.search-result {
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  .result-item {
    width: 100%;
    cursor: pointer;
    border-bottom: 2px solid #eee;
    padding: 10px 12px;
    .area-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 20px;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      line-height: 20px;
    }
    .area-address {
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
      line-height: 18px;
    }
  }
}
</style>
