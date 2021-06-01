// Pages/mySellList/mySellList.js
var util = require('../../utils/util');
var api = require('../../config/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sellList:[],
    page:1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let token=wx.getStorageSync('token');
    // let header={};
    // console.log(token);
    // header['token']=token;
  },

  gotoDetail(e){
 wx.navigateTo({
   url: '../component/details/details?thingsId=' + e.currentTarget.dataset.id,
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
    this.initall()
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
  ,
  initall(){
    let that = this
    wx.request({
      url: api.OnSale+"?"+"size=1&&current=1",//我的在售
      method: 'GET',
      data: {
        page: that.data.page
      },
      header: {
        'token': wx.getStorageSync('token'),
        'Content-Type': 'application/json'
      },
      success(res) {
        // console.log(token);
        console.log(res.data);
        that.setData({
          sellList: res.data.data.records
        })
      }
    })
  },
  dele: function (e) {
    let id = e.currentTarget.dataset.id
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除该条记录',
      success: function (res) {
        if (res.confirm) {
          let token = wx.getStorageSync("token")
          console.log('用户点击确定')
          wx.request({
            url: '',//删除在售商品
            method: "post",
            header: {
              'Content-Type': 'application/json',
              'token': token
            },
            data: {
              thingsId: id
            },
            success: function (res) {
              console.log(res)
              that.onShow()
              wx.showToast({
                title: '删除成功',
                icon: "success"
              })
            },
            fail: function (res) {
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }

    }
    )
  }
})