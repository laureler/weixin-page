<template lang="html">
    <div style="height: 100%">
		<page-head title="办事大厅"></page-head>
		<div style="position: relative; height: 150px">
			<img src="../../assets/images/topImg.png" class="img"/>
			<span class="title_name">惠州市不动产登记中心</span>
		</div>
		<div class="branch">
			<div v-for="(item,i) in GridCellData"  class="branch_yuyue" @click="open(item.path)" v-bind:style="gridCellStyle(item.title)">
				<span>{{item.title}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import Head from './head.vue'
    export default {
        name: "OficeHall",
		components: {
			'page-head': Head,
		},
		data () {
			return {
				/*GridCellData: [
					{"id": '1', 'title': '个人预约', 'path': '/appl'},
					{"id": '2', 'title': '人脸核身', 'path': '/preapprovenew'},
					{"id": '3', 'title': '登记业务进度查询', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMAppointmentProgress/' },
					{"id": '4', 'title': '权籍调查进度查询', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZQJCMAppointmentProgress/'},
					{"id": '5', 'title': '权籍调查成果查询', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '6', 'title': '开发商预约', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '7', 'title': '法律法规', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '8', 'title': '办事指南', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '9', 'title': '通知公告', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '10', 'title': '在线查档', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '11', 'title': '在线缴费', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '12', 'title': '在线缴税', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '13', 'title': '互动交流', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '14', 'title': '排队取号', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '15', 'title': '排队进度', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '16', 'title': '我的预约', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '17', 'title': '业务确认', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '18', 'title': '产权查询', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '19', 'title': '办事流程', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'},
					{"id": '20', 'title': '证书查验', 'path': 'http://land.huizhou.gov.cn:8098/Home/HZCMQJDCQuery/'}
				],*/
				GridCellData:[]
			}
		},
		mounted() {
        	this.init();
		},
		methods: {
			init: function () {
				 let  _this=this;
				 let url='/pubWeb/public/getWeChatIndexList';
				 _this.$fetch(url).then(res=>{
					 for(var i=0;res.length;i++){
					 	if(res[i].STATUS==1){
							var tempData={id:res[i].id,title:res[i].TITLE,path:res[i].PATH};
							_this.GridCellData.push(tempData);
						}
					 }
				 }).catch(error=>{
					 console.log(error);
				 })
			},
			open (path) {
				if(path.indexOf('http')!=-1){
					window.location.href=path;
				}else{
				this.$router.push(path)
				}
			}
	 },
		computed:{
			  gridCellStyle(){
			  	 return function (val) {
					 var  style='';
					 if(val=='个人预约'){
						 style="background-image: url("+require('../../assets/images/minpresonalOrder.png')+"),radial-gradient(#908bf0,#6a76e7);background-repeat:no-repeat;background-position:50% 25%;";
					 }else if (val=='人脸核身'){
						 style="background-image: url("+require('../../assets/images/minfaceVerify.png')+"),linear-gradient(#85e4ed,#59d3cc);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='登记业务进度查询'){
						 style="background-image: url("+require('../../assets/images/minplanSearch.png')+"),linear-gradient(#f38c8d,#ff6474);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='权籍调查进度查询'){
						 style="background-image: url("+require('../../assets/images/qjplanSearch.png')+"),linear-gradient(#f47cb8,#f056cd);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='权籍调查成果查询'){
						 style="background-image: url("+require('../../assets/images/minqjResult.png')+"),linear-gradient(#ba89f0,#9663ed);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='开发商预约'){
						 style="background-image: url("+require('../../assets/images/minkaifashang.png')+"),linear-gradient(#8bbef2,#60a5da);background-repeat:no-repeat;background-position:50% 25%;"
					 }else   if(val=='办事指南'){
						 style="background-image: url("+require('../../assets/images/minguide.png')+"),linear-gradient(#86edca,#51d29a);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='法律法规'){
						 style="background-image: url("+require('../../assets/images/minregulition.png')+"),linear-gradient(#7ee8d3,#5edbbc);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='通知公告'){
						 style="background-image: url("+require('../../assets/images/minNotice.png')+"),linear-gradient(#8eeb9d,#5ed572);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='在线查档'){
						 style="background-image: url("+require('../../assets/images/minOnlinFile.png')+"),linear-gradient(#a6e882,#7dc853);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='在线缴费'){
						 style="background-image: url("+require('../../assets/images/minOnlinePay.png')+"),linear-gradient(#efeb7d,#e7c81d);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='在线缴税'){
						 style="background-image: url("+require('../../assets/images/minOlineRote.png')+"),linear-gradient(#f1b570,#f69340);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='互动交流'){
						 style="background-image: url("+require('../../assets/images/minRegulation.png')+"),linear-gradient(#f29d73,#fe874d);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='排队取号'){
						 style="background-image: url("+require('../../assets/images/minLined.png')+"),linear-gradient(#f09896,#f76f6c);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='排队进度'){
						 style="background-image: url("+require('../../assets/images/minpaiduijindu.png')+"),linear-gradient(#88c9eb,#4dbae3);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='我的预约'){
						 style="background-image: url("+require('../../assets/images/minwodeyuyue.png')+"),linear-gradient(#79dcc3,#2cc6ba);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='业务确认'){
						 style="background-image: url("+require('../../assets/images/minyewuqueren.png')+"),linear-gradient(#95de87,#70cb66);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='产权查询'){
						 style="background-image: url("+require('../../assets/images/minRealestSearch.png')+"),linear-gradient(#80cfd6,#50c4cf);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='办事流程'){
						 style="background-image: url("+require('../../assets/images/minworkliucheng .png')+"),linear-gradient(#95b5dc,#6c99ce);background-repeat:no-repeat;background-position:50% 25%;"
					 }else if(val=='证书查验'){
						 style="background-image: url("+require('../../assets/images/minzhengshu.png')+"),linear-gradient(#9ca8d7,#7a8dd6);background-repeat:no-repeat;background-position:50% 25%;"
					 }
					 return style;
				 }
			  }
		}
    }
</script>

<style scoped>
	.img {
		float: left;
		display: block;
		width: 100%;
	}
	span.title_name {
		position: absolute;
		font-size: 27px;
		font-weight: 500;
		font-family: STXingkai, serif;
		color: dodgerblue;
		top: calc(4% - 13px);
		left: 19px;
		width: 45%;
		text-align: right;
	}
	.branch{
		padding-bottom: 2rem;
		width:100%;
		height: 100%;
	}
	.branch .branch_yuyue{
		/*background: url(../../assets/images/person.png);*/
		margin-top: 0.65rem;
		margin-left: 0.55rem;
		font-size: 0.426667rem;
		font-weight: bold;
		color: #fff;
		width: 41%;
		height:20%;
		position: relative;
		float: left;
		border-radius:6px;
	}
	.branch .branch_yuyue span{
		position: absolute;
		width: fit-content;
		bottom: 0.266667rem;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
