// pages/my/my.js.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiUrl:app.globalData.apiUrl,
    search_name:'',
    id:'',
    keyword:'',
    selectBook: true,
    author:[],
    size:5,
    current:1,

  },
  forSearchId:function(e){
    this.setData({
      search_name:e.detail.value
    })
    // this.getData()
  },
  ss:function(e){
        var that=this;
        wx.request({
          url:that.data.apiUrl+'book/title?size=1&current=1&title='+that.data.search_name,
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
              one:data[0]
            })
            var one = JSON.stringify(that.data.one)
             wx.navigateTo({
               url:"../home_content/details_search/details_search?one="+one
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
b_m(e){
  var index=e.detail.index 
  console.log(e.detail.index)
  this.setData({
    findex:index
  })
},
to_details(e){
  let findex=this.data.findex;
  wx.navigateTo({
    url: '../home_content/details_home/details_home?page=3&child_id=28&findex='+findex
 })  
},
//
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
  var size = that.data.size;
  var current=that.data.current;
  wx.request({
    url:that.data.apiUrl+'book/listSomeAll?size='+size+'&current='+current+'&BCategoryId=28',
    header:{
      "Accept": "*/*"
    },
    success: (res) => {
      var data=res.data.data;
      console.log(res.data)
      if(!data){
        wx.showToast({
          title: '无更多图书',
          icon: none,
        })
      }
      var book=[];
        var author=[];
        data.forEach(item=>{
          book.push(item[0]);
          author.push(item[1])
        })
        console.log(book);
        console.log(author);
      that.setData({
        one2:book,
        author:author
      })
    },
  })
},
  onLoad: function () {
   var that=this;
   var size=that.data.size;
   var current=that.data.current;
   wx.request({
    url:that.data.apiUrl+'book/listSomeAll?size='+size+'&current='+current+'&BCategoryId=28',
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
        one2:book,
        author:author
      })
    },
  })

  },
  //教材教辅页面

  to_jiaocaijiaofu(){
    var type=1;
    var mainindex=0;
    wx.navigateTo({
      url: '../../page/home_content/some_fenlei/some_fenlei?type='+type+'&mainindex='+mainindex
    })
  },
  to_search(){
    wx.navigateTo({
      url: '../../page/home_content/search/search'
    })
  },  
  //文学页面
  to_wenxue(){
    var type=2;
    var mainindex=0;
    wx.navigateTo({
      url: '../../page/home_content/some_fenlei/some_fenlei?type='+type+'&mainindex='+mainindex
    })
  },
  //笔记页面
  to_biji(){
    var type=3;
    var mainindex=0;
    wx.navigateTo({
      url: '../../page/home_content/some_fenlei/some_fenlei?type='+type+'&mainindex='+mainindex
    })
  },
  //热搜图书页面
  to_book(){
    wx.navigateTo({
      url: '../../page/home_content/hot_search/hot_search'
    })
  },
  to_active(){
    wx.navigateTo({
      url: '../../page/home_content/active/active'
    })
  },
  to_jifen(){
    wx.navigateTo({
      url: '../../page/home_content/xuanchuan/xuanchuan'
    })
  },
  //全部分类页面
  nav_quanbufenlei(){
    wx.navigateTo({
      url: "../../page/home_content/all_fenlei/all_fenlei"
    })
  }
})