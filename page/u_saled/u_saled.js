// Pages/buying/buying.js
var util = require('../../utils/util');
var api = require('../../config/api');
Page({


  data: {
    sellList: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;  
    wx.setStorageSync('token', that.data.token);
    wx.request({
      url:api.OutSale+"?"+"size=1&&current=1",//已卖出接口
      data: {
        page: that.data.page
      },
      header: {
        'token': wx.getStorageSync('token'),
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success(res) {
        that.setData({
          sellList: res.data.data.records
        })
        console.log("我的售卖=" + res.data.data.records)
      }
    })

  },

  gotoDetail(e) {
    wx.navigateTo({
      url: '../component/details/details?thingsId=' + e.currentTarget.dataset.id,
    })
  },

  // complain(e) {
  //   console.log(e.currentTarget.dataset.thingid)
  //   wx.navigateTo({
  //     url: '../appeal/appeal?thingId=' + e.currentTarget.dataset.thingid
  //   })

  // },

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