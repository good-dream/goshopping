import request from '../../utils/request.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 总的数据
    navs:[],
    current:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 请求左侧菜单栏数据
    request({
      url:'/categories'
    }).then(res=>{
      // console.log(res)
      // 结构出需要渲染的数据
      const {message}=res.data;

      this.setData({
        navs:message
      })
    })
  },

  // 导航栏点击时触发
  // 点击哪个导航栏就切换到相应的内容渲染
  // （就是获取到index赋值给索引current，current需要在data中设置）

  handleChange(even){
    const {index}=event.currentTarget.dataset

    this.setData({
      current:index
    })
  }


})