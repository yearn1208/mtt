<template>
  <div class="contain‌er">
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el2">吸顶</div>
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el1"></div>
    <div class="el1"></div>
  </div>
</template>

<script>
export default {
  name: "",
};
</script>

<style lang="scss" scoped>
.contain‌er {
  min-height: 100%;
  width: 40%;
  .el1 {
    height: 100px;
    background-color: #ace;
    margin: 20px;
  }
  .el2 {
    //   吸顶
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: rgb(238, 191, 170)
    ;
  }
}
</style>
