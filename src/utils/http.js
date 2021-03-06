/*
 * @Author: charls.fairy
 * @Motto: Your smile is my rainbow.
 * @Website: https://www.fairy520.top/
 * @Github: https://github.com/CharlsPrince
 * @Date: 2019-10-16 19:21:13
 * @LastEditors: charls.fairy
 * @LastEditTime: 2019-10-23 10:56:54
 * @Description: 文件注释
 */
// var url='https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=3Q0dARwnDHr3PlsgBie7oIaY&client_secret=4p5UrwCncRlsDED6B9QK0iZN4tN7AxET&';
import axios from 'axios';
import moment from 'moment';
// cookie解析模块
import Cookies from 'js-cookie';
import qs from "qs";
// 登出接口
import {
	LOG_OUT
} from '../constants/index.js';
// todo activeId做什么用？
let activeId = sessionStorage.getItem('activeId');
// todo base_URL 需要全部起作用
// 新增request请求
const REQUEST_TIMEOUT = 300000;

const BASE_URL = '/pubWeb/public/doIntranetRequest';
// const BASE_URL = 'http://192.168.10.103:7300/mock/5cb6cd4eb2e5a100170bf2ac/wechat';
// const BASE_URL = 'http://118.24.70.239:7300/mock/5c9af379365f9600200deb72/WSYY';

const HEADERS = {
	'X-Requested-With': 'XMLHttpRequest',
	'x-csrf-token': Cookies.get('csrfToken') || undefined,
};

// 添加请求拦截器
var axiosFilter = function () {
	axios.defaults.withCredentials = true;
	// 添加请求拦截器
	axios.interceptors.request.use(function (config) {
		// 在发送请求之前做些什么
		// 拦截post请求
		if (config.method === 'post') {
			let paramStr = config.data.strJson;
			if (paramStr != null) {
				var toJSON = JSON.parse(paramStr);
				var reg = /(^\s*)|(\s*$)/g;
				for (var key in toJSON) {
					if (toJSON[key] !== undefined && typeof toJSON[key] == 'stirng') {
						toJSON[key] = toJSON[key].replace(reg, '');
					}
				}
				config.data.strJson = JSON.stringify(toJSON);
			}
		} else if (config.method === 'get') {
			// 拦截get请求
			/* if (config.params.strJson != null) {
			  var toJSON = JSON.parse(config.params.strJson);
			  var reg = /^\s*(.*?)\s*$/;
			  for (var key in toJSON) {
				toJSON[key].replace(reg, "");
			  }
			  config.params.strJson = JSON.stringify(toJSON);
			} */
		}
		return config;
	}, function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	});
	// 添加响应拦截器
	axios.interceptors.response.use(function (response) {
		// 对响应数据做点什么
		console.log("响应拦截");
		return response;
	}, function (error) {
		// 对响应错误做点什么
		return Promise.reject(error);
	});
};
export const AxiosFilter = new axiosFilter();

export const request = ({
	method = 'post',
	baseURL = BASE_URL,
	timeout = REQUEST_TIMEOUT,
	headers,
	url,
	data,
	success,
	fail,
}) => {
	const defaultParams = {
		_: moment().valueOf(),
	};
	const params = data ? {
		...defaultParams,
		...data,
	} : defaultParams;
	axios({
			method,
			url,
			params: method === 'get' ? params : undefined,
			data: method !== 'get' ? params : undefined,
			timeout,
			baseURL,
			headers: {
				...HEADERS,
				...headers,
			},
		})
		.then(response => {
			success && success(response.data);
		})
		.catch(error => {
			if (error.response) {
				if (error.response.data) {
					fail && fail({
						msg: error.response.data.msg,
						status: error.response.status,
						data: error.response.data,
					});
				} else {
					fail && fail({
						msg: error.message,
						status: error.response.status,
					});
				}
			} else {
				fail && fail({
					msg: error.message
				});
			}
		});
};

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: params
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(err => {
				reject(err);
			});
	});
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err);
			});
	});
}


/**
 * 封装postFrom请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function postFrom(url, data = {}) {
	return new Promise((resolve, reject) => {
		var instance = axios.create({
			headers: {'content-type': 'application/x-www-form-urlencoded'}
		});
		instance.post(url, qs.stringify(data))
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err);
			});
	});
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.patch(url, data)
			.then(response => {
				if (response.data.Status == -2) {
					window.location.href = LOG_OUT + '?activeId=' + activeId;
				} else {
					resolve(response.data);
				}
			}, err => {
				reject(err);
			});
	});
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data)
			.then(response => {
				if (response.data.Status == -2) {
					window.location.href = LOG_OUT + '?activeId=' + activeId;
				} else {
					resolve(response.data);
				}
			}, err => {
				reject(err);
			});
	});
}
