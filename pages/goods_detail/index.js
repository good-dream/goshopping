
import request from "../../utils/request.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    imgUrls:[],
    // 商品详情
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // options为包装好的参数，会返回url里面有的参数
    const {id}=options;

    // 请求商品详情
    request({
      url:"/goods/detail",
      data: {
        goods_id:id
      }
    }).then(res=>{
      console.log(res)
      // 解构出我们需要渲染的数据
      const {message}=res.data;

      this.setData({
        detail:message
      })
    })
  },

 
})