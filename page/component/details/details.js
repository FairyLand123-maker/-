// page/component/details/details.js
const api = require("../../../config/api");
Page({
  data:{
    goods: [],
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },
  onLoad:function(options){
    let goods=this.data.goods;
    let bookId=options.bookId;
    let index=options.index;
    wx.request({
      url: api.GoodsDetail+'/'+bookId,
      method:'POST',
      header:{
        'Content-type':'application/json',
        'token':wx.getStorageSync('token')
      },
      success:res=>{
        console.log(res.data.data);
        goods=res.data.data||[];
        this.setData({
          goods:goods
        })
      }
    })
  },
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },
  minsCount() {
    let num = this.data.num;
    if(num==1){return false;}
    else{num--;}
    this.setData({
      num : num
    })
  },
  addToCart(e) {
    console.log(e);
    // let bookId=e.currentTarget.dataset.bookId;
    var bookId=this.data.goods.id;
    console.log(bookId);
    const self = this;
    const num = self.data.num;
    let total = self.data.totalNum;
    wx.request({
      url: api.CartAdd+'/'+bookId,
      method:'POST',
      header:{
        'Content-type':'application/json',
        'token':wx.getStorageSync('token')
      },
      success:res=>{
        console.log(res.data.data);
        console.log('加入购物车成功');
      }
    })
    self.setData({
      show: true
    })
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)

  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
 
})