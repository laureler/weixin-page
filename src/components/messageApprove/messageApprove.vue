<template>
	<div class="approve">
		<router-view></router-view>
	</div>

</template>

<script>

    export default {
        // 当前使用的组件
        components: {},
        data () {
            return {}
        },
        // 计算属性
        computed: {
            active () {
            }
        }
    }


</script>

<style lang="less" scoped>
	.approve {
		width: 100%;
		height: calc(~ '100%');
		background: #f3f3f3;
	}
</style>
