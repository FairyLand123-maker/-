// page/component/new-pages/user/user.js
var app=getApp();
Page({
  data:{
    thumb:'',
    nickname:'',
    orders:[],
    hasAddress:false,
    address:{},
    apiUrl:app.globalData.apiUrl,
  },
  toOrderListTap: function(event) {
    let res = util.loginNow();
    if (res == true) {
        let showType = event.currentTarget.dataset.index;
        wx.setStorageSync('showType', showType);
        wx.navigateTo({
            url: '/page/component/orders-list/list?showType=' + showType,
        });
    }
  },
  onLoad: function (options) {
    var self = this;
    /**
     * 获取用户信息
     */
    let image1 = wx.getStorageSync('image');
    let nickname1 = wx.getStorageSync('nickname');
    let token = wx.getStorageSync('token');
    this.setData({
      add2:false,
      image1:image1,
      nickname1:nickname1
    })
    console.log(token);
     var that=this;
     wx.request({
      url:that.data.apiUrl+'user/list',
      header: {
        'content-type': 'application/json',
        'token':token // 默认值
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
        var data=res.data.data;
        console.log(res.data.data.phone)
        if(!data.avatar){
          that.setData({
            add:false
          })
        }else{
          that.setData({
            add:true
          })
        }
        if(!data.nickname){
          that.setData({
            add1:false
          })
        }else{
          that.setData({
            add1:true
          })
        }
        that.setData({
          infor:data
        }) 
        that.next()
       }
      }  
  })         

    wx.getUserInfo({
      success: function(res){
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    }),

    /**
     * 发起请求获取订单列表信息
     */
    wx.request({
      url: '',
      success(res){
        self.setData({
          orders: res.data
        })
      }
    })
  },
  next(){
    var is = 'infor.isStudent';
    this.setData({
      [is]:this.data.Student
    })
  },
  onShow(){
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  /**
   * 发起支付请求
   */
  yanzheng(){
    wx.navigateTo({
      url: '../yanzheng/yanzheng',
    })
  },
  payOrders(){
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res){
        console.log(res)
      },
      fail: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'<text>',
          showCancel: false
        })
      }
    })
  }
})