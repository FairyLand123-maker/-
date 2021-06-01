const api = require("../../../config/api");

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
    console.log(JSON.parse(options.bookCart));
    let orders=JSON.parse(options.bookCart);
    this.setData({
      bookId:orders.id,
      orders:orders,
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
  getTotalPrice() {
    let orders = this.data.orders;
    console.log(orders);
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].originPrice;
    }
    this.setData({
      total: total
    })
  },

  toPay() {
    let bookId=this.data.bookId;
    let addressId=this.data.addressId;
    wx.request({
      url: api.OrderAdd,
      method:'GET',
      header: {
        'token': wx.getStorageSync('token'),
        'Content-Type': 'application/json'
      },
      data:{
        addressId:'1388522995105968129',
        bookId:bookId
      },
      success:res=>{
        console.log('创建订单成功')
      }
    })
    wx.showModal({
      title: '提示',
      content: '支付系统还未开放',
      text:'center',
      complete() {
        wx.switchTab({
          url: '/page/cart/cart'
        })
      }
    })
  }
})