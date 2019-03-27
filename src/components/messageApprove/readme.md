## messageApprove文件夹

本文件夹是为 用户在提交事件发送短信模板之后，用户通过短信模板请求的手机页面。

1. 本页面访问地址  ${rootPath}/messageApprove 用户有可能会携带不同的参数来设置。

#### 参数约定如下：
> http://localhost:3000/pubWeb/public/weChatPublic/messageApprove?token='20180810f'

参数： token值
参数格式： 业务号(jid属性值) + 分类
其中，业务号可能有n位(根据不同的系统来设置),分类值只有一位。
故：
```javascript
var yurl = `http://localhost:3000/pubWeb/public/weChatPublic/messageApprove?token='20180810f'`
var param =  `20180810f`
var token =  `20180810f`
var jid =  token.substr(0,str.length-1)  // 20180810
```

2. 本页面分为几个步骤
    1. 默认为step1，即为默认进入第一个页面。
    2. 点击上一步或者下一步会跳转到对应的页面。
    3. 

