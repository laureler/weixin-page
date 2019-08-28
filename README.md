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
| 业务名称 | 业务号 | 测试数据 |
| --- | --- | --- |
| 不动产权利证书遗失（换证）登记 | 9ee6baf1-beef-4d08-9848-67f2d185da5a | 产权类型: 房屋 权利人: 胡化金   不动产权证号: 00070093 |
| 建设用地使用权、宅基地使用权登记 | b07eb2ba-cbae-4a9f-bf94-d42be317ae99 | 产权类型: 土地 权利人: 王书凤 不动产权证号: 湘（2017）北湖不动产权第0034063号 |

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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
