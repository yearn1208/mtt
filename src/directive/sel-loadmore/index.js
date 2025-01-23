import loadmore from './loadmore'
const install  =  function(Vue){
    Vue.directive("loadmore",loadmore)
}
if (window.Vue) {
    window['loadmore'] = loadmore
    Vue.use(install)
}
loadmore.install = loadmore // 用来全局引用
export default loadmore // 用来局部引用
