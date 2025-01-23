<template>
  <div></div>
</template>

<script>
export default {
  name: '',
  data(){
      return {
          option = {
  backgroundColor: '#03213D',
  animation: true, // 控制动画是否开启
  animationDuration: 1000, // 动画的时长, 它是以毫秒为单位
  animationDuration: function (arg) {
    return 1000 * arg;
  },
  animationEasing: 'bounceOut', //linear 缓动动画
  animationThreshold: 8, // 动画元素的阈值
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0,0,0,.6)',
    borderColor: 'rgba(147, 235, 248, 0)',
    textStyle: {
      color: '#FFF'
    }
  },
  grid: {
    top: '10%',
    bottom: '5%',
    left: '3%',
    right: '8%',
    containLabel: true
  },
  xAxis: [
    {
      data: ['焦二', '焦三', '焦四'],
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: '#163a5f',
          width: 2
        }
      },
      axisTick: {
        show: false, //隐藏X轴刻度
        alignWithLabel: true
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: 'rgb(255,255,255,.7)',
          fontSize: 16,
          fontWeight: 'bold'
        },
        interval: 0,
        formatter: function (value) {
          var ret = ''; //拼接加\n返回的类目项
          var maxLength = 4; //每项显示文字个数
          var valLength = value.length; //X轴类目项的文字个数
          var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
          if (rowN > 1) {
            //如果类目项的文字大于5,
            for (var i = 0; i < rowN; i++) {
              var temp = ''; //每次截取的字符串
              var start = i * maxLength; //开始截取的位置
              var end = start + maxLength; //结束截取的位置
              //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              temp = value.substring(start, end) + '\n';
              ret += temp; //凭借最终的字符串
            }
            return ret;
          } else {
            return value;
          }
        }
      }
    },
    {
      data: ['焦二', '焦三', '焦四'],
      show:false,
      axisLine: {
        show: false, //隐藏X轴轴线
        lineStyle: {
          color: '#163a5f',
          width: 2
        }
      },
      axisTick: {
        show: false, //隐藏X轴刻度
        alignWithLabel: true
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: 'rgb(255,255,255,.7)',
          fontSize: 16,
          fontWeight: 'bold'
        },
        interval: 0,
        formatter: function (value) {
          var ret = ''; //拼接加\n返回的类目项
          var maxLength = 4; //每项显示文字个数
          var valLength = value.length; //X轴类目项的文字个数
          var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
          if (rowN > 1) {
            //如果类目项的文字大于5,
            for (var i = 0; i < rowN; i++) {
              var temp = ''; //每次截取的字符串
              var start = i * maxLength; //开始截取的位置
              var end = start + maxLength; //结束截取的位置
              //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              temp = value.substring(start, end) + '\n';
              ret += temp; //凭借最终的字符串
            }
            return ret;
          } else {
            return value;
          }
        }
      }
    }
  ],
  yAxis: {
    type: 'value',
    // name: "单位：ml",
    nameTextStyle: {
      color: '#BDD8FB',
      fontSize: 12
    },
 
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.15)',
        type: 'dashed' // dotted 虚线
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: true, //隐藏X轴轴线
      lineStyle: {
        color: '#163a5f',
        width: 1
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: 'rgba(207,227,252,0.6)',
        fontSize: 12
      }
    }
  },
  series: [
    {
      name: '值 - 全焦产量',
      type: 'bar',
      barWidth: 30,
      itemStyle: {
        color: function (params) {
          return {
            type: 'linear',
            x: 0, //右
            y: 0, //下
            x2: 0, //左
            y2: 1, //上
            colorStops: [
              {
                offset: 0.01,
                color: '#ffffff' // 0% 处的颜色
              },
              {
                offset: 0.1,
                color: '#13D5FC'
              },
              {
                offset: 1,
                color: 'transparent' // 100% 处的颜色
              }
            ]
          };
          // }
        },
        barBorderRadius: [8, 8, 0, 0]
      },
      label: {
        show: true,
        position: 'top',
        distance: 0,
        color: 'rgb(0,255,255)',
        formatter: '{c}'
      },
      data: [35, 33, 65]
    },
    {
      name: '背景 - 全焦产量',
      type: 'bar',
      barWidth: '30px',
      xAxisIndex: 1,
      data: [100, 100, 100], //背景阴影长度
      itemStyle: {
        normal: {
          color: 'rgba(255,255,255,0.06)',
          barBorderRadius: [0, 0, 0, 0],
          borderColor: 'rgb(33,156,251)'
        }
      },
      tooltip: {
        show: false
      },
      zlevel: 9
    },
    {
      name: '值 - 冶金焦产量',
      type: 'bar',
      barWidth: 30,
      barGap: '100%',
      itemStyle: {
        color: function (params) {
          return {
            type: 'linear',
            x: 0, //右
            y: 0, //下
            x2: 0, //左
            y2: 1, //上
            colorStops: [
              {
                offset: 0.01,
                color: '#ffffff' // 0% 处的颜色
              },
              {
                offset: 0.1,
                color: '#13D5FC'
              },
              {
                offset: 1,
                color: 'transparent' // 100% 处的颜色
              }
            ]
          };
          // }
        },
        barBorderRadius: [8, 8, 0, 0]
      },
      label: {
        show: true,
        position: 'top',
        distance: 0,
        color: 'rgb(0,255,255)',
        formatter: '{c}'
      },
      data: [25, 33, 65]
    },
    {
      name: '背景 - 冶金焦产量',
      type: 'bar',
      xAxisIndex: 1,
      barWidth: '30px',
      barGap: '100%',
      data: [100, 100, 100], //背景阴影长度
      itemStyle: {
        normal: {
          color: 'rgba(255,255,255,0.06)',
          barBorderRadius: [0, 0, 0, 0],
          borderColor: 'rgb(33,156,251)'
        }
      },
      tooltip: {
        show: false
      },
      zlevel: 9
    }
  ]
}
      }
  }
}
</script>

<style lang="scss" scoped>

</style>
