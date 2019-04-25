<template lang="html">
	<div style="display:flex;flex-direction:column;background-color:#F0F5F8">
		<page-head title="取消预约"></page-head>
		<van-cell-group>
			<van-field label="预约人：" clearable required text-align="right" input-align="right" :value="form.yyr"
					   type="text" v-model="form.yyr"/>
			<van-field label="证件号：" clearable required text-align="right" input-align="right" :value="form.zjhm"
					   type="text" v-model="form.zjhm"/>
			<van-field label="预约ID：" clearable required text-align="right" input-align="right" :value="form.yyid"
					   type="text" v-model="form.yyid"/>
			<van-field label="预约号：" clearable required text-align="right" input-align="right" :value="form.yyh"
					   type="text" v-model="form.yyh"/>
		</van-cell-group>
		<div style="height: 20px"></div>
		<van-button size="large" class="blueButton" @click="yes()">取消预约</van-button>
		<div style="height: 20px"></div>
	</div>
</template>

<script>
    import Head from './head.vue'
    import { Dialog } from 'vant'
    import Vue from 'vue'

    Vue.use(Dialog)
    import { request } from '../../utils/http.js'
    import { isWx } from '../../utils/ua'

    export default {
        components: {
            'page-head': Head,
        },
        data () {
            return {
                result: '',
                form: {
                    yyr: '',
                    zjhm: '',
                    qzhm: '',
                    yyh: '',
                    id: '',
                },
            }
        },
        methods: {
            yes () {
                const that = this
                if (that.form.yyr !== '' && that.form.zjhm !== '' && that.form.yyid !== '' && that.form.yyh !== '') {
                    const openid = isWx() ? Cookies.get('openid') : '';
                    that.form = { ...that.form, wxh: openid };
                    request({
                        url: '/CancelYYInfoByID',
                        data: { strJson: JSON.stringify(that.form) },
                        success (response) {
                            console.log(response);
                            if (Number(response.resultcode) === 1) {
                                Dialog.alert({
                                    message: response.resultmsg
                                }).then(() => {
                                    // on close
                                })
                            } else {
                                that.result = response.resultmsg;
                            }
                        },
                        fail (error) {
                        },
                    })
                } else {
                    Dialog.alert({
                        title: '警告',
                        message: '请完善所有信息'
                    }).then(() => {
                        // on close
                    })
                }
            },
        },
    }
</script>

<style lang="css" scoped>

	.olabel b {
		color: #d7342e
	}
</style>
