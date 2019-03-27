<template>
    <div class="approve">
        <router-view></router-view>
    </div>
</template>

<script>
// import sgStep from '../sgStep'

    export default {
        components:{
            // sgStep
        },
        data() {
            return {
                // title:['上传身份证','实人检测','认证结果']
            }
        },
        computed:{
            active(){
                return this.$store.state.step;
            }
        }
    }


</script>

<style scoped lang="less">
.approve{
    width:100%;
    height:100%;
    background:#f3f3f3;
    .approve_step{
        margin-bottom:20px;
    }

}
</style>
