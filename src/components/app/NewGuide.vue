<template lang="html">
	<div style="display:flex;flex-direction:column;background-color:#F0F5F8">
		<page-head :title="urlParam"></page-head>
        <div class="search-div">
            <div class="s-div">
                <input v-model="searchData" type="text" class="s-input"/>
				<van-icon name="search" size="20px" color="#6cccff" v-on:click="query" class="s-query" ></van-icon>
            </div>
        </div>
		<div class="contain">
			<van-cell-group>
				<cell-line @click.native="open(item)" v-for="(item,index) in calcItems" :title="item.title"/>
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
    import { Toast } from 'vant'
    import cellLine from './cellLine.vue'

    export default {
        components: {
            'page-head': Head,
            'cell-line': cellLine
        },
        data () {
            return {
                urlParam:"办事指南",
				currentPage: 1,
                // 全部数据
                datas: [],
                //查询条件
                searchData:'',
                bname: '',
				items:[],
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
			changeData: function (PageNumber) {

			},
            query () {
                const that = this;
                request({
                    url: '/GetTitleList',
                    data: {strJson:JSON.stringify({filter:decodeURI(that.searchData),bname:decodeURI(that.$route.query.response)})},
                    success (data) {
                        that.datas = data.noInfo;
                        that.totalDataNumber=data.total;
                        that.currentPage=1;
                    },
                    fail (error) {
                        if(error.status == '404'){
                            Toast("找不到该接口！");
                            return;
                        }
                    },
                })
            },
            open (item) {
                var url = item.app_url;
                window.location.href = url;
            }
        },
        mounted () {
			let id = this.$route.query.response;
			this.urlParam=id;
           // this.urlParam = uiScript.getParam('response') || '';
            const that = this;
            if (that.$store.state.bname == that.$route.query.response && that.$store.state.datas.length > 0 && !that.$route.params.id) {
				const num = that.$store.state.currentPage
                that.datas = that.$store.state.datas
                that.bname = that.$store.state.bname
				that.totalDataNumber = that.datas.length
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
                    data: { strJson: JSON.stringify({ bname: decodeURI(that.$route.query.response), page: '0', filter: '', count: '10000'  }) },
                    success (response) {
                        //that.datas = response.noInfo;
						console.log(response)
						for (var i = 0; i < response.noInfo.length; i++) {
							that.datas.push({
								title: response.noInfo[i].title,
								date: response.noInfo[i].createtime.slice(0, 10),
								gid: response.noInfo[i].gid,
								app_url:response.noInfo[i].app_url,
							})
							if (i < that.pageSize) {
								that.items.push({
									title: response.noInfo[i].title,
									date: response.noInfo[i].createtime.slice(0, 10),
									gid: response.noInfo[i].gid,
								})
							}
						}
						that.totalDataNumber =response.total;
						that.bname = response.noInfo[0].bname
						//that.record()
                    },
                    fail (error) {
                        if(error.status == '404'){
                            Toast("找不到该接口！");
                            return;
                        }
                    },
                })
            }
        },
    };
</script>

<style lang="css" scoped>

	.van-cell__title {
		width: 100% !important;
	}

	.contain {
		background-color: #ffffff;
		margin-top: 1.65rem;
	}

	.paging {
		padding: 0.15rem;
	}

    .search-div {
		background: #f0f5f8;
        width: 100%;
		height: 1.7rem;
        position: fixed;
        top: 1.2rem;
        left: 0;
        z-index: 2001;
	}

	.s-query {
		padding: 5px 10px;
        color: rgb(181,181,181)!important;
	}

	.s-query:focus {
		background: white;
	}

	.s-query:hover {
		background: white;
	}

	.s-div {
		padding: 0.15rem 0rem 0.15rem 0.15rem;
		display: flex;
		margin: 0.25rem 0.25rem 0.25rem 0.25rem;
		background-color: #ffffff;
		height: 1.2rem;
        border-radius: 5px;
        border: 1px solid #E5E5E5;
	}

	.s-input {
		width: 90%;
		border: none;
		font-size: 0.373333rem;
        color: #333;
		outline: none;
		margin-right: 0.31rem;
	}
</style>
