// page/yanzheng/yanzheng.js
var app=getApp();

// page/student_check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiUrl:app.globalData.apiUrl,
    userName:'',
    nickname:'',
    email:'',
    sno:'',
    faculty:'',
    school:''
  },
  onLoad: function (options) {
    var isStudent=options.isStudent;
    var nickname=options.nickname;
    var email=options.email;
    this.setData({
      isStudent:isStudent,
      email:email,
      nickname:nickname
    })
  },
  form_userName:function(e){
    this.setData({
      userName:e.detail.value
    })
  },
  form_sno:function(e){
    this.setData({
      sno:e.detail.value
    })
  },
  form_school:function(e){
    this.setData({
      school:e.detail.value
    })
  },
  form_faculty:function(e){
    this.setData({
      faculty:e.detail.value
    })
  },
  formSubmit:function(e){  
    console.log(e.detail.value);  
    let token = wx.getStorageSync('token');
    console.log(token);
     var that=this;
    wx.request({  
      url: that.data.apiUrl+'real/add',  
      method: "post",
      data: {  
        userName:that.data.userName,
        sno:that.data.sno,
        school:that.data.school,
        faculty:that.data.faculty  
      },  
      dataType:"json",
      header: {  
        'content-type': 'application/json',
        'token':token 
      },  
      success: function (res) {  
        console.log(res.data);
        if((!that.data.userName)&&(!that.data.school)&&(!that.data.sno)&&(!that.data.faculty)){
          wx.showToast({
            title: '请补充完善信息',
            icon: 'none',
            duration: 2000
          })
        }
      else{
        that.setData({
          isStudent:1
        })
        var isStudent=that.data.isStudent;
        var nickname=that.data.nickname;
        var email=that.data.email;
        wx.navigateTo({
            url: '../u_infor/u_infor?isStudent='+isStudent+'&nickname='+nickname+'&email='+email,
        })
      }
        
      }    
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 var isStudent=options.isStudent;
 this.setData({
  isStudent:isStudent
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