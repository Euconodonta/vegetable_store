Page({
onLoad(){
    // wx.cloud.database().collection('goods').get()
    // .then(res=>{//请求成功
    //     console.log('数据库请求成功',res.data)
    //     this.setData({
    //         list:res.data
    //     })
    // })
    // .catch(err=>{//请求失败
    //     console.log('数据库请求失败',err)
    // })
    wx.cloud.database().collection("goods")
    .orderBy("number",'asc')
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



    wx.cloud.database().collection("theme")
    // .orderBy("number",'asc')
    .get()
    .then(res =>{
        console.log('主题列别请求成功',res)
        this.setData({
            list1:res.data
        })
    })
    .catch(res =>{
        console.log('主题列别请求失败',res)
    })
  },
  golist1(e){
    wx.navigateTo({
      url:'/page/component/list/list?type=' + e.currentTarget.dataset.type
      // url: '/pages/demo1-1/demo1-1?id=' + e.currentTarget.dataset.id
    })
  },
  goDetail(e){
    console.log('点击跳转商品详情',e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/page/component/details/details?id=' + e.currentTarget.dataset.id,//跳页加传id值
    })
},
  data: {
    list:[],
    imgUrls: [
      '/image/background_1.png',
      '/image/background_2.png',
      '/image/background_3.png',
      '/image/background_4.png'
    ], 
     
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  }
})