// page/sell_content/price/price.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiUrl:app.globalData.apiUrl,
     price:0,
     name:'',
     press:'',
     appearence:'',
     categoryId:'',
     bcategoryId:0,
     imgUrl:[],
     path:'',
     details:'',
     image:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  success_next(e){
    var that=this;
    let imgUrl=e.currentTarget.dataset.imgUrl;
    wx.request({
      method: "post",
      url:that.data.apiUrl+'book/add',
      data:{
        "name": that.data.name,
        "author": that.data.author,
        "appearance": that.data.appearance,
        "bcategoryId":that.data.bcategoryId,
        "categoryId": that.data.categoryId,
        "detail": that.data.detail,
        "fileUrl": that.data.path,
        "imageUrl": that.data.imgUrl,
        "originPrice": that.data.price,
        "press": that.data.press
      },
      dataType:"json",
      header: {
        // 'content-type': 'multipart/form-data',
        'Accept': "*/*"
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code==888){
          wx.showToast({
              title: res.data.msg,
              icon:'none'
          });
        }
        else{
          wx.navigateTo({
            url: '../success_next/success_next?imgUrl='+that.data.imgUrl,
          })
        }
      }
    })
    
  },
  formPrice:function(e){
    this.setData({
      price:e.detail.value
    })
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      name:options.name,
      author:options.author,//categoryId
      press:options.press,//id
      appearence:options.appearence,
      categoryId:options.categoryId,
      bcategoryId:options.bcategoryId,
      imgUrl:options.imgUrl,
      path:options.path,
      details:options.details,
    })
    var a = this.data.imgUrl.split(",")
    console.log(a)
    this.setData({
      image: [a]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})