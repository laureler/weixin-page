<template lang="html">
	<div>
		<page-head title="政务资讯"></page-head>
		<van-cell-group>
			<van-cell @click="open('gui',666,'通知公告')" title="通知公告"/>
			<van-cell @click="open('gui',666,'办事指南')" title="办事指南"/>
			<van-cell @click="open('gui',666,'政策法规')" title="政策法规"/>
		</van-cell-group>
	</div>
</template>

<script>

    import Head from './head.vue'

    export default {
        components: {
            'page-head': Head
        },
        data () {
            return {}
        },
        methods: {
            open (path, status, status2) {
                this.$router.push({ name: path, params: { id: status }, query: { response: status2 } });
            }
        }
    }

</script>

<style lang="css" scoped>

	.ctitle {
		color: #150d1c;
	}

	.cul {
		margin-top: 0.45rem;
		margin-left: 0.3rem;
		margin-right: 0.3rem;
	}

	.cli {
		font-size: 0.375rem;
		height: 45px;
		border-bottom: 1px solid #e9e9e9;
		padding: 0.3rem 0;
		list-style: none;
		height: 45px;
		border-bottom: 1px solid #e9e9e9;
	}

</style>
