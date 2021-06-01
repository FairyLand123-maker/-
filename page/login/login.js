// page/login/login.js
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
				backurl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  },
  formName:function(e){
    this.setData({
      telphone:e.detail.value
    })
  },
  formPass:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  tohome(){ 
    if(!this.data.check.telphone(this.data.telphone)){return;}
    if(!this.data.check.password(this.data.password)){return;}
    var that=this;
    var password=JSON.stringify(that.data.password);
    var phone=JSON.stringify(that.data.telphone);
    // console.log(phone,password);
    wx.login({        //这一步先获取code
      success: function (res) {
      that.setData({
      code:res.code
      })
      console.log("code是："+that.data.code)
    wx.request({
      method: "post",
      // url:that.data.apiUrl+'user/login?phone='+that.data.telphone+'&password='+that.data.password,
      url:that.data.apiUrl+'user/login',
      data:{
        "password": that.data.password,
        "phone": that.data.telphone,
      },
      dataType:"json",
      header: {
        'content-type': 'application/json' ,// 默认值
        'code': res.code
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
          that.setData({
            resmsg:res,
            token:res.data.data.token,
            code:res.data.code 
            })
            wx.getStorage({
              key: 'token',
              success:function(res){
              that.setData({
                token1:res.data
              })
            }
          })
          wx.setStorage({//缓存tok
            data: that.data.token,
            key: 'token',
            
            success:function(res){
            console.log("数据缓存成功"+that.data.token) 
            }
            })
            wx.setStorageSync('token', that.data.token)
          console.log(that.data.token)
          setTimeout(function(){
            wx.switchTab({
              url: '../../page/home/home',
            }) 
            },1500)
           
            }
          
    }
  })
},
})
},
  tozhuce(){
    wx.navigateTo({
      url: '../zhuce/zhuce',
    })
  },  
})