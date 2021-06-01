// pages/hot_search.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiUrl:app.globalData.apiUrl,
    cateItems: app.globalData.cateItems,
    hasList: false, // 列表是否有数据
    type:'',
    open0:true,
    open1:false,
    open2:false,
    one4_21:[],
    one:[],
    size:6,
    current:1,
    one_:[],
    main_in:3,
    selectBook: true,
  },
  // onShow: function () {
  //   var that = this;
  //   var hasList = that.data.hasList;
  //   this.getBookCartList()
  // },
  onReachBottom: function () {
    if (this.data.selectBook){
      var now=this.data.current;
   now=now+1;
   var length=this.data.size*now;
   console.log(now)
  this.setData({
    size:length,
    now:now
  })
      this.getBookCartList()
    }
  },
  getBookCartList(){
    var that=this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
    })
    var one = that.data.one;
    var size = that.data.size;
    var current=that.data.current;
    wx.request({
      url:that.data.apiUrl+'book/listSomeAll?size='+size+'&current='+current+'&BCategoryId=23',
      header:{
        "Accept": "*/*"
      },
      success: (res) => {
        var data=res.data.data;
        console.log(data);
        var now_l=[];
        console.log(data.length)
        console.log(res)
      that.setData({
        size:data.length
      })
        var book=[];
        var author=[];
        data.forEach(item=>{
          book.push(item[0]);
          author.push(item[1])
        })
        console.log(book);
        console.log(author);
        for(var i=3;i<book.length;i++){
          now_l.push(book[i])
        }
        that.setData({
          // one:data,
          // now_l:now_l
          one:book,
          now_l:now_l
        })
    
      }
    })
      },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:4,
      page:4
    })

    var that=this;
    var size=that.data.size;
    var current=that.data.current;
    wx.request({
      url:that.data.apiUrl+'book/listSomeAll?size='+size+'&current='+current+'&BCategoryId=23',
      header:{
        "Accept": "*/*"
      },
      success: (res) => {
        var data=res.data.data;
        console.log(data);
        var now_l=[];
        console.log(data.length)
        console.log(res)
     
        var book=[];
        var author=[];
        data.forEach(item=>{
          book.push(item[0]);
          author.push(item[1])
        })
        console.log(book);
        console.log(author);
        for(var i=3;i<book.length;i++){
          now_l.push(book[i])
        }
        that.setData({
          // one:data,
          // now_l:now_l
          one:book,
          now_l:now_l
        })
    
      },
    })
  var arr=[];
  this.data.one4_21.forEach((item,j)=>{
        arr.push(item.car_number);
        this.setData({
          newList1:arr
        }) 
      })
  var n1=this.data.child_id-1;
  for(var i=0;i<this.data.newList1.length;i++){
   for(var j=i+1;j<=this.data.newList1.length;j++){
    if(this.data.newList1[i]<this.data.newList1[j]){
      var temp =this.data.one4_21[j];
      this.data.one4_21[j]=this.data.one4_21[i];
     this.data.one4_21[i]=temp; 
     }  
   }
  }
  var one4_2= this.data.one4_21;
   this.setData({
    one4_2:one4_2
   })
  },
  b_m(e){
    var index=e.detail.index 
    console.log(e.detail.index)
    this.setData({
      findex:index+3
    })
  },
  to_details(e){
    console.log(e.currentTarget.dataset)
    let page=e.currentTarget.dataset.page;
    let child_id=e.currentTarget.dataset.child_id;
    let findex=this.data.findex;
    let one=e.currentTarget.dataset.one;
    wx.navigateTo({
      url: '../../home_content/details_home/details_home?page=3&child_id=23&findex='+findex
   })  
  },
  to_details2(e){
    console.log(e.currentTarget.dataset)
    let page=e.currentTarget.dataset.page;
    let child_id=e.currentTarget.dataset.child_id;
    let findex=this.data.findex;
    let one=e.currentTarget.dataset.one;
    wx.navigateTo({
      url: '../../home_content/details_home/details_home?page=3&child_id=23&findex=1'
   })  
  },
  to_details1(e){
    console.log(e.currentTarget.dataset)
    let page=e.currentTarget.dataset.page;
    let child_id=e.currentTarget.dataset.child_id;
    let findex=this.data.findex;
    let one=e.currentTarget.dataset.one;
    wx.navigateTo({
      url: '../../home_content/details_home/details_home?page=3&child_id=23&findex=0'
   })  
  },
  to_details3(e){
    console.log(e.currentTarget.dataset)
    let page=e.currentTarget.dataset.page;
    let child_id=e.currentTarget.dataset.child_id;
    let findex=this.data.findex;
    let one=e.currentTarget.dataset.one;
    wx.navigateTo({
      url: '../../home_content/details_home/details_home?page=3&child_id=23&findex=2'
   })  
  },
  
})