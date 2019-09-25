<template>
    <div id="RouterView">
		<h2>RouterView</h2>
	</div>
</template>

<script>
    export default {
        // 组件名称：对象
        name: "RouterView",
        // 组件内部数据
        data() {
            return {};
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
        components: {},
        // 自定义指令
        directives: {},
        // 自定义过滤器
        filters: {},

        //* **************生命周期钩子**************** *//
        beforeCreate() {
        },
        created() {
        },

        beforeMount() {
        },
        mounted() {
        },

        beforeRouteUpdate() {
        },
        updated() {
        },

        activated() {
        },
        deactivated() {
        },

        becomponentsforeDestroy() {
        },
        destroyed() {
        },

        // https://cn.vuejs.org/v2/api/#errorCaptured
        errorCaptured(err, vm, info) {
        }
    };
</script>

<style scoped></style>
