/**
 * 封装一个类似于axios的请求工具库
 * 
 * axios例子：
 * 
 * 1、设置基准路径
 * axios.default.baseURL=""
 * 
 * 2、发起请求，返回的是promise对象
 * axios({参数}).then().catch()
 * 
 * 3、监听错误
 * axios.onError(回调函数)
 * 
 * 封装思路：
 * 采用单利的封装模式
 */

// 发起请求
//"config = {}" 为一个空对象（作为参数）
const request=function(config={}){
  // url为空情况
  if(!config.url){
    // 判断url是否为空,若空就抛出一个错误提示
    throw new Error("请输入正确的url地址!");
    return
  }

  // url不为空
  // 判断url中开头是否包含http/https(正则方法)
  // search()方法使用
  if(config.url.search(/^http/)===-1 ){
    // 拼接上baseurl
    config.url = request.defaults.baseURL + config.url;
  };
  

  // 返回一个promise对象，resole是成功时的回调，reject是失败的回调
  return new Promise((resolve,reject)=>{
    // 发起小程序请求
    wx.request({
      // 用于用传入的对象结构
      ...config,
      
      success(res){
        // 成功之后出发then的回调函数
        resolve(res);
      },

      fail(){},

      // 后台接口可能会自定义错误,错误的处理函数放到complete这里执行
      complete(res){

        // 循环调用错误的错误函数
        request.errors.forEach(fn=>{
          fn(res);
        })
      }
    })
  })
};

// request默认属性。用来装baseurl

request.defaults={
  // 基准路径
  baseURL:""
};

// 保存错误函数
request.errors=[];

// 接收错误的触发函数

// 参数：callback 传入的错误函数 
request.onError=function(callback){
  // 先保存到错误数据中，请求错误的时候统一调用
  request.errors.push(callback);
}



export default request;

