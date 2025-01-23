import Moment from 'moment'

// 时间戳（毫秒）转化为标准时间格式
export function formatTime(timeStamp, formatStr) {
    // formatStr ===> 'YYYY-MM-DD HH:mm:ss'
    if(!timeStamp){
        return '--'
    }
    const stamp = new Date(timeStamp)
    const time = Moment(stamp).format(formatStr)
    return time
}

export const calcDate = (date1, date2) => {
    var date3 = date2 - date1

    var days = Math.floor(date3 / (24 * 3600 * 1000))

    var leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))

    var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))

    var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
    var seconds = Math.round(date3 / 1000)
    return {
        leave1,
        leave2,
        leave3,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            const str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
    }
    return fmt
}
export function dateFormatMethod(date, defaultValue, format) {
    if (date) {
        if (format) {
            return formatDate(new Date(date), format)
        } else {
            return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:ss')
        }
    }
    return defaultValue || ''
}

export function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

Date.prototype.format = function (format) {
    var o = {
        'M+': this.getMonth() + 1, // month
        'd+': this.getDate(), // day
        'h+': this.getHours(), // hour
        'm+': this.getMinutes(), // minute
        's+': this.getSeconds(), // second
        'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
        S: this.getMilliseconds()
        // millisecond
    }
    if (/(y+)/.test(format) || /(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return format
}
// 根据选择时间转换成不同时区
// 2023-05-09 18：15：12  ---->

export function timeZoneChange(date, timeZoneDiff) {
    if (Array.isArray(date) && date.length > 0) {
        // 数组，日期时间起止模式
        console.log('date', date)
        let start = new Date(date[0].replace(/-/g, '/')).getTime() + timeZoneDiff * 60 * 60 * 1000
        let end = new Date(date[1].replace(/-/g, '/')).getTime() + timeZoneDiff * 60 * 60 * 1000
        return [Moment(start).format('yyyy-MM-DD HH:mm:ss'), Moment(end).format('yyyy-MM-DD HH:mm:ss')]
    } else {
        var regex = /^\d+$/;
        //校验是否是时间戳
        if (regex.test(date)) {
            //时间戳直接进行时区处理
            let stamp = Number(date)+ timeZoneDiff * 60 * 60 * 1000
            return Moment(stamp).format('yyyy-MM-DD HH:mm:ss')
        }else{
            //字符串，日期时间单选模式
            let stamp = new Date(date.replace(/-/g, '/')).getTime() + timeZoneDiff * 60 * 60 * 1000
            return Moment(stamp).format('yyyy-MM-DD HH:mm:ss')
        }
    }
}


// 转换时区（显示与传值）
export function changeDateTime(date, type="s") {
    // type: 's',展示（show）；'p'，传参（param）
    if (date) {
        // 兼容时间戳
        let regex = /^\d{13}$/
        if(regex.test(date)){
            // 时间戳，则转换为标准时间格式
            date = Moment(date).format('yyyy-MM-DD HH:mm:ss')
        }
        // 判断标准时间格式是否含有时间
        let hasTime = date.split(' ')[1] 
        if (type == 's') {
            return Moment
                .utc(date)
                .local()
                .format(hasTime ? 'yyyy-MM-DD HH:mm:ss' : 'yyyy-MM-DD')
        } else {
            return Moment(date)
                .utc()
                .format(hasTime ? 'yyyy-MM-DD HH:mm:ss' : 'yyyy-MM-DD')
        }
    } else {
        return type == 's' ? '--' : ''
    }
}