// page/sell_content/sell_information/sell_information.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:[],
    add:false,
    note:[],
    add1:false,
    naw:0,
    apiUrl:app.globalData.apiUrl,
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    shows1: false, 
    shows2: false, 
    shows3: false, 
    selectDatas: ['教辅教材', '课外读物', '笔记资料'], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,
    category:1,//商品大类id
    categoryId:1,
    selectDatas_zilei1: ['能源学院', '管理学院', '理学院','艺术学院', '机械工程学院', '通信与信息工程学院','建筑与土木工程学院', '电气与控制工程学院', '测绘科学与技术学院','计算机科学与技术学院', '人文与社会科学院', '地质与环境科学学院','化学与化工学院', '材料科学与工程学院', '外国语学院','电子信息学院'], 
    indexs_zilei1:0,
    category_zilei1:1,
    selectDatas_zilei1: ['能源学院', '管理学院', '理学院','艺术学院', '机械工程学院', '通信与信息工程学院','建筑与土木工程学院', '电气与控制工程学院', '测绘科学与技术学院','计算机科学与技术学院', '人文与社会科学院', '地质与环境科学学院','化学与化工学院', '材料科学与工程学院', '外国语学院','电子信息学院'], 
    indexs_zilei1:0,
    category_zilei1:1,
    selectDatas_zilei2: ['小说', '传记', '文学','青春文学', '科幻', '惊悚','悬疑', '散文', '动漫','纪实'], 
    one:true,
    two:false,
    three:false,
    indexs_zilei2:0,
    category_zilei2:17,
    selectDatas_zilei3: ['大学课程', '外语考级', '资格考试','考研', '字典词典', '职业技能'], 
    indexs_zilei3:0,
    category_zilei3:27,
    bcategoryId:1,
  },
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let category = Indexs+1; //获取点击的下拉列表的下标
    console.log(Indexs)
    this.setData({
      indexs: Indexs,
      categoryId:category,
      shows: !this.data.shows
    });
    if(this.data.indexs==0){
      this.setData({
        one:true,
        two:false,
        three:false
      })
    }
    if(this.data.indexs==1){
      this.setData({
        one:false,
        two:true,
        three:false
      })
    }
    if(this.data.indexs==2){
      this.setData({
        one:false,
        two:false,
        three:true
      })
    }
  },
//1
selectTaps_zilei() {
  this.setData({
    shows1: !this.data.shows1,
  });
},
// 点击下拉列表
selectTaps_zilei_optionTaps(e) {
  let Indexs1 = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
  let category_zilei1 = Indexs1+this.data.category_zilei1; //获取点击的下拉列表的下标
  console.log(Indexs1)
  this.setData({
    indexs1: Indexs1,
    category_zilei1:category_zilei1,
    shows1: !this.data.shows1,
    bcategoryId:category_zilei1

  });
  
},
//2
selectTaps_zilei2() {
  this.setData({
    shows2: !this.data.shows2,
  });
},
// 点击下拉列表
selectTaps_zilei2_optionTaps(e) {
  let Indexs2 = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
  let category_zilei2 = Indexs2+this.data.category_zilei2; //获取点击的下拉列表的下标
  console.log(Indexs2)
  this.setData({
    indexs2: Indexs2,
    category_zilei2:category_zilei2,
    shows2: !this.data.shows2,
    bcategoryId:category_zilei2
  });
},
//3
selectTaps_zilei3() {
  this.setData({
    shows3: !this.data.shows3,
  });
},
// 点击下拉列表
selectTaps_zilei3_optionTaps(e) {
  let Indexs3 = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
  let category_zilei3 = Indexs3+this.data.category_zilei3; //获取点击的下拉列表的下标
  console.log(Indexs3)
  this.setData({
    indexs3: Indexs3,
    category_zilei3:category_zilei3,
    shows3: !this.data.shows3,
    bcategoryId:category_zilei3
  });
},
  add_img(){
    var that=this;
    var img=[];
    wx.chooseImage({
      success:function(res){
        count: 10,
        console.log(res.tempFilePaths);
        that.setData({
          image:that.data.image.concat(res.tempFilePaths),
          add:true
        })
      }
    })
  },
  upLoadAction(e){
    var that=this;
    wx.chooseMessageFile({
      count: 2,
      type:'file',
      success:function(res){
        count: 10,
        console.log(res.tempFiles[0].name);
        var naw=that.data.naw;
        var tempFilePaths=res.tempFiles[naw];
        var path=tempFilePaths.path;
        var name=tempFilePaths.name;
        var file=tempFilePaths.file;
        console.log(tempFilePaths)
        that.setData({
          note:that.data.note.concat(tempFilePaths.name),
          add1:true,
          path:path,
          name:name,
          file:file,
          naw:that.data.naw++
        })
        that.set();
      }
    })

 
  },
  set(){
    var that=this;
    var path=JSON.stringify(that.data.path);
    wx.request({
      method: "post",
      url:that.data.apiUrl+'file/upload',
      data:{
        "file": path,
        "name": that.data.name,
        "type":that.data.file
      },
      dataType:"json",
      header: {
        'content-type': 'multipart/form-data',
        'Accept': "*/*"
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code==888){
          wx.showToast({
              title: res.data.msg,
              icon:'none'
          });
        }
      }
    })
   
  },
  but_data(e){
  var a=0;
    let name=e.currentTarget.dataset.name;
    let author=e.currentTarget.dataset.author;
    let press=e.currentTarget.dataset.press;
    let appearence=e.currentTarget.dataset.appearence;
    let categoryId=this.data.categoryId;
    let bcategoryId=this.data.bcategoryId;
    let imgUrl=this.data.image;

    let path=this.data.path;
    let details=e.currentTarget.dataset.details;
    console.log(categoryId)
    console.log(bcategoryId)
    wx.navigateTo({

      url: '../price/price?name='+name+'&author='+author+'&press='+press+'&appearence='+appearence+'&categoryId='+categoryId+'&bcategoryId='+bcategoryId+'&imgUrl='+imgUrl+'&path='+path+'&details='+details
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imagecopy:this.data.image,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  formName:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  formAuthor:function(e){
    this.setData({
      author:e.detail.value
    })
  },
  formPress:function(e){
    this.setData({
      press:e.detail.value
    })
  },
  formAppearence:function(e){
    this.setData({
      appearence:e.detail.value
    })
  },
  formDetails:function(e){
    this.setData({
      details:e.detail.value
    })
  },
})