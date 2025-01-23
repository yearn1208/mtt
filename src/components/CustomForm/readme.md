### 表格头部查询组件

##### 1. 使用

```js

    <template>
        ...
        <custom-form />
    </template>
    // xxx.vue文件中
    <script>
    important CustomForm from "@/components/CustomForm"

    export default {
        components:{
            CustomForm
        }
    }
     </script>

```

#### 2.参数

###### formTarget

```js
// tip 所有参数都改为小驼峰命名 之前在template标签内的'xx-yy'改为'xxYY'


// el-input 组件
const formTarget = {
	key: {  // key，这个key只是为了操作当前对象方便 建议和下边的field字段一致
		type: 'input', // 如果不传入type默认input 目前可选参数 select(下拉菜单)，datePicker
		model: '',   // string|number 默认值，加载页面默认值
		field: 'key',// string 字段key
        disabled:true,//boolean 是否禁用 element一样
        placeholder:'placeholder' // 和element之前一样
        size:'small',//string 参考element 一样
        clearable:false,// boolean 参考element 一样
        maxlength:100, // number类型 参考element
        prefixIcon:'xxxx',//参考elememnt
        suffixIcon:'xxxx',////参考elememnt
        // 第一种写法 
        // change:(value)=>{
             //   ...
        // },
        // 第一种写法
        change:this.xxxx // methods的方法 支持element中input组件的所有方法,
        blur:this.xxxx, 
        focus:this.xxx,
        clear:this.xxx // blur,focus,clear 参考change
	},
}


```
