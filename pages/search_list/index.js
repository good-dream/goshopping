import request from "../../utils/request.js";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品列表数据
    goods:[],
    current:0
  },

  /**
   * 生命周期函数--监听页面加载
   * onLoad函数里面有个包装好的参数options
   * options用来获取url的参数（类似于this.$router.query
   * 
   */
  onLoad: function (options) {

    // 定义一个变量存储关键字
    let keyword="";

    request({
      url:"/goods/search?query="+keyword,
    }).then(res=>{
      console.log(res)

      const {goods}=res.data.message;

      this.setData({
        goods
      })
    })
  },

  handleChange(event){

  },

  onReachBottom(){}

})