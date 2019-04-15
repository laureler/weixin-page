import Vue from 'vue';
import Vuex from 'vuex';
// import * as api from '../constants/index.js'
import * as types from './type';
// import * as http from '../utils/http.js'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		step: 0,	// 认证步骤
		messageStep: 1,	// 短信认证步骤
		callbackUrl: '',
		cardCode: '',
		cardName: '',
		stepUrl: '',
		showDialog: false,
		finishedVerify: ''	// 完成验证
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
		}
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
		}
	}
});
