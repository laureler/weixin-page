const BASE_URL = 'http://bdcsq.zsfdc.gov.cn';
// export const BASE_URL ='' ;
// export const GET_HOUSE_URL=BASE_URL+'/api/House/getFormRoomList?activeId=2';   //获取房源列表
// export const GET_HOME_URL = BASE_URL + '/api/House/getProjectInfo';	//获取首页项目信息
// export const GET_COLLECT_LIST = BASE_URL + '/api/Collect/getCollectList';//获取收藏列表
// export const SET_COLLECT_HOUSE = BASE_URL + '/api/Collect/setCollectHouse';//收藏和取消收藏
// export const GET_NOBUY_COLLECT = BASE_URL + '/api/Collect/getNotBuyCollectList';//获取未购买收藏列表
// export const GET_HOUSEINFO_URL = BASE_URL + '/api/House/getHouseDetail'; //获取房源详情
// export const SET_COLLECT_UP_DOWN = BASE_URL + '/api/Collect/setCollectUpDowm'; //收藏上移下移
// export const GET_USER_URL = BASE_URL + '/api/account/UserInfo'; //获取用户信息
// export const POST_ORDER_SUBMIT = BASE_URL + '/api/Order/submitOrder'; //提交订单
// export const GET_BUY_STATUS = BASE_URL + '/api/Order/QueryBuyStatus'; //是否购买
// export const GET_ORDER_LIST = BASE_URL + '/api/Order/getOrderList'; //获取订单列表
// export const GET_ORDER_DETAIL = BASE_URL + '/api/Order/getOrderDetail'; //获取订单详情
// export const GET_ACTIVE_TIME = BASE_URL + '/api/House/getActiveDateTime'; //获取活动时间
// export const GET_ACTIVE_STATS_INFO = BASE_URL + '/api/Stats/getActiveStatsInfo'; //活动分析
// export const GET_USER_INFO_LIST = BASE_URL + '/api/Stats/getUserInfoList'; //客户分析列表
export const LOG_OUT = BASE_URL + '/Wechat/LogOut'; // 退出

export const CHECKOUT_REAL_ESTATE = '/pubWeb/system/getExtractInfo'; // 通过输入查询条件获取列表数据
// export const CHECKOUT_EQUITY_ID_INFO = '/formengineWebService/startExtractBusiness';//通过产权id获取详情数据
export const GET_BUSINESS_START_FROM = '/workflowWebService/getBusinessStartForm'; // 根据业务代码创建业务
export const START_EXACT_BUSINNESS = '/formengineWebService/startExtractBusiness'; // 根据产权 ID 获取详细数据
export const SAVE_TASK_FORM_DATA = '/workflowWebService/saveTaskFormData'; // 保存创建的业务数据
export const UPLOAD_FILES = '/formengineWebService/uploadFiles'; // 附件上传
export const SUBMIT_TASK_FORM_DATA = '/workflowWebService/submitTaskFormData'; // 提交业务
export const FILL_SUB_FORM_DATA = '/formengineWebService/fillSubFormData'; // 填充子表单
export const ADD_SUB_FORM_DATA = '/formengineWebService/addSubFormData'; // 添加子表单数据
export const GET_PROGRESS_JOBDATA_BY_MONGODB = '/workflowWebService/myjob/getProgressJobDataByMongoDB'; // 进度查询
export const DEL_SUB_FORM_DATA = '/formengineWebService/deleteSubFormData'; // 删除子表单内容

export const TEST = '/pubWeb/public/weChatPublic/serviceConfirm'; // test

//根据不动产单元号获取镇区代码
export const exchangeZqdm = function (sBdcdyh) {
	if (sBdcdyh == null || sBdcdyh == "") {
		sBdcdyh = "000000000000";
	}
	var zqdm = sBdcdyh.substring(6, 9);
	var a1 = ["000", "001", "002", "003", "004", "005", "006", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117"];
	var b1 = ["", "16", "17", "38", "19", "18", "36", "41", "37", "26", "31", "22", "34", "30", "40", "29", "24", "27", "35", "28", "33", "25", "23", "32", "39"];
	for (var i = 0; i < a1.length; i++) {
		if (zqdm == a1[i]) {
			zqdm = b1[i];
			break;
		}
	}
	return zqdm;
}

export const exchangeZqdmToZqmc = function (zqdm) {
	var tree = [{
			"id": "16",
			"text": "石岐区"
		},
		{
			"id": "17",
			"text": "东区"
		},
		{
			"id": "18",
			"text": "南区"
		},
		{
			"id": "19",
			"text": "西区"
		},
		{
			"id": "22",
			"text": "东升"
		},
		{
			"id": "23",
			"text": "板芙"
		},
		{
			"id": "24",
			"text": "三角"
		},
		{
			"id": "25",
			"text": "三乡"
		},
		{
			"id": "26",
			"text": "民众"
		},
		{
			"id": "27",
			"text": "横栏"
		},
		{
			"id": "28",
			"text": "阜沙"
		},
		{
			"id": "29",
			"text": "港口"
		},
		{
			"id": "30",
			"text": "沙溪"
		},
		{
			"id": "31",
			"text": "东凤"
		},
		{
			"id": "32",
			"text": "大涌"
		},
		{
			"id": "33",
			"text": "南朗"
		},
		{
			"id": "34",
			"text": "古镇"
		},
		{
			"id": "35",
			"text": "南头"
		},
		{
			"id": "36",
			"text": "五桂山"
		},
		{
			"id": "37",
			"text": "黄圃"
		},
		{
			"id": "38",
			"text": "火炬开发区"
		},
		{
			"id": "39",
			"text": "神湾"
		},
		{
			"id": "40",
			"text": "坦洲"
		},
		{
			"id": "41",
			"text": "小榄"
		}
  ];
  var zqmc = '';
  for (let index = 0; index < tree.length; index++) {
    const element = tree[index];
    if (element.id == zqdm) {
      zqmc = element.text;
      break;
    }
  }
  return zqmc;
}
