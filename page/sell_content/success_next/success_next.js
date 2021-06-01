// page/sell_content/success_next/success_next.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var image=options.imgUrl;
    this.setData({
      image:image
    })
  },
  content(){
    wx.navigateTo({
      url: '../../sell_content/sell_information/sell_information',
    })
  },
  to_home(){
    wx.switchTab({
      url: '../../home/home',
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