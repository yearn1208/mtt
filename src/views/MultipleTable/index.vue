<template>
  <div>
    <el-table :data="list">
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <button type="danger">Cancel</button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="人员" align="center">
      </el-table-column>
      <el-table-column label="爱好" align="center">
        <el-table-column v-for="(item,index) in colList" :key="index" :prop="item.prop" align="center">
          <template slot="header" slot-scope="scope">
            {{ item.label }}
            <i class="el-icon-circle-close"></i>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      colList: [],
      list: []
    };
  },
  mounted(){
      this.list = [
        {
          name: "colin",
          h1: "run",
          h2: "go",
          h3: "jump",
          date: "202-12-11 12:21:23",
        },
        {
          name: "tom",
          h1: "aa",
          h2: "aa",
          h3: "aa",
          date: "202-12-11 12:21:23",
        },
        {
          name: "jack",
          h1: "ss",
          h2: "ss",
          h3: "ss",
          date: "202-12-11 12:21:23",
        },
        {
          name: "rose",
          h1: "dd",
          h2: "dd",
          h3: "dd",
          date: "202-12-11 12:21:23",
        },
      ]
      this.colList = this.list.map((item,index)=>{
          return {
              prop:'h'+(index+1),
              label:'hobby'+(index+1)
          }
      })
  }
};
</script>

<style lang="scss" scoped></style>
