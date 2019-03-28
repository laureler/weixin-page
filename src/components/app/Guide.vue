<template lang="html">
	<div style="display:flex;flex-direction:column;background-color:#F0F5F8">
		<page-head :title="bname"></page-head>
		<div class="contain">
			<van-cell-group>
				<cell-line @click.native="open(index)" v-for="(item,index) in calcItems" :title="item.title"
						   :label="item.date"/>
			</van-cell-group>
			<van-pagination
				v-model="currentPage"
				:total-items="totalDataNumber"
				:items-per-page="pageSize"
				@change="changeData"
			/>
		</div>
	</div>
</template>

<script>

    import Head from './head.vue'
    import { request } from '../../utils/http'
    import cellLine from './cellLine.vue'

    export default {
        components: {
            'page-head': Head,
            'cell-line': cellLine,
        },
        data () {
            return {
                //当前页码
                currentPage: 1,
                items: [],
                // 全部数据
                datas: [],
                //标题名称
                bname: '',
                pageSize: 10,
                totalDataNumber: 0,
            }
        },
        computed: {
            calcItems: function () {
                var _this = this
                return _this.datas.slice(_this.pageSize * (_this.currentPage - 1), _this.pageSize * _this.currentPage)
            }
        },
        methods: {
            changeData: function (PageNumber) {

            },
            open (index) {
                this.$router.push({
                    path: '/guid',
                    query: { response: this.items[index].gid },
                })
            },
            loadData (pageNum, pageSize) {
                const that = this
                that.items = []
                for (let i = 0; i < that.datas.length; i++) {
                    if (i >= (parseInt(pageNum) - 1) * pageSize && i < parseInt(pageNum) * parseInt(pageSize)) {
                        that.items.push(that.datas[i])
                    }
                }
            },
            handleCurrentChange (val) {
                const that = this
                that.currentPage = val
                that.loadData(val, that.pageSize)
                that.$store.commit('changeCurrent', {
                    currentPage: val,
                })
            },
            record () {
                const that = this
                this.$store.commit(mutationTypes.GET_RECORD, {
                    datas: that.datas,
                    bname: that.bname,
                })
                that.$store.commit('changeState', {
                    bname: that.bname,
                    datas: that.datas,
                })
                that.$store.commit('changeCurrent', {
                    currentPage: that.currentPage,
                })
            },
        },
        mounted () {
            const that = this
            if (that.$store.state.bname == that.$route.query.response && that.$store.state.datas.length > 0 && !that.$route.params.id) {
                const num = that.$store.state.currentPage
                that.datas = that.$store.state.datas
                that.totalDataNumber = that.datas.length
                that.bname = that.$store.state.bname
                if (num) {
                    that.currentPage = num
                }
                for (let i = 0; i < that.datas.length; i++) {
                    if (i >= (that.currentPage - 1) * that.pageSize && i < that.currentPage * that.pageSize) {
                        that.items.push(that.datas[i])
                    }
                }
            } else {
                request({
                    url: '/GetTitleList',
                    data: { strJson: JSON.stringify({ bname: decodeURI(that.$route.query.response) }) },
                    success (response) {
                        console.log(response)
                        for (let i = 0; i < response.noInfo.length; i++) {
                            that.datas.push({
                                title: response.noInfo[i].title,
                                date: response.noInfo[i].createtime.slice(0, 10),
                                gid: response.noInfo[i].gid,
                            })
                            if (i < that.pageSize) {
                                that.items.push({
                                    title: response.noInfo[i].title,
                                    date: response.noInfo[i].createtime.slice(0, 10),
                                    gid: response.noInfo[i].gid,
                                })
                            }
                        }
                        that.bname = response.noInfo[0].bname
                        that.totalDataNumber = that.datas.length
                        that.record()
                    },
                    fail (error) {
                    },
                })
            }
        },
    }
</script>

<style lang="css" scoped>

	@import "../../css/elem UI.css";

	.van-cell__title {
		width: 100% !important;
	}

	.contain {
		background-color: #ffffff;
		margin-top: 0.25rem;
	}

	.paging {
		padding: 0.15rem;
	}
</style>
