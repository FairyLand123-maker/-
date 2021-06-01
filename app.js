import CONSTANT from './utils/constant';
let baseURL=CONSTANT.API_URL;
App({
  onLaunch: function () {
    console.log('App Launch')
    this.request = require('./utils/util.js').request;
    this.util = require('./utils/util.js')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    apiUrl:'http://www.dreambook.icu:8088/',
    userInfo: null,
  }
})
