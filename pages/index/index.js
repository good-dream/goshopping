import request from "../../utils/request.js";

Page({
  data:{
    // autoplay:true,
    // 轮播图的数据
    imgUrls:[],
    // 分类菜单数据
    menus:[],
    // 楼层数据
    floors:[],
    // 当前点击
    current:0
  },

  // 页面加载时触发（发起请求）
  onLoad(){

    // 请求轮播图数据
    request({
      url:'/home/swiperdata'
    }).then(res=>{
      // console.log(res)
      // 返回的数组
      const {message}=res.data;
      // 修改imgurls(获取后台返回来的轮播图数据)
      this.setData({
        imgUrls:message
      })
    });

    // 请求分类菜单数据
    request({
      url:'/home/catitems'
    }).then(res=>{
      // console.log(res)
      // 解构得出需要渲染的数据(分类)
      const {message}=res.data;
      // 修改分类菜单的数组
      this.setData({
        menus:message
      })
    });

    // 请求楼层数据
    request({
      url:'/home/floordata'
    }).then(res=>{
      console.log(res)
      // 解构得出需要渲染的数据(楼层)
      const {message}=res.data;
      // 修改装楼层的数组
      this.setData({
        floors:message
      })
    })
  }
})
