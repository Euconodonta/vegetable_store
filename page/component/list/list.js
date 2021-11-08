// page/component/list/list.js

Page({
  data:{
number:''
  },
  onLoad(options){
    // 页面初始化 options为页面跳转所带来的参数
    // this.setData({
    //   number:options
    // })
    console.log('options:',this.data.number)
      wx.cloud.database().collection("goods")
      .where({type:options.type})
      .get()
      .then(res =>{
          console.log('商品列别请求成功',res)
          this.setData({
              list:res.data
          })
      })
      .catch(res =>{
          console.log('商品列别请求失败',res)
      })
  },//
  goDetail(e){
    console.log('点击跳转商品详情',e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/page/component/details/details?id=' + e.currentTarget.dataset.id,//跳页加传id值
    })
},

  onReady:function(){
    // this.new()
    // 页面渲染完成
  },
  onShow:function(){
    // this.new()
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})