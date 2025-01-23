<template>
  <div id="app">
    <div>
      <div>
        <h3>签名</h3>
      </div>
      <div class="signature-pad">
        <vue-signature-pad
          id="signature"
          width="95%"
          height="400px"
          ref="signaturePad"
          :options="options"
        />
      </div>
    </div>

    <button @click="save">保存</button>
    <button @click="resume">重置</button>
    <button @click="go">测试router.push</button>
  </div>
</template>
<script>
function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime,
  });
}

/**
 * Base64字符串转二进制流
 * @param {String} dataurl Base64字符串(字符串包含Data URI scheme，例如：data:image/png;base64, )
 */
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
}
/**
 * 下载文件
 * @param {*} fileName
 * @param {*} blob
 */
export const downloadFile = (fileName, blob) => {
  // 非IE下载
  if ("download" in document.createElement("a")) {
    const elink = document.createElement("a");
    elink.download = fileName;
    elink.style.display = "none";
    elink.href = window.URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    // 释放URL 对象
    window.URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName);
  }
};
export default {
  name: "App",
  data() {
    return {
      options: {
        penColor: "red",
        minWidth: 3,
      },
    };
  },
  components: {},
  methods: {
    save() {
      const data = this.$refs.signaturePad.saveSignature();
      //   console.log(isEmpty);
      console.log(data);
      let a = dataURLtoBlob(data.data);
      downloadFile("图片", a);
    },

    //清除重置
    resume() {
      this.$refs.signaturePad.clearSignature();
    },
    go(){
      let a  = this.$router.push({name:'弹幕'})
      console.log('----',a);
    }
  },
  mounted() {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        // 按下ESC键的键码是27
        event.preventDefault();
        // 在这里可以添加你的自定义处理逻辑
        console.log(1111);
        alert(11);
      }
    });
  },
};
</script>
<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
}
.signature-pad {
  background-color: #fff;
  border: 1px #ccc solid;
  margin: 0 10vw;
}
</style>
