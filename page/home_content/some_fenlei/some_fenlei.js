var app=getApp();// pages/details/details.js
const api = require("../../../config/api");
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
    type1:true,
    type2:false,
    type3:false,
    page:1,
    size:5,

    cateid:'',//右侧滚动到的cate的id
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cateid=options.mainindex;
    this.setData({
      type:options.type,
      page:options.page,//categoryId
      child_id:options.child_id,//id
      mainindex:options.mainindex,
      cateid:'cate'+cateid,
      cate:'cate'+cateid
    })
    if(this.data.type==1){
     this.setData({
      type1:true,
      type2:false,
      type3:false,
      page:1
     })
    }
    if(this.data.type==2){
      this.setData({
       type2:true,
       type1:false,
       type3:false,
       page:2
      })
     }
     if(this.data.type==3){
      this.setData({
       type3:true,
       type2:false,
       type1:false,
       page:3
      })
     }
    var that=this;
    wx.request({
      url: that.data.apiUrl+'category/listBook?categoryId=1',
      data:{
        "categoryId":1,
      },
      dataType:"json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:'POST',
      success: (res) => {
        var data=res.data.data;
        console.log(res)
        that.setData({
          one0:data
        })
      },
    })
    wx.request({
      url: that.data.apiUrl+'category/listBook?categoryId=2',
      data:{
        "categoryId":2
      },
      dataType:"json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:'POST',

      success: (res) => {
        var data=res.data.data;
        console.log(res)
        that.setData({
          one1:data
        })
      },
    })
    wx.request({
      url: that.data.apiUrl+'category/listBook?categoryId=3',
      data:{
        "categoryId":3,
      },
      dataType:"json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:'POST',
     
      success: (res) => {
        var data=res.data.data;
        console.log(res)
        that.setData({
          one2:data
        })
      },
    })
    wx.request({
      url: that.data.apiUrl+'category/listBook',
      method: "POST",
      header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
      success:function(res_next){
        var right_list=res_next.data.data;
        console.log(res_next)
        that.setData({
          rightList:right_list
        })
      }
    })
    that.set();
    },
  tosomeone(e){
      var index=e.currentTarget.dataset.index;
      var id=e.currentTarget.id;
      console.log(e)
      var now=index+1;
      this.setData({
        child_id:now
      })
      this.set();
  },
  onReachBottom: function () {
  var now=this.data.current_num;
   now=now+1;
   var length=this.data.size*now;
   console.log(now)
  this.setData({
    size:length,
    now:now
  })
  },
  set(){
    var that=this;
    wx.request({
      //固定分页长度为size
      url:that.data.apiUrl+'book/listSomeAll',
      data:{
        "size":that.data.size,
        "current":that.data.current_num,
        "BCategoryId": that.data.child_id,
      },
      dataType:"json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res)
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
          one:book
        })
      },
    })
  
  },
  //
  tosomeone2(e){
    var index=e.currentTarget.dataset.index;
    var id=e.currentTarget.id;
    console.log(e)
    var now=index+17;
    this.setData({
      child_id:now
    })
    this.set();
},
tosomeone3(e){
  var index=e.currentTarget.dataset.index;
  var id=e.currentTarget.id;
  console.log(e)
  var now=index+27;
  this.setData({
    child_id:now
  })
  this.set();
},
  origin(){
    this.setData({
      open0:true,
      open1:false,
      open2:false
    })
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
    wx.navigateTo({
      url: '../../home_content/details_home/details_home?page='+page+'&child_id='+child_id+'&findex='+findex
   })  
  },
  shang_price(){
    var arr=[];
    var n1=this.data.child_id-1;
    var t1=this.data.one0[n1];
    console.log(t1.childs[0].price)
    if(0==(this.data.page-1)||0==(this.data.type-1)){
          this.data.one0[n1].childs.forEach((item,j)=>{
              arr.push(this.data.one0[n1].childs[j].price);
              this.setData({
                newList0:arr
              }) 
           })
           this.one()
           var ls0=this.data.one0[this.data.child_id-1].childs;
    this.setData({
      open1:true,
      open0:false,
      list:this.data.list,
    })
    }
   
//第二页
    if(1==(this.data.page-1)||1==(this.data.type-1)){
      this.data.one1[n1].childs.forEach((item,j)=>{
          arr.push(this.data.one1[n1].childs[j].price);
          this.setData({
            newList1:arr
          }) 
       })
       this.two()
       var ls1=this.data.one1[this.data.child_id-1].childs;
this.setData({
  open1:true,
  open0:false,
  list:this.data.list,
})
}

//第三页
if(2==(this.data.page-1)||2==(this.data.type-1)){
  this.data.one2[n1].childs.forEach((item,j)=>{
      arr.push(this.data.one2[n1].childs[j].price);
      this.setData({
        newList2:arr
      }) 
   })
   this.three()
   var ls2=this.data.one2[this.data.child_id-1].childs;
this.setData({
open1:true,
open0:false,
list:this.data.list,
})
}

  },
  one(){
    var arr=[];
    var n1=this.data.child_id-1;
    var t1=this.data.one0[n1];
    for(var i=0;i<this.data.newList0.length;i++){
     for(var j=i+1;j<this.data.newList0.length;j++){
      if(this.data.newList0[i]<this.data.newList0[j]){
        var temp =this.data.one0[n1].childs[j];
        this.data.one0[n1].childs[j]=this.data.one0[n1].childs[i];
       this.data.one0[n1].childs[i]=temp; 
       }  
     }
     var list= this.data.one0[n1].childs;
     this.setData({
       list:list
     })
   }
},
two(){
  var arr=[];
  var n1=this.data.child_id-1;
  for(var i=0;i<this.data.newList1.length;i++){
   for(var j=i+1;j<this.data.newList1.length;j++){
    if(this.data.newList1[i]<this.data.newList1[j]){
      var temp =this.data.one1[n1].childs[j];
      this.data.one1[n1].childs[j]=this.data.one1[n1].childs[i];
     this.data.one1[n1].childs[i]=temp; 
     }  
   }
   var list1= this.data.one1[n1].childs;
   this.setData({
     list:list1
   })
 }
},
three(){
  var arr=[];
  var n1=this.data.child_id-1;
  for(var i=0;i<this.data.newList2.length;i++){
   for(var j=i+1;j<this.data.newList2.length;j++){
    if(this.data.newList2[i]<this.data.newList2[j]){
      var temp =this.data.one2[n1].childs[j];
      this.data.one2[n1].childs[j]=this.data.one2[n1].childs[i];
     this.data.one2[n1].childs[i]=temp; 
     }  
   }
   var list2= this.data.one2[n1].childs;
   this.setData({
     list:list2
   })
 }
},

//下降
xia_price(){
  var arr=[];
  var n1=this.data.child_id-1;
  if(0==(this.data.page-1)||0==(this.data.type-1)){
        this.data.one0[n1].childs.forEach((item,j)=>{
            arr.push(this.data.one0[n1].childs[j].price);
            this.setData({
              newList0:arr
            }) 
         })
         this.xia_one()
  }
 var ls0=this.data.one0[this.data.child_id-1].childs;
  this.setData({
    open1:false,
    open0:false,
    open2:true,
    ls0:this.data.list,
  })
//第二页
  if(1==(this.data.page-1)||1==(this.data.type-1)){
    this.data.one1[n1].childs.forEach((item,j)=>{
        arr.push(this.data.one1[n1].childs[j].price);
        this.setData({
          newList1:arr
        }) 
     })
     this.xia_two()
}
var ls1=this.data.one1[this.data.child_id-1].childs;
this.setData({
  open1:false,
  open0:false,
  open2:true,
ls1:this.data.list,
})
//第三页
if(2==(this.data.page-1)||2==(this.data.type-1)){
this.data.one2[n1].childs.forEach((item,j)=>{
    arr.push(this.data.one2[n1].childs[j].price);
    this.setData({
      newList2:arr
    }) 
 })
 this.xia_three()
}
var ls2=this.data.one2[this.data.child_id-1].childs;
this.setData({
  open1:false,
  open0:false,
  open2:true,
ls2:this.data.list,
})
},
xia_one(){
  var arr=[];
  var n1=this.data.child_id-1;
  var t1=this.data.one0[n1];
  for(var i=0;i<this.data.newList0.length;i++){
   for(var j=i+1;j<this.data.newList0.length;j++){
    if(this.data.newList0[i]>this.data.newList0[j]){
      var temp =this.data.one0[n1].childs[j];
      this.data.one0[n1].childs[j]=this.data.one0[n1].childs[i];
     this.data.one0[n1].childs[i]=temp; 
     }  
   }
   var list= this.data.one0[n1].childs;
   this.setData({
     list:list
   })
 }
},
xia_two(){
var arr=[];
var n1=this.data.child_id-1;
for(var i=0;i<this.data.newList1.length;i++){
 for(var j=i+1;j<this.data.newList1.length;j++){
  if(this.data.newList1[i]>this.data.newList1[j]){
    var temp =this.data.one1[n1].childs[j];
    this.data.one1[n1].childs[j]=this.data.one1[n1].childs[i];
   this.data.one1[n1].childs[i]=temp; 
   }  
 }
 var list1= this.data.one1[n1].childs;
 this.setData({
   list:list1
 })
}
},
xia_three(){
var arr=[];
var n1=this.data.child_id-1;
for(var i=0;i<this.data.newList2.length;i++){
 for(var j=i+1;j<this.data.newList2.length;j++){
  if(this.data.newList2[i]>this.data.newList2[j]){
    var temp =this.data.one2[n1].childs[j];
    this.data.one2[n1].childs[j]=this.data.one2[n1].childs[i];
   this.data.one2[n1].childs[i]=temp; 
   }  
 }
 var list2= this.data.one2[n1].childs;
 this.setData({
   list:list2
 })
}
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