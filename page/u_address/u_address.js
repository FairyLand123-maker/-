var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({
  data: {
      addresses: [],
      nowAddress: 0
  },
  goAddressDetail: function(e) {
      console.log(e);
      let id = e.currentTarget.dataset.addressid;
      wx.navigateTo({
          url: '../u_newaddress/u_newaddress?id=' + id,
      })
  },
  getAddresses() {
    //   let that = this;
  
},
  selectAddress:function(e) {
      let addressId = e.currentTarget.dataset.addressid
      wx.setStorageSync('addressId', addressId);
      wx.navigateBack();
  },
  onLoad: function(options) {
      let type = options.type;
      let addresses=this.data.addresses;
      wx.request({
        url: api.GetAddresses,
        method:'GET',
        header: {
         'token': wx.getStorageSync('token'),
         'Content-Type': 'application/json'
       },
       success:res=>{
           console.log(res.data);
           this.setData({
             addresses:res.data.data,
           })
       }
      })
      this.setData({
          type: type
      })
  },
  onUnload: function() {},
  onShow: function() {
      this.getAddresses();
      let addressId = wx.getStorageSync('addressId');
      if (addressId) {
          this.setData({
              nowAddress: wx.getStorageSync('addressId')
          });
      }
      else {
          this.setData({
              nowAddress: 0
          });
      }
  },
  addAddress: function() {
      wx.navigateTo({
          url: '../u_newaddress/u_newaddress?id=' + 0,
      })
  },
  onPullDownRefresh: function () {
      wx.showNavigationBarLoading()
      this.getAddresses();
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
  }
})