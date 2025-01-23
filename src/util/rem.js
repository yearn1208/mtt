(function(designWidth) {
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    var recalc = function() {
        var size = (window.innerWidth || document.documentElement.clientWidth) / designWidth * 100
        document.documentElement.style.fontSize = size + 'px'
        document.body.style.fontSize = '16px'
    }
    window.addEventListener(resizeEvt, recalc, false) // addEventListener事件方法接受三个参数：第一个是事件名称比如点击事件onclick，第二个是要执行的函数，第三个是布尔值
    document.addEventListener('DOMContentLoaded', recalc, false) // 绑定浏览器缩放与加载时间
    /* 去掉一些默认的行为: click事件  滚动条*/
    document.body.firstElementChild.addEventListener('touchstart', function(e) {
        e.preventDefault()
    })
})(750)
