var app=getApp();// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    
    apiUrl:app.globalData.apiUrl,
    cateItems: app.globalData.cateItems,
    type:'',
    one:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var one = JSON.parse(options.one);
    console.log(options)
    this.setData({
      type:options.type,
      page:options.page,
      child_id:options.child_id,
      mainindex:options.mainindex,
      findex:options.findex,
      one:one
    })

   }
})