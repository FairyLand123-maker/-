// pages/someone_fenlei/someone_fenlei.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data:{
    apiUrl:app.globalData.apiUrl,
    list_cell:[],
    open0:true,
    open1:false,
    open2:false,
    mainindex:0,
    child_id:1,
    current_num:1,
    type:1,
    page:1,
    cateid:'',//右侧滚动到的cate的id
    cateItems: app.globalData.cateItems,
    type:'',
     one:[]
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that=this;
    var one = JSON.parse(options.one);
    // var one = (options.one);
    that.setData({
      one:one
    })
    console.log(one.id)
 
    },
  
    b_m(e){
      var index=e.detail.index 
      console.log(e.detail.index)
      this.setData({
        findex:index
      })
    },
  to_details(e){
    console.log(e.currentTarget.dataset)
    let page=e.currentTarget.dataset.page;
    let child_id=e.currentTarget.dataset.child_id;
    let findex=this.data.findex;
    let one=e.currentTarget.dataset.one;
    var thisone = JSON.stringify(one)
    wx.navigateTo({
      url: '../../home_content/details_search/details_search?one='+thisone+'&findex='+findex  })  
  },
  })