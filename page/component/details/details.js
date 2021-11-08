// page/component/details/details.js

Page({

  onLoad(options){
    console.log('列表携带的值',options)
    wx.cloud.database().collection('goods')
    .doc(options.id)
    .get()
    .then(res =>{
      console.log('商品详情页请求成功',res)
      this.setData({
        goods:res.data
      })
    })
    .catch(err =>{
      console.log('数据库请求失败',err)
    })
  },
  data:{
    goods:{},
    list:{},

    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },
      //跳转到商品详情页
      goCart(e){
        // id=e.currentTarget.dataset.id
        console.log('点击跳转购物车,商品id：',e.currentTarget.dataset.id)
        console.log('商品数量',this.data.totalNum)
        wx.switchTab({
          url:'/page/component/cart/cart' 
        })
    },

  addCount() {
    let num = this.data.num
    num++,
    this.setData({
      num : num
    })
  },
  

  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;
    self.setData({
      show: true
    })
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)
    wx.cloud.database().collection('yonghu')
    .doc(App.user_account)//要修改数据的_id
    // .where({Account:this.data.goods._id})
    .get()
    .then(res=>{
      console.log('查询到了',res)
      this.setData({
        list:res.data.cart
      })
      console.log('list列表',this.data.list)
      var flag = 1
for (let index = 0; index < this.data.list.length; index++) {
  const element = this.data.list[index];
  console.log('element',element)
  if(element[0]==this.data.goods._id){
    element[1]=element[1]+this.data.num
    flag=0;
  }
}
  if(flag==1){
    let element=[]
    element[0]=this.data.goods._id
    element[1]=this.data.num
    this.data.list[this.data.list.length]=element
  }
  console.log('list更新后的数据',this.data.list)
  wx.cloud.database().collection('yonghu')
        .doc(App.user_account)//要修改数据的_id
        .update({
            data:{
                cart:this.data.list
            }
        }).then(res=>{
            console.log('修改成功',res)
        })
        .catch(res=>{
            console.error('修改失败',res)
        })
  })
  .catch(res=>{
      console.error('连接失败',res)
  })
               
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
 
})