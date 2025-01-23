// 加
function accAdd(arg1, arg2) {
    var r1, r2, m, c
    try {
        r1 = arg1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    c = Math.abs(r1 - r2)
    m = Math.pow(10, Math.max(r1, r2))
    if (c > 0) {
        var cm = Math.pow(10, c)
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace('.', ''))
            arg2 = Number(arg2.toString().replace('.', '')) * cm
        } else {
            arg1 = Number(arg1.toString().replace('.', '')) * cm
            arg2 = Number(arg2.toString().replace('.', ''))
        }
    } else {
        arg1 = Number(arg1.toString().replace('.', ''))
        arg2 = Number(arg2.toString().replace('.', ''))
    }
    return (arg1 + arg2) / m
}
// 减
function accSub(arg1, arg2) {
    var r1, r2, m, n
    try {
        r1 = arg1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2)) // last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
}
// 乘法
var accDiv = function(num1, num2) {
    num1 = Number(num1)
    num2 = Number(num2)
    var t1 = 0; var t2 = 0; var dec1; var dec2
    try { t1 = countDecimals(num1) } catch (e) { }
    try { t2 = countDecimals(num2) } catch (e) { }
    dec1 = convertToInt(num1)
    dec2 = convertToInt(num2)
    var result = accMul((dec1 / dec2), Math.pow(10, t2 - t1))
    return getCorrectResult('div', num1, num2, result)
    // return result;
}

// 除
function accMul(arg1, arg2) {
    var m = 0
    var s1 = arg1.toString()
    var s2 = arg2.toString()
    try {
        m += s1.split('.')[1].length
    } catch (e) {}
    try {
        m += s2.split('.')[1].length
    } catch (e) {}
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

var countDecimals = function(num) {
    var len = 0
    try {
        num = Number(num)
        var str = num.toString().toUpperCase()
        if (str.split('E').length === 2) { // scientific notation
            var isDecimal = false
            if (str.split('.').length === 2) {
                str = str.split('.')[1]
                if (parseInt(str.split('E')[0]) !== 0) {
                    isDecimal = true
                }
            }
            const x = str.split('E')
            if (isDecimal) {
                len = x[0].length
            }
            len -= parseInt(x[1])
        } else if (str.split('.').length === 2) { // decimal
            if (parseInt(str.split('.')[1]) !== 0) {
                len = str.split('.')[1].length
            }
        }
    } catch (e) {
        throw e
    } finally {
        if (isNaN(len) || len < 0) {
            len = 0
        }
        return len
    }
}

var convertToInt = function(num) {
    num = Number(num)
    var newNum = num
    var times = countDecimals(num)
    var temp_num = num.toString().toUpperCase()
    if (temp_num.split('E').length === 2) {
        newNum = Math.round(num * Math.pow(10, times))
    } else {
        newNum = Number(temp_num.replace('.', ''))
    }
    return newNum
}

var getCorrectResult = function(type, num1, num2, result) {
    var temp_result = 0
    switch (type) {
        case 'add':
            temp_result = num1 + num2
            break
        case 'sub':
            temp_result = num1 - num2
            break
        case 'div':
            temp_result = num1 / num2
            break
        case 'mul':
            temp_result = num1 * num2
            break
    }
    if (Math.abs(result - temp_result) > 1) {
        return temp_result
    }
    return result
}

/* 四舍五入保留两位小数 */
// num为传入的值，n为保留的小数位
function fomatFloat(num, n) {
    var f = parseFloat(num)
    if (isNaN(f)) {
        return false
    }
    f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n) // n 幂
    var s = f.toString()
    var rs = s.indexOf('.')
    // 判定如果是整数，增加小数点再补0
    if (rs < 0) {
        rs = s.length
        s += '.'
    }
    while (s.length <= rs + n) {
        s += '0'
    }
    return s
}

export { accAdd, accSub, accDiv, accMul, fomatFloat }
