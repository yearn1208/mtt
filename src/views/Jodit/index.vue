<template>
  <div>
    <!-- <jodit-editor v-model="content" id="myjodit" name="editor"
  placeholder="请输入内容"
  :height="400"></jodit-editor> -->
    <textarea
      id="myjodit"
      name="myjodit"
      placeholder="start typing text ..."
    ></textarea>
  </div>
</template>

<script>
// import { JoditVue } from "jodit-vue";
import { Jodit } from "jodit";
import "jodit/build/jodit.min.css";
export default {
  name: "MyJodit",
  data() {
    return {
      content: "",
      joditRef: "",
    };
  },
  //   components: {
  //     JoditEditor: JoditVue,
  //   },
  watch: {
    joditRefValue: {
      handler(v) {
        this.content=v
      },
      deep:true,
    },
  },
  computed:{
      joditRefValue:{
          get:function(){
              console.log(this.joditRef.value);
              return this.joditRef.value
          },
        //   set:()=>{

        //   }
      }
  },
  mounted() {
    this.joditRef = Jodit.make("#myjodit", {
      width: 1800,
      height: 800,
      useSearch:true,//使用内置搜索
      //   fullsize:true,
      useInputsPlaceholder: true,
    });
    console.log('内容',this.joditRef);
  },
};
</script>

<style lang="scss" scoped></style>
