const api = require("../../config/api");

// page/component/orders/orders.js
Page({
  data:{
    address:{},
    addressId:'',
    hasAddress: false,
    total:0,
    orders:[]
  },
  onLoad:function(options){
    let orders=this.data.orders;
    wx.request({
      url: api.OrderList,
      method:'GET',
      header: {
        'token': wx.getStorageSync('token'),
        'Content-Type': 'application/json'
      },
      success:res=>{
          console.log(res.data.data);
          this.setData({
              orders:res.data.data,
          })
        this.getTotalPrice();
      }
    })
  },
  onReady() {
    this.getTotalPrice();
  },
  onShow:function(){
    const self = this;
    wx.getStorage({
      key:'address',
      success(res) {
        self.setData({
          address: res.data,
          addressId:res.data,
          hasAddress: true
        })
      }
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice(){
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].originPrice;
    }
    this.setData({
      total: total
    })
  },

  toPay() {
    wx.showModal({
      title: '提示',
      content: '支付系统还未开放',
      text:'center',
      complete() {
        wx.switchTab({
          url: '/page/user/user'
        })
      }
    })
  }
})