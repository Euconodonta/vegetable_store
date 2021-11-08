// page/component/orders/orders.js
Page({
  data:{
    address:{},
    hasAddress: false,
    total:0,
    orders:[]
  },

onLoad(){
  for (let index = 0; index < App.carts_.length; index++) {
    const element= App.carts_[index]
    console.log('element',element)
      this.data.orders=[...this.data.orders,{id:element.id,title:element.title,image:element.image,num:element.num,price:element.price}]
  }
  this.setData({
    orders:this.data.orders
  })
  this.getTotalPrice()
  console.log('orders',this.data.orders)
},
  onReady() {
    this.getTotalPrice();
  },
  
  
  onShow:function(){
    const self = this;
    wx.getStorage({
      key:'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
    console.log('orders',this.data.orders)
  },


  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },
  goDetail(e){
    console.log('点击跳转商品详情',e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/page/component/details/details?id=' + e.currentTarget.dataset.id,//跳页加传id值
    })
},


  toPay() {
    wx.showModal({
      title: '提示',
      content: '体验到此结束',
      text:'center',
      complete() {
        wx.switchTab({
          url: '/page/component/user/user'
        })
      }
    })
  }
})