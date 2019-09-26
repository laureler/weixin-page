import Mock from 'mockjs2'

let getConfigDataByJidInfo = (jid) => {
	return {
		"不动产情况": [{
			"不动产单元号": ""
		},
			{
				"不动产坐落": "123"
			},
			{
				"房屋结构": "钢结构"
			},
			{
				"建筑面积": "123.0"
			},
			{
				"规划用途": "住宅"
			},
			{
				"合同编号": ""
			}
		],
		"权利人信息": [{
			"权利人": [{
				"姓名": "456",
				"代理人名称": "p",
				"证件号码": "1234567890",
				"联系电话": "t",
				"共有情况": "单独所有",
				"代理人证件号码": "a",
				"证件种类": "身份证",
				"通讯地址": "w",
				"单位性质": "个人"
			},
				{
					"姓名": "123",
					"代理人名称": null,
					"证件号码": null,
					"联系电话": null,
					"共有情况": null,
					"代理人证件号码": null,
					"证件种类": null,
					"通讯地址": null,
					"单位性质": "个人"
				}
			]
		}],
		"义务人信息": [{
			"义务人": [{
				"姓名": "qwe",
				"代理人名称": null,
				"证件号码": null,
				"法人代表名称": null,
				"联系电话": null,
				"代理人证件号码": null,
				"证件种类": null,
				"通讯地址": null,
				"单位性质": null
			},
				{
					"姓名": "asd",
					"代理人名称": "o",
					"证件号码": "asdfdgfdgd",
					"法人代表名称": "u",
					"联系电话": "r",
					"代理人证件号码": "p",
					"证件种类": "身份证",
					"通讯地址": "w",
					"单位性质": "个人"
				}
			]
		}]
	};
}
// mock /formengineWebService/public/getConfigDataByJid?jid=${jid}
Mock.mock(/\/formengineWebService\/public\/getConfigDataByJid/, 'get', getConfigDataByJidInfo)
