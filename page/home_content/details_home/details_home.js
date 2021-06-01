var app=getApp();// pages/details/details.js
const api = require("../../../config/api");
Page({

  /**
   * 页面的初始数据
   */

  data: {
    
    apiUrl:app.globalData.apiUrl,
    cateItems: app.globalData.cateItems,
    type:'',
    one:[],
    nick:[],
    goods: [],
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      type:options.type,
      page:options.page,
      child_id:options.child_id,
      mainindex:options.mainindex,
      findex:options.findex,
    })
    
    var thisone=[];
    var thistwo=[];
    var thisthree=[];
    var that=this;
    wx.request({
      //固定分页长度为size=6
      // url:  this.data.apiUrl+'book/listSomeAll?size=6&current='+this.data.current_num+'&BCategoryId='+this.data.child_id,
      url:that.data.apiUrl+'book/listSomeAll?size=5&current=1&BCategoryId='+that.data.child_id,
      header:{
        "Accept": "*/*"
      },
      success: (res) => {
        var data=res.data.data;
        var book=[];
        var author=[];
        data.forEach(item=>{
          book.push(item[0]);
          author.push(item[1])
        })
        console.log(book);
        console.log(author);
        that.setData({
          one:book,
          nick:author
        })
      },
    })
  },
//马上买--------------------------------
to_shopping(e) {
 
  // let bookId=e.currentTarget.dataset.bookId;
  var bookId=this.data.one[this.data.findex].id;
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
  //-------------------------------------
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  to_user(){
    wx.switchTab({
      url: '../../user/user',
    })
  },
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