import Mock from 'mockjs2'

let wechatPublicName = (options) => {
	let titleObj = { "resultcode": "1", "resultmsg": "", "name": "不动产登记平台微信测试账号" };
	return titleObj;
}

// 办事网点
let bswd = (options) => {
	let bswd = {
		szwdinfo: []
	};
	for (let i = 0; i < 5; i++) {
		let childObj = {
			szwd: '肇庆市高要区不动产登记中心' + i + 1
		};
		bswd.szwdinfo.push(childObj)
	}
	return bswd;
};

// 预约事项
let yysx = () => {
	return {
		"yysxinfo": [
			{ "yysx": "个人业务1" },
			{ "yysx": "个人业务2" }
		]
	}
}

// 预约日期
let yyrq = () => {
	let yyrqInfo = {
		yyrqinfo: []
	};
	for (let i = 0; i < 4; i++) {
		yyrqInfo.yyrqinfo.push({
			yyrq: `2019-${new Date().getMonth() + 1}-${new Date().getDate()}`
		})
	}
	return yyrqInfo;
}
// 预约时段
let yysd = () => {
	let yysdInfo = { "yysdinfo": [{ "yysd": "08:30-09:30", "zhs": "5", "yyys": "0" }, { "yysd": "09:30-10:30", "zhs": "5", "yyys": "0" }, { "yysd": "10:30-11:30", "zhs": "5", "yyys": "0" }, { "yysd": "14:30-16:00", "zhs": "10", "yyys": "0" }, { "yysd": "16:00-17:30", "zhs": "10", "yyys": "0" }] }
	return yysdInfo;
}
// 检查预约信息
let checkYYRInfo = () => {
	// resultcode == 1 代表成功
	return { "resultcode": "1", "resultmsg": "" }
}

let submitYYRInfo = () => {
	return { "resultcode": "1", "resultmsg": "YY1907290001,1,2019-07-29,08:30-09:30,广东省肇庆市高要区沿江二路28号,吴云龙,个人业务", "yyinfo": [{ "YYH": "YY1907290001", "SXH": "1", "YYRQ": "2019-07-29", "YYSD": "08:30-09:30", "WDDZ": "广东省肇庆市高要区沿江二路28号", "YYR": "吴云龙", "YYSX": "个人业务" }] }
}
// mock: '/pubWeb/public/doIntranetRequest/GetWeChatPublicName' 【POST】获取微信标题
Mock.mock(/\/pubWeb\/public\/doIntranetRequest\/GetWeChatPublicName/, 'post', wechatPublicName)
// mock: '/pubWeb/public/doIntranetRequest/GetYYBSWD'  【POST】 获取办事网点列表
Mock.mock(/\/pubWeb\/public\/doIntranetRequest\/GetYYBSWD/, 'post', bswd)
// mock: '/pubWeb/public/doIntranetRequest/GetYYSX' 【POST】获取预约事项
Mock.mock(/\/pubWeb\/public\/doIntranetRequest\/GetYYSX/, 'post', yysx)
// mock: '/pubWeb/public/doIntranetRequest/GetYYRQ' 【POST】获取预约日期
Mock.mock(/\/pubWeb\/public\/doIntranetRequest\/GetYYRQ/, 'post', yyrq)
// mock: '/pubWeb/public/doIntranetRequest/GetYYSD' 【POST】获取预约时段
Mock.mock(/\/pubWeb\/public\/doIntranetRequest\/GetYYSD/, 'post', yysd)
// mock: '/pubWeb/public/doIntranetRequest/CheckYYRInfo' 【POST】检查预约申请
Mock.mock(/\/pubWeb\/public\/doIntranetRequest\/CheckYYRInfo/, 'post', checkYYRInfo)
// mock: '/pubWeb/public/doIntranetRequest/CheckYYRInfo' 【POST】检查预约申请
Mock.mock(/\/pubWeb\/public\/doIntranetRequest\/SubmitYYInfo/, 'post', submitYYRInfo)
