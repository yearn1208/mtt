import { validatenull } from './validate'
import { getSysDic } from '@/api/product/product'

// 表单序列化
export const serialize = data => {
    const list = []
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`)
    })
    return list.join('&')
}
export const getObjType = obj => {
    var toString = Object.prototype.toString
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    if (obj instanceof Element) {
        return 'element'
    }
    return map[toString.call(obj)]
}
/**
 * 对象深拷贝
 */
export const deepClone = data => {
    var type = getObjType(data)
    var obj
    if (type === 'array') {
        obj = []
    } else if (type === 'object') {
        obj = {}
    } else {
        // 不再具有下一层次
        return data
    }
    if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]))
        }
    } else if (type === 'object') {
        for (var key in data) {
            obj[key] = deepClone(data[key])
        }
    }
    return obj
}
/**
 * 设置灰度模式
 */
export const toggleGrayMode = status => {
    if (status) {
        document.body.className = document.body.className + ' grayMode'
    } else {
        document.body.className = document.body.className.replace(' grayMode', '')
    }
}
/**
 * 设置主题
 */
export const setTheme = name => {
    document.body.className = name
}

/**
 * 加密处理
 */
export const encryption = params => {
    let { data, type, param, key } = params
    const result = JSON.parse(JSON.stringify(data))
    key = CryptoJS.enc.Latin1.parse(key)
    if (type === 'Base64') {
        param.forEach(ele => {
            result[ele] = btoa(result[ele])
        })
    } else {
        param.forEach(ele => {
            var data = result[ele]

            var iv = key
            // 加密
            var encrypted = CryptoJS.AES.encrypt(data, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.ZeroPadding
            })
            result[ele] = encrypted.toString()
        })
    }
    return result
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
    if (fullscreenEnable()) {
        exitFullScreen()
    } else {
        reqFullScreen()
    }
}
/**
 * esc监听全屏
 */
export const listenfullscreen = callback => {
    function listen() {
        callback()
    }

    document.addEventListener('fullscreenchange', function () {
        listen()
    })
    document.addEventListener('mozfullscreenchange', function () {
        listen()
    })
    document.addEventListener('webkitfullscreenchange', function () {
        listen()
    })
    document.addEventListener('msfullscreenchange', function () {
        listen()
    })
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
    var isFullscreen = document.fullscreenEnabled || window.fullScreen || document.mozFullscreenEnabled || document.webkitIsFullScreen
    return isFullscreen
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen()
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen()
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
    }
}
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.exitFullScreen()
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.webkitCancelFullScreen()
    } else if (document.documentElement.mozRequestFullScreen) {
        document.mozCancelFullScreen()
    }
}
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].children.length !== 0) {
            for (let j = 0; j < menu[i].children.length; j++) {
                if (menu[i].children[j].id === id) {
                    return menu[i]
                } else {
                    if (menu[i].children[j].children.length !== 0) {
                        return findParent(menu[i].children[j].children, id)
                    }
                }
            }
        } else {
            if (menu[i].id === id) {
                return menu[i]
            }
        }
    }
}
/**
 * 判断2个对象属性和值是否相等
 */

/**
 * 动态插入css
 */

export const loadStyle = url => {
    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = url
    const head = document.getElementsByTagName('head')[0]
    head.appendChild(link)
}
/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
    delete obj1.close
    var o1 = obj1 instanceof Object
    var o2 = obj2 instanceof Object
    if (!o1 || !o2) {
        /*  判断不是对象  */
        return obj1 === obj2
    }

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false
        // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    }

    for (var attr in obj1) {
        var t1 = obj1[attr] instanceof Object
        var t2 = obj2[attr] instanceof Object
        if (t1 && t2) {
            return diff(obj1[attr], obj2[attr])
        } else if (obj1[attr] !== obj2[attr]) {
            return false
        }
    }
    return true
}
export const diffRouter = (obj1, obj2) => {
    delete obj1.close
    if (obj1.name == obj2.name) {
        return true
    }
    return false
}
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
    let result = ''
    if (validatenull(dic)) return value
    if (typeof value == 'string' || typeof value == 'number' || typeof value == 'boolean') {
        let index = 0
        index = findArray(dic, value)
        if (index != -1) {
            result = dic[index].label
        } else {
            result = value
        }
    } else if (value instanceof Array) {
        result = []
        let index = 0
        value.forEach(ele => {
            index = findArray(dic, ele)
            if (index != -1) {
                result.push(dic[index].label)
            } else {
                result.push(value)
            }
        })
        result = result.toString()
    }
    return result
}
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
    for (let i = 0; i < dic.length; i++) {
        if (dic[i].value == value) {
            return i
        }
    }
    return -1
}
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
    let random = ''
    random = Math.ceil(Math.random() * 100000000000000)
        .toString()
        .substr(0, len || 4)
    if (date) random = random + Date.now()
    return random
}
/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
    // Fixes dual-screen position                            Most browsers       Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

    const left = width / 2 - w / 2 + dualScreenLeft
    const top = height / 2 - h / 2 + dualScreenTop
    const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus()
    }
}

// 获取浏览器默认语言
export const getBrowserLang = function () {
    const browserLang = navigator.language ? navigator.language : navigator.browserLanguage
    let defaultBrowserLang = ''
    if (browserLang.toLowerCase() === 'cn' || browserLang.toLowerCase() === 'zh' || browserLang.toLowerCase() === 'zh-cn') {
        defaultBrowserLang = 'zh-CN'
    } else {
        defaultBrowserLang = 'en-US'
    }
    return defaultBrowserLang
}

// 设置localStorage
export const setStorage = function (key, obj) {
    const json = JSON.stringify(obj)
    window.localStorage.setItem(key, json)
}

// 获取localStorage
export const getStorage = function (key) {
    const str = window.localStorage.getItem(key)
    if (!str) {
        return null
    }
    return JSON.parse(str)
}

// 移除localStorage
export const removeStorage = function (key) {
    window.localStorage.removeItem(key)
}

/**
 * 下载文件
 * @param {*} fileName
 * @param {*} blob
 */
export const downloadFile = (fileName, blob) => {
    // 非IE下载
    if ('download' in document.createElement('a')) {
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = window.URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        // 释放URL 对象
        window.URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
    } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName)
    }
}
/**
 * @name  getTableData
 * @desc  纯JS前端分页方法
 * @param  {Number} page 当前页码，默认1
 * @param  {Number} pageSize 每页最多显示条数，默认10
 * @param  {Array} totalData 总的数据集，默认为空数组
 * @return {Object} {
     data, //当前页展示数据，数组
     page, //当前页码
     pageSize, //每页最多显示条数
     length, //总的数据条数
   }
 **/
export const getTableData = (page = 1, pageSize = 10, totalData = []) => {
    const { length } = totalData
    const tableData = {
        data: [],
        page,
        pageSize,
        length
    }
    if (pageSize >= length) {
        // pageSize大于等于总数据长度，说明只有1页数据或没有数据
        tableData.data = totalData
        tableData.page = 1 // 直接取第一页
    } else {
        // pageSize小于总数据长度，数据多余1页
        const num = pageSize * (page - 1) // 计算当前页（不含）之前的所有数据总条数
        if (num < length) {
            // 如果当前页之前所有数据总条数小于（不能等于）总的数据集长度，则说明当前页码没有超出最大页码
            const startIndex = num // 当前页第一条数据在总数据集中的索引
            const endIndex = num + pageSize - 1 // 当前页最后一条数据索引
            tableData.data = totalData.filter((_, index) => index >= startIndex && index <= endIndex) // 当前页数据条数小于每页最大条数时，也按最大条数范围筛取数据
        } else {
            // 当前页码超出最大页码，则计算实际最后一页的page，自动返回最后一页数据
            const size = parseInt(length / pageSize) // 取商
            const rest = length % pageSize // 取余数
            if (rest > 0) {
                // 余数大于0，说明实际最后一页数据不足pageSize，应该取size+1为最后一条的页码
                tableData.page = size + 1 // 当前页码重置，取size+1
                tableData.data = totalData.filter((_, index) => index >= pageSize * size && index <= length)
            } else if (rest === 0) {
                // 余数等于0，最后一页数据条数正好是pageSize
                tableData.page = size // 当前页码重置，取size
                tableData.data = totalData.filter((_, index) => index >= pageSize * (size - 1) && index <= length)
            } // 注：余数不可能小于0
        }
    }
    console.log(tableData, 'tableData')
    return tableData
}

/**
 * 处理导出excel文件
 */
export const handleExportData = (resData, vm, excelName, msg = '导出成功', type = 'success') => {
    const blob = new Blob([resData.data])
    let fileName = resData.headers['content-disposition']?.split('=')[1]
    fileName = excelName || decodeURI(fileName)
    const linkNode = document.createElement('a')
    linkNode.download = fileName // a标签的download属性规定下载文件的名称
    linkNode.style.display = 'none'
    linkNode.href = URL.createObjectURL(blob) // 生成一个Blob URL
    document.body.appendChild(linkNode)
    linkNode.click() // 模拟在按钮上的一次鼠标单击
    URL.revokeObjectURL(linkNode.href) // 释放URL 对象
    vm.$message({
        message: msg,
        type
    })
}
// 下载模板
export const handleDownloadByUrl = (url) => {
    const name = url.split(url.indexOf('/'))[1]
    const fileName = name.split('.')[0]
    const eleLink = document.createElement('a')
    eleLink.download = fileName
    eleLink.style.display = 'none'
    eleLink.href = url
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
    URL.revokeObjectURL(eleLink.href)
}
export const handleDownloadZip = (url) => {
    const eleLink = document.createElement('a')
    eleLink.style.display = 'none'
    eleLink.href = url
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
    URL.revokeObjectURL(eleLink.href)
}

/**
 * 复制文本
 */
export const copyText = (value, vm) => {
    if (!value) return
    const oInput = document.createElement('input')
    oInput.value = value
    document.body.appendChild(oInput)
    oInput.select() // 选择对象
    document.execCommand('Copy') // 执行浏览器复制命令
    vm.$message({
        message: `已成功复制--${value}`,
        type: 'success'
    })
    oInput.remove()
}

// 获取体系数据源
export const getSysDic66 = () => {
    return new Promise((resolve, reject) => {
        getSysDic(66)
            .then(({ data: resData }) => {
                if (resData.code === 200) {
                    resolve(resData.data)
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 获取文件类型
 * @param  {String} name 文件名称
 */

export const getFileType = name => {
    const index1 = name.lastIndexOf('.')
    const index2 = name.length
    return name.substring(index1, index2)
}
/**
 * encode文件地址后的文件名称
 * @param  {String} url 文件oss地址
 */
export const encodeFileNameByUrl = url => {
    const index = url.lastIndexOf('/')
    const ossUrl = url.substring(0, index + 1)
    const fileName = url.substring(index + 1, url.length)
    const fileUrl = ossUrl + encodeURIComponent(fileName)
    return fileUrl
}

// 处理合并数据
export const handleMergeData = (valueKey, data) => {
    let pos = 0
    const spanArr = []
    data.forEach((item, i) => {
        if (i === 0) {
            spanArr.push(1)
            pos = 0
        } else {
            // 判断当前元素与上一个元素是否相同,因合并第一个所以[0]
            if (data[i][valueKey] === data[i - 1][valueKey]) {
                spanArr[pos] += 1
                spanArr.push(0)
            } else {
                spanArr.push(1)
                pos = i
            }
        }
    })
    return spanArr
}

//下载问题反馈zip
import FileSaver from "file-saver";
export const downLoadFile = (imgUrl,fileName,callback) => {
    var xhr1 = new XMLHttpRequest();
    xhr1.open('GET', imgUrl, true);
    xhr1.responseType = 'blob';
    xhr1.onreadystatechange = function() {
        if (xhr1.readyState === 4 && xhr1.status === 200 || xhr1.status === 304) {
            if(typeof callback === 'function'){
                callback();
            }
            FileSaver.saveAs(xhr1.response, fileName);
        }
    }
    xhr1.send();
}

//下载带fileName的图片名称
export const downLoadImgFileName = (imgUrl,fileName) => {
    var image = new Image()
    let splitUrl =imgUrl.split('/');
    let imgName = splitUrl[splitUrl.length-1]?.split('.') || [];
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function () {
        var canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        let imgtype = imgType(imgName[1] || 'png')
        var url = canvas.toDataURL(imgtype) // 得到图片的base64编码数据
        var a = document.createElement('a') // 生成一个a元素
        var event = new MouseEvent('click') // 创建一个单击事件
        a.download = imgName[0] || 'photo' // 设置图片名称
        a.href = url // 将生成的URL设置为a.href属性
        a.dispatchEvent(event) // 触发a的单击事件
    }
    image.src = imgUrl;
}

//下载图片
export const downLoadImg = (imgUrl) => {
    const a = document.createElement('a');
    a.href = `${imgUrl}?response-content-type=application/octet-stream`;
    a.download = 'sdsd'
    a.click();
    a.remove();
}
//校验图片类型
export const imgType = (type) => {
    switch (type) {
        case 'png':
            return 'image/png'
        case 'jpg':
            return 'image/jpeg'
        case 'jpeg':
            return 'image/jpeg'
        default:
            break
    }
}

//下载问题反馈zip文件
export const downloadZip = (zipUrl) =>{
    
    // const params = this.formData.fileList.filter(item => this.checkboxList.includes(item.fileUrl)).map(s => s.fileSecret)
    // const resData = await downloadFileApi(params)
    // const blob = new Blob([resData.data], { type: 'application/zip' })
    // const fileName = resData.headers['content-disposition'].split('=')[1]
    // const linkNode = document.createElement('a')
    // linkNode.download = fileName // a标签的download属性规定下载文件的名称
    // linkNode.style.display = 'none'
    // linkNode.href = URL.createObjectURL(blob) // 生成一个Blob URL
    // document.body.appendChild(linkNode)
    // linkNode.click() // 模拟在按钮上的一次鼠标单击
    // URL.revokeObjectURL(linkNode.href) // 释放URL 对象
}




//传过来的数组，需要分离的个数
export const division = (arr, length) => {
    let index = 0;
    let newArray = []
    while (index < arr.length) {
        newArray.push(arr.splice(index, length))
    }
    return newArray 
}

// 父部门的全部名称拼接
export function getParentName(node, str = []) {
    str.push(node.data.name || node.data.regionName)
    if (node.parent) {
        getParentName(node.parent, str)
    }
    return str.slice(0, -1).reverse().join('-')
}

// //多层级表格中表单验证
// export function 
//详情非空判断，显示--
export const isValiteNonempty = (val) =>{
    // console.log(val,'----val-----')
    if((!val || val === '' || val === ' ')&&val!==0){
        return '--'
    }else{
        return val
    }
}