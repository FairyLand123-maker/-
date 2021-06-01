// page/home_content/search/search.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiUrl:app.globalData.apiUrl,
    search_name:'',
    id:'',
    history:["沉默的大多数","大学物理","大学英语"],
    hotlist:["沉默的大多数","大学物理","大学英语","数字电子技术"],
    keyword:''
  },
  forSearchId:function(e){
    this.setData({
      search_name:e.detail.value
    })
    // this.getData()
  },

  onLoad: function (options) {

  },
  getData(){
    // var that=this;
    // wx.request({
    //   url:that.data.apiUrl+'book/title?size=1&current=1&title='+that.data.search_name,
    //   header:{
    //     "Accept": "*/*"
    //   },
    //   success: (res) => {
    //     var data=res.data.data;
    //     console.log(data)
    //     // var one=data[0];
    //     var data_id=data[0].id;
    //     var data_name=data[0].name;
    //     console.log(data_id)
    //     console.log(data_name)
    //     that.setData({
    //       id:data_id,
    //       one:data[0]
    //     })
    //   }
    // })
  },
  ss:function(e){
    this.setData({
          history:this.data.history.concat(this.data.search_name)
        })
        var that=this;
      //   wx.request({
      //     url:that.data.apiUrl+'book/title?size=1&current=1&title='+that.data.search_name,
      //     header:{
      //       "Accept": "*/*"
      //     },
      //     success: (res) => {
      //       var data=res.data.data;
      //       console.log(data)
      //       // var one=data[0];
      //       var data_id=data[0].id;
      //       var data_name=data[0].name;
      //       console.log(data_id)
      //       console.log(data_name)
      //       that.setData({
      //         id:data_id,
      //         one:data[0]
      //       })
      //       var one = JSON.stringify(that.data.one)
      //        wx.navigateTo({
			// 		     url:"../details_search/details_search?one="+one
			//    	})
      // }
      //   }) 
      //   //将对象转为string
      wx.request({
        url:that.data.apiUrl+'book/title?size=10&current=1&title='+that.data.search_name,
        header:{
          "Accept": "*/*"
        },
        success: (res) => {
          var data=res.data.data;
          console.log(data)
          // var one=data[0];
          var data_id=data[0].id;
          var data_name=data[0].name;
          console.log(data_id)
          console.log(data_name)
          that.setData({
            id:data_id,
            one:data
          })
          var one = JSON.stringify(that.data.one)
           wx.navigateTo({
             url:"../details_search_list/details_search_list?one="+one
         })
    }
      }) 
      //将对象转为string
      },
  search(){
    if(this.data.search_name==''){
      wx.showToast({
        title:"请输入关键字",
        icon:"none"
      })
      return;
    }
   
},
    
    // uni.navigateTo({
    //   url:"../list/list?keyword="+this.keyword
    // })

  /**
   * 生命周期函数--监听页面加载
   */
  

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