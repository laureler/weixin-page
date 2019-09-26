debugger;
try {
	function callBack(result) {
		if (result.cqxx.length > 0) {
			var rid = result.cqxx[0].RID;
			var qszt = result.cqxx[0].FQSZT;
			var sBdcdyh = result.cqxx[0].FBDCDYH;
			var jid = $.F.getBusinessno();
			var jsonData = {};
			jsonData["srcMark"] = "$bdcsjtq_cq:RID=" + rid + "&type=1";
			jsonData["targetJid"] = jid;

			//判断产权是否土地，是土地的提取土地的产权
			var configName = "土地及房屋权属证书补换证提取房屋产权";
			if (rid.indexOf('TD') >= 0) configName = "土地及房屋权属证书补换证提取土地产权";
			jsonData["configureName"] = configName;

			$.messager.mask("正在获取数据，请稍候...");
			$.ajax({
				url: "/formengineWebService/startExtractBusiness",
				type: "POST",
				data: jsonData,
				success: function(data) {
					$.messager.mask("");
					if (data) {
						//$.F.setFieldValue("JOB_GLQLXXB_LINK.OLD_IQLDJ",null);
						//$.F.setFieldValue("JOB_SQRXXB_OLD_LINK.OLD_IQLR",null);
						//判断房屋是否该帐号下的权利人
						var zcxx = getUserInfo();
						var zcmc = zcxx["REALNAME"]; //注册账号的名称
						var qlr = data["JOB_SQRXXB_LINK.IQLR"];
						var hqmc = qlrCombine(qlr); //获取到的权利人组合
						if (hqmc.indexOf(zcmc) == -1) {
							showError("房屋权利人与该账号名称不一致,无法继续受理!");
							return;
						}
						//获取业务的房屋编码，用于判断业务情况
						var fwbm = data["JOB_GLQLXXB_LINK.OLD_IQLDJ"][0]["JOB_GLQLXXB.FFWBM"];
						//判断业务数据是否已被保存过或已受理过
                      	var qzh = data["JOB_GLQLXXB_LINK.OLD_IQLDJ"][0]["JOB_GLQLXXB.FBDCQZH"];
						var sYwsj = checkWhetherAcceptance(qzh);
						if (sYwsj == "已受理") {
							showError("该房屋业务已被保存或已申请过，请检查确认。");
							return;
						}
						//获取不动产信息
						var gBdcxx = ExtractData(fwbm);
						if (rid.indexOf('FW') >= 0&&gBdcxx.resultcode == 0) {
							showError("获取数据异常,请联系管理员处理。");
							return;
						}
                      	if(rid.indexOf('FW') >= 0){
                        	var gdata = gBdcxx["bdcxx"];
                            var bSfbgl = gdata.SFBGL;
                            var bSflz = gdata.SFLZ;
                            //判断业务是否可办理
                            var gSfkbl = limitJudge(bSfbgl, bSflz);
                            if (gSfkbl != "可办理") {
                                showError(gSfkbl);
                                return;
                            }
                        }
						//获取镇区代码              
						var zqdm = exchangeZqdm(sBdcdyh);
						data["JOB_SJDJB.FZQDM"] = zqdm;
						//获取不动产类型
						var qllx = data["JOB_GLQLXXB_LINK.OLD_IQLDJ"][0]["JOB_GLQLXXB.FQLLX"];
						var bdclx = getBdcType(qllx);
						data["JOB_BDCQK.FBDCLX"] = bdclx;
						//设置面积和用途
						var mj = "";
						var yt = "";
						var zdmj = data["JOB_BDCQK.FTDMJ"];
						var jzmj = data["JOB_BDCQK.FJZMJ"];
						var tdyt = data["JOB_BDCQK.FTDYT"];
						var fwyt = data["JOB_BDCQK.FFWYT"];
						if (bdclx == "土地") {
							mj = zdmj + "平方米";
							yt = tdyt;
						}
						if (bdclx == "土地和房屋") {
							mj = zdmj + "平方米" + "/" + jzmj + "平方米";
							yt = tdyt + "/" + fwyt;
						}
						$.F.setFieldValue("JOB_BDCQK.FMJ", mj);
						$.F.setFieldValue("JOB_BDCQK.FYT", yt);
						//补充权利人信息
						for (var key in data) {
							if (key == "JOB_SQRXXB_LINK.IQLR") {
								var rows = data[key];
								for (var inx = 0; inx < rows.length; ++inx) {
									rows[inx]["JOB_SQRXXB.XH"] = inx + 1;
									rows[inx]["JOB_SQRXXB.FSQRLX"] = "权利人";
									rows[inx]["JOB_SQRXXB.FDWXZ"] = "个人";
									if (rows.length == 1) {
										rows[inx]["JOB_SQRXXB.FGYQK"] = "单独所有";
										rows[inx]["JOB_SQRXXB.FQLBL"] = "全部";
									}
								}
							}
							$.F.setFieldValue(key, data[key]);
						}
						showSuccess("提取成功");
					}
				},
				error: function(xhr, stat, exmsg) {
					//$.messager.mask("");
					showSuccess("提取失败");
				}
			});
		}
	}
	//根据不动产单元号获取镇区代码
	function exchangeZqdm(sBdcdyh) {
		if (sBdcdyh == null) {
			sBdcdyh = "000000000000";
		}
		var zqdm = sBdcdyh.substring(6, 9);
		if (zqdm == "000") {
			zqdm = "";
		} else if (zqdm == "001") {
			zqdm = "石岐区";
		} else if (zqdm == "002") {
			zqdm = "东区";
		} else if (zqdm == "003") {
			zqdm = "38";
		} else if (zqdm == "004") {
			zqdm = "19";
		} else if (zqdm == "005") {
			zqdm = "18";
		} else if (zqdm == "006") {
			zqdm = "36";
		} else if (zqdm == "100") {
			zqdm = "41";
		} else if (zqdm == "101") {
			zqdm = "37";
		} else if (zqdm == "102") {
			zqdm = "26";
		} else if (zqdm == "103") {
			zqdm = "31";
		} else if (zqdm == "104") {
			zqdm = "22";
		} else if (zqdm == "105") {
			zqdm = "34";
		} else if (zqdm == "106") {
			zqdm = "30";
		} else if (zqdm == "107") {
			zqdm = "40";
		} else if (zqdm == "108") {
			zqdm = "29";
		} else if (zqdm == "109") {
			zqdm = "24";
		} else if (zqdm == "110") {
			zqdm = "27";
		} else if (zqdm == "111") {
			zqdm = "35";
		} else if (zqdm == "112") {
			zqdm = "28";
		} else if (zqdm == "113") {
			zqdm = "33";
		} else if (zqdm == "114") {
			zqdm = "25";
		} else if (zqdm == "115") {
			zqdm = "23";
		} else if (zqdm == "116") {
			zqdm = "32";
		} else if (zqdm == "117") {
			zqdm = "39";
		}
		return zqdm;
	}
	//根据权利类型判断不动产类型
	function getBdcType(qllx) {
		var bdclx = "";
		if (qllx == "国有建设用地使用权" || qllx == "宅基地使用权" || qllx == "集体土地所有权" || qllx == "集体建设用地使用权") {
			bdclx = "土地";
		} else if (qllx == "国有建设用地使用权/房屋所有权" || qllx == "集体建设用地使用权/房屋所有权" || qllx == "宅基地使用权/房屋所有权") {
			bdclx = "土地和房屋";
		}
		return bdclx;
	}
	//通过房屋编码获取不动产信息
	function ExtractData(fwbm) {
		var bdcxx = {};
		var jsonData = {
			fwbm: fwbm
		};
		var queryParams = {
			"strJson": JSON.stringify(jsonData),
			"path": "/WSYY/GetBdcdyInfo_ZS"
		};
		$.ajax({
			url: "/pubWeb/public/system/getExtractInfo",
			data: queryParams,
			type: 'post',
			async: false,
			success: function(data) {
				bdcxx = data;
			}
		});
		return bdcxx;
	}
	//根据状态判断业务是否可办理
	function limitJudge(xSfyg, xSfdy, xSfcf, xSfbgl, xSflz, xBaygbs) {
		if (xSfbgl == 1) return "房屋已被其他业务关联，无法办理！";
		else if (xSflz == 0) return "房屋没有落宗，无法办理！";
		else return "可办理";
	}
	//根据房屋编码检查业务是否已受理过
	function checkWhetherAcceptance(qzh) {
		var selectparam = {};
		var stext = "";
		selectparam["QZH"] = qzh;
		var requestParam = JSON.stringify(selectparam);
		$.ajax({
			url: "/formengineWebService/execsql",
			data: {
				"sql1": "判断遗失补发业务",
				"param1": requestParam
			},
			type: 'post',
			async: false,
			success: function(data) {
				var map = data['sql1'];
				if (map.length > 0) stext = "已受理";
			}
		});
		return stext;
	}
	//获取登陆用户信息
	function getUserInfo() {
		var yhxx = {};
		var selectparam = {};
		selectparam["USERID"] = $.O.getUserId();
		var requestParam = JSON.stringify(selectparam);
		var datas = [];
		$.ajax({
			url: "/formengineWebService/execsql",
			data: {
				"sql1": "获取登录用户信息",
				"param1": requestParam
			},
			type: 'post',
			async: false,
			success: function(data) {
				var map = data['sql1'];
				if (map.length > 0) {
					yhxx = map[0];
				}
			}
		});
		return yhxx;
	}
	//权利人组合
	function qlrCombine(qlr) {
		var qlrlist = "";
		for (var i = 0; i < qlr.length; i++) {
			if (i < qlr.length - 1) {
				qlrlist += qlr[i]["JOB_SQRXXB.FSQRMC"] + "、";
			} else {
				qlrlist += qlr[i]["JOB_SQRXXB.FSQRMC"];
			}
		}
		return qlrlist;
	}
	showDialog(location.origin+"/pubWeb/public/system/GetPropertyRightInfo", "提取产权数据", true, callBack);
} catch(e) {

}