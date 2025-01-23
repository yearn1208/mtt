export default {
  bind(el, binding, vnode) {
    // // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector(
      ".el-select-dropdown .el-select-dropdown__wrap"
    );
    const handler = function () {
      const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
      if (condition) {
        //校验滚动到最后的数据类型，如果传了相关指令的函数，将进项相关函数调用，没有则不进行调用
        if (typeof binding.value === "function") {
          // SELECTWRAP_DOM.append(loadingDom)
          binding.value();
        } else {
        }
      }
    };
    SELECTWRAP_DOM.addEventListener("scroll", handler);
    // 把监听的句柄挂载到元素身上便于解绑时使用
    el._hanlde = handler;
  },
  unbind(el, binding, vnode) {
    console.log("解绑了",el);
    // 在解绑时执行
    const SELECTWRAP_DOM = el.querySelector(
      ".el-select-dropdown .el-select-dropdown__wrap"
    );
    console.log(SELECTWRAP_DOM);
    if(binding.value){

    }
    // SELECTWRAP_DOM?.removeEventListener("scroll", el._handler);
    // 清空
    // delete el._hanlder;
    // console.log(window.getEventListeners(el));
  },
};
