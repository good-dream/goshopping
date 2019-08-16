import request from "./utils/request.js";


//app.js
App({
  // 项目运行时触发，只执行一次
  onLaunch: function () {
    // 初始化request的基准路径
    request.defaults.baseURL ='http://api.zbztb.cn/api/public/v1'
  }
    
})