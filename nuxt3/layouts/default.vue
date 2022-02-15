<template>
    <el-container>
        <el-header height="100%">
            <Header></Header>
        </el-header>
        <el-main>
            <slot></slot>
        </el-main>
        <el-footer height="100%">
            <Footer></Footer>
        </el-footer>
    </el-container>
</template>
<script setup>
</script>

<style lang="less" scoped>
.el-header,
.el-main,
.el-footer {
    padding: 0;
}
</style>