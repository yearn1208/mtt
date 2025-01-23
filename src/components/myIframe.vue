<template>
  <div id="app">
    <el-statistic
              @finish="hilarity"
              :value="deadline3"
               format="HH:mm:ss"
              time-indices
            >
            <template slot="prefix">
                抢购即将开始:
              </template>
            </el-statistic>
    <!-- <iframe
      id="myIframe"
      src="http://localhost:8082/#/brand/userEquipment"
      frameborder="1"
      width="1900"
      height="600"
    ></iframe> -->
    <!-- <echart-demo></echart-demo> -->
    <!-- <el-button @click="sendMsg">哈罗</el-button> -->
    <!-- <my-iframe></my-iframe> -->
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :before-upload="beforeRemove"
      multiple
      :limit="10"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>

    <el-input
      id="uploadFile"
      type="file"
      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.webp,.xls,.xlsx"
      @input="change"
    />
  </div>
</template>

<script>
// import EchartDemo from "./components/echartDemo";
// // import MyBaberrage from "./views/MyBaberrage";
function calculateFileMd5(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // 当文件被成功读取时调用onload事件
    reader.onload = function (event) {
      const arrayBufferView = event.target.result;

      // 将ArrayBuffer转换为WordArray对象
      const wordArray = CryptoJS.lib.WordArray.create(arrayBufferView);

      // 计算MD5哈希值
      const md5Hash = CryptoJS.MD5(wordArray).toString();

      resolve(md5Hash);
    };

    // 当发生错误时调用onerror事件
    reader.onerror = function () {
      reject("Failed to read file");
    };

    // 开始读取文件内容
    reader.readAsArrayBuffer(file);
  });
}
function convertToBase64(imageFile) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = function() {
      resolve(fileReader.result);
    };
    fileReader.onerror = function(error) {
      reject(error);
    };
    fileReader.readAsDataURL(imageFile);
  });
}
export default {
  name: "App",
  components: {},
  data() {
    return {
      msg: "",
      url: "",
      deadline3:Date.now()+3000
    };
  },
  methods: {
    hilarity(){
      this.$message.error('时间到了')
    },
    change(e) {
      console.log("ee", e);
    },
    async beforeRemove(file) {
     let imhBase64 =await convertToBase64(file)
     
     console.log('imhBase64',imhBase64);
      return false;
    },
    sendMsg() {
      let myIframe = document.getElementById("myIframe");
      if (myIframe) {
        let data = {
          msg: "hello1111",
        };
        myIframe.contentWindow.postMessage(
          data,
          `http://localhost:8082/#/brand/userEquipment`
        );
      }
    },
    mounted() {
      // let myIframe=this.$refs.myIframe
      // if (myIframe.attachEvent){  //兼容浏览器判断
      //             myIframe.attachEvent("onload", function(){
      //                 let iframeWin = myIframe.contentWindow
      //                 iframeWin.postMessage('hahhah','http://localhost:8080/#/brand/userEquipment')
      //           //data传递的参数   *写成子页面的域名或者是ip
      //             })
      //         } else {
      //             myIframe.onload = function(){
      //                 let iframeWin = myIframe.contentWindow
      //                 iframeWin.postMessage('hahha','http://localhost:8080/#/brand/userEquipment')
      //             }
      //         }
      // console.log(111);
      //    window.addEventListener('langg', (e)=>{
      //        let send = document.getElementById('myIframe').contentWindow
      //         send.postMessage(this.msg)
      //         e.data='hahha'
      //    })
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
