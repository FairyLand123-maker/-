// pages/all_fenlei/all_fenlei.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
    data: {
      apiUrl:app.globalData.apiUrl,
      search_name:'',
      id:'',
      keyword:'',
    current:0,//当前左侧按钮的index
      mainCurrent:0,//当前点击的左侧按钮index
      scrollTop:0,//距离顶部高度
      arr:[],//共3个，为左侧各项的子项长度
      toView:"",//滚动到那个cate+index的右侧分类
      cateid:'',//右侧滚动到的cate的id
      one:[],
      two:[],
      three:[],
      rectInfo:[]
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
               url:"../../home_content/details_search/details_search?one="+one
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
  onLoad: function (options) {   
    var that=this;
    var address=[];
    wx.request({
      url: this.data.apiUrl+'category/listAll',
      header:{
        "Accept": "*/*"
      },
      success:function(res){
        var left_list=res.data.data;
        that.setData({
          leftList:left_list
        })
      }
    })
    wx.request({
      url: this.data.apiUrl+'category/listBook',
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
  },
//选择左侧按钮
menuTab(e){
  var index=e.currentTarget.dataset.index;
  this.setData({
    current:index,
    mainCurrent:index,
    toView:'cate'+index,
    cateid:'cate'+index
  })
  this.getRectInfo();
},
 //右侧滚动
 rightScroll(e){
  var scrollTop=e.detail.scrollTop;
  console.log(scrollTop)
  var num0=this.data.arr[0];
  var num1=this.data.arr[1];
  var num2=this.data.arr[2];
  var num;
  var height=this.data.one[0].height;
  if(scrollTop>=0 && scrollTop*height*num0<this.data.one[num0-1].bottom-76){
    num=this.data.one[0];
    this.setData({
      current:0
    })
    }
  if(scrollTop>=this.data.two[0].top-76 && scrollTop*height*num1<this.data.two[num1-1].bottom-76){
    num=this.data.two[0];
    this.setData({
      current:1
    })
  }
  if(scrollTop>=this.data.three[0].top-76 && scrollTop*height*num3<this.data.three[num2-1].bottom-76){
    num=this.data.three[0];
    this.setData({
      current:2
    })
  }
},
//获取矩形信息
getRectInfo(){
  var top=0;
  var bottom=0;
  var temp=0;
  for(let i=0;i<this.data.leftList.length;i++)
  {
    let view = wx.createSelectorQuery().in(this).selectViewport("#cate"+i);
    console.log(view.scrollOffset());
    view.fields({
      size: true,
      scrollOffset:true,
      rect: true
    }, data=>{	
      top=temp;
      bottom=top+data.height
      temp+=data.height;
      this.data.rectInfo[i]={'top':top,"bottom":bottom} 
    }).exec();
  }
  var thisone=[];
  var thistwo=[];
  var thisthree=[];
  var o=this.data.arr[0];
  var w=this.data.arr[1];
  var t=this.data.arr[2];
  var s=[];
  const query = wx.createSelectorQuery()
  query.selectAll('.category_name').boundingClientRect()
  query.exec(function(res) {
    for(var a=0;a<o;a++){
      thisone[a]=(res[0].slice(0,o))[a];
    }
    for(var b=0;b<w;b++){
      thistwo[b]=(res[0].slice(o,w+o))[b];
    }
    for(var c=0;c<t;c++){
      thisthree[c]=(res[0].slice(w+o,w+o+t))[c];
    } 
  })
  this.setData({
    one:thisone,
    two:thistwo,
    three:thisthree
  })
  var before=0;
  var thisarr=[];
  for(var i=0;i<this.data.leftList.length;i++){
    this.data.rightList.forEach(item=>{
      if(item.categoryId==i+1)
      {
        for(var j=i-1;j>-1;j--){
          before+=thisarr[j];
        }
        console.log(before);
        thisarr[i]=item.id-before;
      }
        before=0;
    })
    this.setData({
      arr:thisarr
    })
  } 
},
//按右侧子项去往下一项的页面
tosome_index(e){
  console.log(e.currentTarget)
  let type=e.currentTarget.dataset.type;
  let mainindex=e.currentTarget.dataset.mainindex;
  wx.navigateTo({
    url: '../../home_content/some_fenlei/some_fenlei?type='+type+'&mainindex='+mainindex
 })  
},
nav_to_some(e){
  let page=e.currentTarget.dataset.page;
  let child_id=e.currentTarget.dataset.child_id;
  let mainindex=e.currentTarget.dataset.mainindex;
  wx.navigateTo({
    url: '../../home_content/some_fenlei/some_fenlei?page='+page+'&child_id='+child_id+'&mainindex='+mainindex
  })
}
})
