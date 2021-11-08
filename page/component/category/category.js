Page({
    data: {
        category: [
            {name:'最受欢迎',id:'popular'},
            {name:'老板推荐',id:'recommend'},
            {name:'应季蔬菜',id:'season'},
            {name:'清仓甩卖',id:'wasted'}
        ],
        list1:[],
        list2:[],
        list3:[],
        list4:[],
        detail:[],
        curIndex: 0,
        isScroll: false,
        toView: 'guowei'
    },
    onLoad(){
      wx.cloud.database().collection("goods")
      .get()
      .then(res =>{
          console.log('商品列别请求成功',res)
          // this.setData({
          //     list:res.data
          // })
          // console.log('数据库',this.data.list)
          this.getList1()
          this.getList2()
          this.getList3()
          this.getList4()

      })
      .catch(res =>{
          console.log('数据库请求失败',res)
      })
    },
    goDetail(e){
      console.log('点击跳转商品详情',e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/page/component/details/details?id=' + e.currentTarget.dataset.id,//跳页加传id值
      })
  },
    getList1(){
      wx.cloud.database().collection("goods")
      .where({最受欢迎:'是'})
      .get()
      .then(res =>{
          console.log('商品列别请求成功',res)
          this.setData({
            list1:res.data
          })
          console.log('最受欢迎',this.data.list1)
      })
      .catch(res =>{
          console.log('商品列别请求失败',res)
      })
  },
  getList2(){
    wx.cloud.database().collection("goods")
    .where({老板推荐:'是'})
    .get()
    .then(res =>{
        console.log('商品列别请求成功',res)
        this.setData({
          list2:res.data
        })
      console.log('老板推荐',this.data.list2)
    })
    .catch(res =>{
        console.log('商品列别请求失败',res)
    })
},
getList3(){
  wx.cloud.database().collection("goods")
  .where({应季蔬菜:'是'})
  .get()
  .then(res =>{
      console.log('商品列别请求成功',res)
      this.setData({
        list3:res.data
      })
    console.log('应季蔬菜',this.data.list3)
  })
  .catch(res =>{
      console.log('商品列别请求失败',res)
  })
},
getList4(){
  wx.cloud.database().collection("goods")
  .where({清仓甩卖:'是'})
  .get()
  .then(res =>{
      console.log('商品列别请求成功',res)
      this.setData({
        list4:res.data
      })
    console.log('清仓甩卖',this.data.list4)
  })
  .catch(res =>{
      console.log('商品列别请求失败',res)
  })
},
    onReady(){
        var self = this;
        wx.request({
            url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
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
        
    }
    
})