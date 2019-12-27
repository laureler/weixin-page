<template>
    <div id="Home">
		<h2>Home</h2>
		<header class="header">
			<van-swipe :autoplay="3000" indicator-color="white">
				<van-swipe-item>1111111111111111111111111111111111111111111</van-swipe-item>
				<van-swipe-item>2222222222222222222222222222222222222222222</van-swipe-item>
				<van-swipe-item>3333333333333333333333333333333333333333333</van-swipe-item>
				<van-swipe-item>4444444444444444444444444444444444444444444</van-swipe-item>
			</van-swipe>
		</header>
		<container class="container">
			<van-grid>
				<van-grid-item icon="photo-o" text="文字" />
				<van-grid-item icon="photo-o" text="文字" />
				<van-grid-item icon="photo-o" text="文字" />
				<van-grid-item icon="photo-o" text="文字" />
			</van-grid>
		</container>
	</div>
</template>

<script>
    import { Grid, GridItem } from 'vant';

    export default {
        // 组件名称：对象
        name: "Home",
        // 组件内部数据
        data () {
            return {
                images: [
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg'
                ]
			};
        },
        // 组件传递属性
        props: {},
        // 计算属性
        computed: {},
        // 组件方法
        methods: {},
        // 组件监听器
        watch: {},

        // 自定义可用组件，如果你要用组件，且组件没有全局引入，就需要import后，再声明出来。
        components: {
            "van-grid-item": GridItem,
			"van-grid": Grid
		},
        // 自定义指令
        directives: {},
        // 自定义过滤器
        filters: {},

        //* **************生命周期钩子**************** *//
        beforeCreate () {
        },
        created () {
        },

        beforeMount () {
        },
        mounted () {
        },

        beforeRouteUpdate () {
        },
        updated () {
        },

        activated () {
        },
        deactivated () {
        },

        becomponentsforeDestroy () {
        },
        destroyed () {
        },
    };
</script>

<style scoped>
	.header {
		height: 200px;
		display: block;
		background-color: #2db6ff;
	}
	.container {

	}
</style>
