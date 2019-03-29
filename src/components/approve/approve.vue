<template>
    <div class="approve">
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        components:{},
        data() {
            return {}
        },
        computed:{
            active(){
                return this.$store.state.step;
            }
        }
    }

</script>

<style lang="less" scoped>
.approve{
    width:100%;
    height:100%;
    background:#f3f3f3;
}
</style>
