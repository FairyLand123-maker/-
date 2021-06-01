// page/zhuce/zhuce.js
const utilApi = require('../../utils/util.js')

var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check:{
      telphone(data){
        if(!(/^1[3456789]\d{9}$/.test(data))){
          wx.showToast({
            title:"手机格式有误",
            icon:"none"
          })
            return false; 
        }
        return true;
      },
      password(data){
        if(data.length<6){
          wx.showToast({
            title:"密码长度不能小于六位",
            icon:"none"
          })
          return false; 
        }
        return true;
      },
      code(data){
        if(data.length!=4){
          wx.showToast({
            title:"验证码长度不符",
            icon:"none"
          })
          return false; 
        }
        return true;
      },
      username(data){
        if(data==''){
          wx.showToast({
            title:"用户姓名不能为空",
            icon:"none"
          })
          return false; 
        }
        return true;
      },
      city(data){
        if(data==''||data=="请选择收货地址"){
          wx.showToast({
            title:"请选择收货地址",
            icon:"none"
          })
          return false; 
        }
        return true;
      },
      address(data){
        if(data==''){
          wx.showToast({
            title:"请输入详细地址",
            icon:"none"
          })
          return false; 
        }
        return true;
      }
    },
    apiUrl:app.globalData.apiUrl,
      telphone:'',
        password:'',
        code:'',
        codeTxt:"获取验证码",
				codeFlag:true,
				code:''
  },
  formTel:function(e){
    this.setData({
      telphone:e.detail.value
    })
  },

  formPass:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  forcode:function(e){
    this.setData({
      code:e.detail.value
    })
  },
    to_home(){
    if(!this.data.check.telphone(this.data.telphone)){return;}
		if(!this.data.check.password(this.data.password)){return;}
    if(!this.data.check.code(this.data.code)){return;}
    // let token = wx.getStorageSync('token');
    //console.log(token);
    // header['token'] = token;
    // header['Content-Type']="multipart/form-data";
   var that=this;
    var that=this;
    wx.request({
      method: "post",
      url:that.data.apiUrl+'user/regist?code='+that.data.code,
      data:{
        "password": that.data.password,
        "phone": that.data.telphone
      },
      dataType:"json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code==888){
          wx.showToast({
              title:'请输入正确验证码',
              icon:'none'
          });
        }
        else{
          // wx.setStorageSync('token',res.data.data.token)
          wx.navigateTo({
            url: '../login/login',
          })
            
          } 
         }
    })
  
  },
  todelu(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
    let header = {};

        wx.request({
          url:that.data.apiUrl+'user/getVerifiCode',
          header: {
            'content-type': 'application/json'
            　},
          responseType: 'arraybuffer',
          success:function(res){
            let url = 'data:image/png;base64,' + wx.arrayBufferToBase64(res.data);
            console.log("shengq")
            that.setData({
              imgUrl:url   
            })
            console.log(res.cookies[0])
            
             var header={};
    header['cookie'] = res.cookies[0];
    console.log(header);
            if(res.statusCode==200){
              wx.request({
                url:that.data.apiUrl+'user/Login_authentication',
                header:header,
                success: function (resa) {
                  console.log(resa)
                  that.setData({
                    signature:resa.data.data
                  })
                    }       
              })
            }
            
          }
        })
        
            
      },
  // 后台post请求

 
getV(){
  $(".img").prop('src','"Mcake/getV?a='+new Date().getTime());
},
fettxt(){
  var that=this;
  wx.request({
    url:that.data.apiUrl+'user/Login_authentication',
    header:{
      "Accept": "*/*",
      'cookie':cookie.data
    },
    success: function (res) {
      console.log(res)
  
        } 
       
  })
},
createQr:function(){
  var that=this;
  return new Promise((resolve, reject) => {
    let qrData = {
      width:225
    }
    wx.request({
      url:that.data.apiUrl+'user/getVerifiCode',
      data:qrData,
      method: 'GET',
      responseType: 'arraybuffer',
      success: function (res) {
        console.log(res)
        let base64 = wx.arrayBufferToBase64(res.data);
        resolve(base64)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
},
 
})