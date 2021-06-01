// page/component/information/information.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thumb:'',
    apiUrl:app.globalData.apiUrl,
    email:'',
      nickname:''

  },
  formName:function(e){
    this.setData({
      nickname:e.detail.value
    })
    var that=this;
    wx.getStorage({
      key: 'nickname',
      success:function(res){
        console.log(res)
      that.setData({
        nickname:res.data
      })
    }
  })
  wx.setStorage({//缓存tok
    data: that.data.nickname,
    key: 'nickname', 
    success:function(res){
    console.log("数据缓存成功"+that.data.nickname) 
    }
    })
    wx.setStorageSync('nickname', that.data.nickname)
    //nickname

  },
  // form_signature:function(e){
  //   this.setData({
  //     signature:e.detail.value
  //   })
  // },
  form_email:function(e){
    this.setData({
      email:e.detail.value
    })
  },
  add_img(){
    var that=this;
    var img=[];
    var avatar = 'infor.avatar';
    wx.chooseImage({
      success:function(res){
        count: 10,
        console.log(res.tempFilePaths);
        that.setData({
          add:true,
          image:res.tempFilePaths[0],
          [avatar]:res.tempFilePaths[0]
        })
        wx.getStorage({
          key: 'image',
          success:function(res){
            console.log(res)
          that.setData({
            image:res.data
          })
        }
      })
      wx.setStorage({//缓存tok
        data: that.data.image,
        key: 'image', 
        success:function(res){
        console.log("数据缓存成功"+that.data.image) 
        }
        })
        wx.setStorageSync('image', that.data.image)
      }
    })
  },
  
  right(e){
    var n = 'infor.nickname';
    var e = 'infor.email';
    this.setData({
      [n]:this.data.nickname,
      [e]:this.data.email,
    })
     let token = wx.getStorageSync('token');
   var that=this;
   wx.request({
     method: "post",
     url:that.data.apiUrl+'user/modify',
     data:{
       "nickname": that.data.infor.nickname,
       "email": that.data.infor.email,
        "avatar": that.data.infor.avatar,
        "isStudent":that.data.infor.isStudent
     },
     dataType:"json",
     header: {
       'content-type': 'application/json' ,
       'token':token
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
        wx.showToast({
          title: res.data.msg,
          icon:'none'
      });

        //  wx.navigateTo({
        //    url: '../usernew/usernew?image='+that.data.infor.avatar+'&nickname='+that.data.infor.nickname
        //  })
        wx.switchTab({
          url: '../user/user'
        })
         } 
        }
   })
  },
  isright(e){
    console.log(e.currentTarget.dataset);
    var isStudent=this.data.infor.isStudent;
    var nickname=e.currentTarget.dataset.nickname;
    var email=e.currentTarget.dataset.email;
    wx.navigateTo({
      url: '../yanzheng/yanzheng?isStudent='+isStudent+'&nickname='+nickname+'&email='+email,
    })
  },
  onLoad: function (options) {
    var Student=options.isStudent;
    var nickname=options.nickname;
    var email=options.email;
    console.log(Student)
    if(!Student){
      this.setData({
        Student:0,
        email:email,
        nickname:nickname
      })
    }else{
      this.setData({
        Student:1,
        email:email,
        nickname:nickname
      })
    }

    
    let token = wx.getStorageSync('token');
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
          console.log(!data.avatar)
          if(!data.avatar){
            that.setData({
              add:false
            })
          }else{
            that.setData({
              add:true
            })
          }
          that.setData({
            infor:data
          })    
          } 
          that.next()
         }
       
    })
  
  },
  next(){
    var is = 'infor.isStudent';
    var ia = 'infor.nickname';
    var ie = 'infor.email';
    this.setData({
      [is]:this.data.Student,
      [ia]:this.data.nickname,
      [ie]:this.data.email
    })
  }
})