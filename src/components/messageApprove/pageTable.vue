<template>
	<div>
		<!-- change 标签页改变事件-->
		<a-tabs @change="callback" type="card">
			<!-- :tab 绑定tab标签-->
			<!--a-tab-pane-->
			<a-tab-pane :tab="titleValue+(index+1)" :key="titleValue+index" v-for="(valueItem,index) in valueList">
				<table>
					<tr v-for="(item,index) in valueItem">
						<td>{{index}}</td>
						<td>{{item}}</td>
					</tr>
				</table>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>
    export default {
        name: 'pageTable',
        props: ['valueList', 'titleValue'],
        data: function () {
            return {
                tabKey: null
            }
        },
        methods: {
            indexToString: function (index) {
                return index.toString()
            }
        },
        methods: {
            callback: function (key) {
                console.log(key)
            }
        }
    }
</script>

<style scoped>

</style>
