<template>
	<div class="step1">
		<page-head title="信息确认"></page-head>
		<div class="container">
			<van-collapse v-model="activeNames" accordion v-for="(outerItem,outerKey,outerIndex) in PageDataArray">
				<van-collapse-item :name="outerIndex">
					<div slot="title">
						<div
							style="border-left: 2px solid #2db6ff;height: 12px;margin-top: 6px;float: left;margin-right: 10px"/>
						{{outerKey}}
					</div>
					<div v-if="typeof outerItem[0][Object.keys(outerItem[0])]=='string'">
						<van-cell-group v-for="(innerItem) in outerItem">
							<van-cell :value="innerItem[Object.keys(innerItem)[0]]" :title="Object.keys(innerItem)[0]"/>
						</van-cell-group>
					</div>
					<div v-else>
						<van-tabs v-model="active">
							<van-tab v-for="(valueTab,indexTab) in outerItem[0][Object.keys(outerItem[0])[0]]"
									 :title="(Object.keys(outerItem[0])[0])+(indexTab+1)">
								<van-cell-group v-for="(innerTabItem,innerTabkey,innerTabIndex)  in valueTab">
									<van-cell :value="innerTabItem" :title="innerTabkey"/>
								</van-cell-group>
							</van-tab>
						</van-tabs>
					</div>
				</van-collapse-item>
			</van-collapse>
		</div>
		<van-button size="large" class="blueButton" @click="next()" id="nextStep">下一步</van-button>
		<div style="height: 20px"></div>
	</div>
</template>

<script>
    import pageTable from './pageTable'
    import Head from '../app/head.vue'
    import { Collapse, CollapseItem } from 'vant'
    import Vue from 'vue'
    import { GenerateUUID } from '../../utils/uuidgenerator.js'

    Vue.use(Collapse).use(CollapseItem)
    export default {
        data () {
            return {
                PageData: null,
                PageDataArray: null,
                active: 1,
                activeNames: [1, 2, 3],
            }
        },
        watch: {
            PageData: function (newValue, oldValue) {
                this.PageDataArray = newValue
            }
        },
        components: {
            'page-head': Head,
            pageTable
        },
        methods: {
            uuid: GenerateUUID,
            next () {
                this.$router.push({ path: '/preApprovenew', query: { token: uiScript.getParam('token') } })
            }
        },
        //在$el被替换的时候调用钩子函数
        mounted () {
			this.$store.commit('SET_MESSAGESTEP', 1);
			this.PageData = this.$store.state.messageData;
        }
    }
</script>

<style lang="less" type="text/less" scoped>

	.step1 {
		background: #f3f3f3;
		font-size: 16px;

	.container {
		/* 减去 上50 下60 margin:40*/
		margin: 20px auto;
		padding-bottom: 55px;
	}

	.bottom {
		position: fixed;
		bottom: 10px;
		height: 60px;
		margin-bottom: 20px
	}

	.approve_next {
		width: 690/2px;
		height: 88/2px;
		margin: 40/2px 30/2px;
		border: none;
		background: #8bbeff;
		border-radius: 44/2px;
		font-size: 36/2px;
		color: #fff;
	}

	.approve_isNext {
		background: #338cfd;
	}

	}
</style>
