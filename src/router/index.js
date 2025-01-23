import VueRouter from "vue-router";
// import signaturePad from '@/views/signaturePad'
const Router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      name: "签名",
      path: "/signaturePad",
      component: () => import("@/views/signaturePad"),
    },
    {
      name: "弹幕",
      path: "/MyBaberrage",
      component: () => import("@/views/MyBaberrage"),
    },
    {
      name: "jodit",
      path: "/jodit",
      component: () => import("@/views/Jodit"),
    },
    {
      name: "表格多行多列",
      path: "/multipleTable",
      component: () => import("@/views/MultipleTable"),
    },
    {
      name: "虚拟列表",
      path: "/virtual",
      component: () => import("@/views/VirtualList"),
    },
    {
      name: "普通",
      path: "/common",
      component: () => import("@/views/Common"),
    },
    {
      name: "解析EXCEL",
      path: "/excel",
      component: () => import("@/views/Excel"),
    },
    {
      name: "chat",
      path: "/chat",
      component: () => import("@/views/chat"),
    },
    {
      name: "语音",
      path: "/audioRecord",
      component: () => import("@/views/audioRecord"),
    },
    {
      name: "地图",
      path: "/myMap",
      component: () => import("@/views/myMap"),
    },
    {
      name: "Canvas",
      path: "/Canvas",
      component: () => import("@/views/Canvas"),
    },
  ],
});

export default Router;
