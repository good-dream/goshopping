import request from "../../utils/request.js";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品列表数据
    goods:[],
    // 当前选中的商品
    current:0,
    // 商品列表渲染的页数（页码）
    pagenum:1,
    // 商品列表每页的渲染个数（页容量）
    pagesize:10,
    keyword:'',
    // 是否有更多(浏览页面是，拉到下面刷新)
    hasMore: true

  },

  /**
   * 生命周期函数--监听页面加载
   * onLoad函数里面有个包装好的参数options
   * options用来返回url的参数（类似于this.$router.query）
   * 
   */
  onLoad: function (options) {
    // options返回url的参数
    this.setData({
      keyword:options.keyword
    })

    // 请求列表数据
    this.getData()
  },

  // 请求列表数据（封装一下好复用）
  getData(){
    
    const { keyword, pagenum, pagesize } = this.data;

    request({
      url: "/goods/search",
      data:{
        query:keyword,
        pagenum,
        pagesize
      }
    }).then(res => {
      // console.log(res)
      // 解构出goods，获取我们需要的数据
      const { goods } = res.data.message;

      // 判断是否满足pagesize条数，不满足说明是最后一页
      if(goods.length<this.data.pagesize){
        this.setData({
          hasMore:false
        })
      }

      // 循环给每个商品修改价格，保留两位小数点
      // map()遍历数组，有返回值（返回当前数组，利于代码优化），forEach是没有返回值（其中v为里面的每一项的值item）
      // toFixed(2)方法是四舍六入法，保留两位小数
      const newGoods= goods.map(v=>{
        // console.log(v)
        v.goods_price=Number(v.goods_price).toFixed(2);
        return v;
      })


      this.setData({
        // 合并新旧的数据
        goods:[...this.data.goods,...newGoods]
      })
    })
  },


  // 点击单个商品的时候触发
  // 点击跳转的商品详情页
  // event参数为包装好的
  handleChange(event){
    // 用event.currentTarget.dataset获取事件传递的参数，然后把index解构出来（用了navigator标签跳转页面（url属性）
    const {index}=event.currentTarget.dataset

    this.setData({
      current:index
    })
  },

  // 触底加载（加载下一页数据）
  onReachBottom(){
    // 先判断是否还有下一页,没有更多直接返回
    if(!this.data.hasMore){
      return;
    }

    // 页数加1
    this.setData({
      pagenum:this.data.pagenum+1
    })

    // 请求列表数据
    this.getData();
  }

})