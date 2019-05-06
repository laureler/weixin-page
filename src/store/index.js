import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './type';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		step: 0,	// 认证步骤
		messageStep: 1,	// 短信认证步骤
		messageData: [],	// 短信确认数据
		callbackUrl: '',
		cardCode: '',
		cardName: '',
		stepUrl: '',
		showDialog: false,
		finishedVerify: '', // 完成验证
		ibaseAccountId: ''	// 存储绑定的ibase账号ID
	},
	mutations: {
		[types.SET_STEP] (state, res) {
			state.step = res;
			// let tempJson = JSON.stringify(res);
			// window.sessionStorage.setItem('step', tempJson);
		},
		[types.SET_VERIFY_STATE] (state, res) {
			// 使用sessionStorage解决页面刷新数据丢书的问题
			sessionStorage.setItem("finishedVerify", res);
			state.finishedVerify = res;
		},
		[types.SET_MESSAGESTEP] (state, res) {
			state.messagestep = res;
		},
		[types.SET_MESSAGEDATA] (state, res) {
			state.messageData = res;
		},
		[types.CALLBACK_URL] (state, res) {
			state.callbackUrl = res;
		},
		[types.CARD_CODE] (state, res) {
			sessionStorage.setItem("cardCode", res);
			state.cardCode = res;
		},
		[types.CARD_NAME] (state, res) {
			sessionStorage.setItem("cardName", res);
			state.cardName = res;
		},
		[types.GET_STEP_URL] (state, res) {
			state.stepUrl = res;
		},
		[types.DIALOG_CTRL] (state, res) {
			state.showDialog = res;
		},
		[types.IBASE_ACCOUNT_ID] (state, res) {
			sessionStorage.setItem("ibaseAccountId", res);
			state.ibaseAccountId = res;
		},
	},
	getters: {
		getVerifyState(state) {
			if (state.finishedVerify) {
				return state.finishedVerify;
			} else if (sessionStorage.getItem('finishedVerify')) {
				 return sessionStorage.getItem('finishedVerify');
			} else {
				return false;
			}
		},
		getPersonCardInfo(state) {
			if (state.cardCode) {
				return {
					cardCode: state.cardCode,
					cardName: state.cardName
				};
			} else if (sessionStorage.getItem('cardCode')) {
				return {
					cardCode: sessionStorage.getItem('cardCode'),
					cardName: sessionStorage.getItem('cardName')
				}
			} else {
				return {
					cardCode: '',
					cardName: ''
				};
			}
		},
		getIbaseAccountId(state) {
			if (state.ibaseAccountId) {
				return state.ibaseAccountId;
			} else if (sessionStorage.getItem('ibaseAccountId')) {
				return sessionStorage.getItem('ibaseAccountId');
			} else {
				return '';
			}
		}
	}
});
