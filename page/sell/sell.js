Page({
    data: {
        category: [],
        detail:[],
        curIndex: 0,
        isScroll: false,
        toView: 'guowei'
    },
    onLoad(){
      wx.request({
        url: 'http://www.jinlz.com/',
        header:{
          "Accept": "*/*"
        },
        success:function(res){
          console.log(res)
        }
      })
    },
    onReady(){
        var self = this;
        wx.request({
            url:'',
            success(res){
                self.setData({
                    detail : res.data
                })
            }
        });
        
    },
    switchTab(e){
      const self = this;
      this.setData({
        isScroll: true
      })
      setTimeout(function(){
        self.setData({
          toView: e.target.dataset.id,
          curIndex: e.target.dataset.index
        })
      },0)
      setTimeout(function () {
        self.setData({
          isScroll: false
        })
      },1)
        
    },
    details_input(){
      wx.navigateTo({
        url: '../../page/sell_content/sell_information/sell_information'
      })
    }
    
})