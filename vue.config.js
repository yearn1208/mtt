const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8089,
    compress: true, //启动devServer的Gzip压缩
  },

  publicPath: "./",
  //打包时输出文件目录
  outputDir: "as",
  // //可写可不写，写的话js,css等文件会存在这个文件夹里面,放置静态文件夹目录
  // assetsDir: "static",
});
