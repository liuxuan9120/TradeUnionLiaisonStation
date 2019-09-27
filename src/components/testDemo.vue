<template>
    <div>
        <div class="parent">
            <img class="children" src="../assets/logo.png">
        </div>
    </div>
</template>

<script>
    export default {
        name: "testDemo"
    }
</script>

<style scoped>
    /*图片自动缩放，垂直居中显示*/
    .parent {
        width:100%;
        height: 250px;
        text-align: center;
        line-height: 250px;
    }

    .children {
        display: inline-block;
        vertical-align: middle;
        width: 100%;
    }
</style>
