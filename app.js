App({
  onLaunch: function () {
    console.log('小程序启动了')
    wx.cloud.init({
      env:'cloud1-1glvvabu93db19e9'
    })
    let user_account=''
    let carts_=[{}]
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false
  }
})
