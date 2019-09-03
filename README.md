# wechat-auth

    基于Vue Cli3的微信公众号项目

## 在线申办模块

> PC端测试环境

> http://www.aiwandoudou.com/mainWeb/index/gdbdc
> admin
> 666666

> 提取数据
> 权利人: 胡化金   不动产权证号: 00070093
 
> PC端正式环境

> http://bdcsq.zsfdc.gov.cn
> http://113.106.13.237:85
> 账号：admin 密码：southadmina

### 操作流程
事项申报 > 遗失补发登记 > 在线申请

### 页面结构
| 页面名称 | 页面描述 |
| --- | --- |
| attachment.vue | 附件上传页面 |
| bookIn.vue | 登记首页 |
| ems.vue | 寄件页面 |
| index.vue | 登记目录页面 |
| info.vue | 登记详情页面 |
| myApplications.vue | 我的登记列表页面 |
| onLineApplication.vue | 路由顶层 |
| success.vue | 申报成功页面 |

### 业务ID

```
1	9ee6baf1-beef-4d08-9848-67f2d185da5a	不动产权利证书遗失（换证）登记
2	b07eb2ba-cbae-4a9f-bf94-d42be317ae99	建设用地使用权、宅基地使用权转移登记
3	CA57ECFB06B54BFBB5DFA61BAA4734DE	存量房（二手房）转移登记
4	F56304D5E5684EF7924E81818BDFB308	房地产权（独幢、层、套、间房屋）转移登记
5	067CBB502A974EB4ABC038AE704E0394	不动产权利证书更正登记
6	8B5ED0B3A0E04DFFBED54D70451121F0	建设用地使用权、宅基地使用权变更登记
7	9745D08769364072820252BFE9E742F9	房地产权（独幢、层、套、间房屋）变更登记
8	D782A0C92A4C40D1A37F36E13B4948BA	不动产权利证书注销登记
9	8313104902AA48F1B685B2095A0EC2E5	异议登记
10	61C46D51F05D4703A1652A94AAF33870	异议注销登记
```

| 业务名称 | 业务号 | 测试数据(提取数据) |
| --- | --- | --- |
| 不动产权利证书遗失（换证）登记 | 9ee6baf1-beef-4d08-9848-67f2d185da5a | 产权类型: 房屋<br>权利人: 胡化金<br>不动产权证号: 00070093 |
| 建设用地使用权、宅基地使用权登记 | b07eb2ba-cbae-4a9f-bf94-d42be317ae99 | 产权类型: 土地<br>权利人: 王书凤<br>不动产权证号: 湘（2017）北湖不动产权第0034063号 |
| 存量房（二手房）转移登记 | CA57ECFB06B54BFBB5DFA61BAA4734DE | 产权类型: 房屋<br>权利人: 胡化金<br>不动产权证号: 00070093 |
| 房地产权（独幢、层、套、间房屋）转移登记 | F56304D5E5684EF7924E81818BDFB308 | 产权类型: 房屋<br>权利人: 胡化金<br>不动产权证号: 00070093 |
| 不动产权利证书更正登记 | 067CBB502A974EB4ABC038AE704E0394 | 产权类型: 土地<br>权利人: 杨智勇<br>不动产权证号: 湘（2017）苏仙不动产权第0022928号 |
| 建设用地使用权、宅基地使用权变更登记 | 8B5ED0B3A0E04DFFBED54D70451121F0 | 产权类型: 土地<br>权利人: 王书凤<br>不动产权证号: 湘（2017）北湖不动产权第0034063号 |
| 房地产权（独幢、层、套、间房屋）变更登记 | 9745D08769364072820252BFE9E742F9 | 产权类型: 房屋<br>权利人: 胡化金<br>不动产权证号: 00070093 |
| 不动产权利证书注销登记 | D782A0C92A4C40D1A37F36E13B4948BA | 产权类型: 房屋<br>权利人: 胡化金<br>不动产权证号: 00070093 |
| 异议登记 | 8313104902AA48F1B685B2095A0EC2E5 | 
| 异议注销登记 | 61C46D51F05D4703A1652A94AAF33870 |

```
房屋：
湘（2017）北湖不动产权第0022950号	肖明才
湘（2017）北湖不动产权第0022949号	欧爱莲
湘（2017）北湖不动产权第0022953号	何铭
湘（2017）苏仙不动产权第0022924号	李军
湘（2017）苏仙不动产权第0022928号	杨智勇
湘（2017）北湖不动产权第0022968号	周文德、周茜
湘（2017）苏仙不动产权第0022929号	龙端秀、胡庆平
湘（2017）苏仙不动产权第0022934号	湖南建工相山房地产开发有限公司
湘（2017）北湖不动产权第0022975号	朱海飞
湘（2017）北湖不动产权第0022989号	李孔菊
湘（2017）北湖不动产权第0022980号、湘（2017）北湖不动产权第0022981号	何纯开、何春艳
湘（2017）苏仙不动产权第0022933号	邓会勇
湘（2017）北湖不动产权第0022985号	聂永生
湘（2017）北湖不动产权第0022977号	李四英
湘（2017）北湖不动产权第0022951号	何小康
湘（2017）北湖不动产权第0022974号	罗永芝
土地：
湘（2017）北湖不动产权第0034063号	王书凤
湘（2017）苏仙不动产权第0035067号	胡三毛
```


### 注意！！！

本项目开发使用了 nginx 代理，需要在开发者电脑上安装 nginx,然后添加 nginx 配置,配置如下

```
server {
    listen    8082;
    server_name  localhost;
    location /workflowWebService/ {
    	proxy_pass http://www.aiwandoudou.com;
    }
    location /pubWeb/system/ {
    	proxy_pass http://www.aiwandoudou.com;
    }
    location /formengineWebService/ {
    	proxy_pass http://www.aiwandoudou.com;
    }
    location /mainWeb/ {
    	proxy_pass http://www.aiwandoudou.com;
    }
    location /cas/ {
    	proxy_pass http://www.aiwandoudou.com;
    }
    
    #location /pubWeb/public/weChatPublic/ {
	#	autoindex on;
	#	autoindex_exact_size off;
	#	autoindex_localtime on;
	#	root  /usr/local/var/www;
    #}

    location /pubWeb/public/weChatPublic/ {
    	proxy_pass http://localhost:3000;
    }
}
```

然后使用`npm run serve`启动项目，启动项目后将访问地址上的端口`3000`改为`8082`即可。
目的：为了访问的接口和启动/部署的项目在同一域名下，解决跨域导致的问题，解决 cas 登录 cookies 保持一致的问题

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
