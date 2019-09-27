<template>
    <div>
        <div>
            <img class="img-logo" src="../assets/wzgh-logo.png">
        </div>
        <NavMenu/>
    </div>

</template>

<script>
    import NavMenu from './NavMenu';
    export default {
        name: "HomePage",
        components: {
            NavMenu
        }
    }
</script>

<style scoped>
    .img-logo{
        width: 100%;
        height: 100px;
    }
</style>
