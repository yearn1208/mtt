<template>
    <div class="basic-container">
        <el-card>
            <slot />
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'BasicContainer'
}
</script>

<style lang="scss">
    .basic-container {
        padding: 0px 5px;
        border-radius: 10px;
        box-sizing: border-box;
        min-height: 500px;

        .el-card {
            width: 100%;
        }

        &:first-child {
            padding-top: 0;
        }
    }
</style>
