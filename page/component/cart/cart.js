// page/component/new-pages/cart/cart.js
// let carts1=[];
Page({
  data: {

    veid:[],
    list:[],
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    selectAllStatus:true,    // 全选状态，默认全选
    obj:{
        name:"hello"
    }
  },

  
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  del(id){
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
for (let index = 0; index < this.data.list.length; index++) {
  const element = this.data.list[index];
  console.log('element',element)
  if(element[0]==id){
    this.data.list.splice(index,1)
  }
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
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    const id=e.currentTarget.dataset.id
    let carts = this.data.carts;
    carts.splice(index,1);
    this.setData({
      carts: this.data.carts
    });
    this.del(id)
    if(!carts.length){
      this.setData({
        hasList: false
      });
    }else{
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    const id= e.currentTarget.dataset.id;
  
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    // console.log.(id)
    this.change(id,carts[index].num);
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  onShow() {
    wx.cloud.database().collection("yonghu")
    .doc(App.user_account)
    .get()
    .then(res =>{
        console.log('用户请求成功',res)
        this.setData({
            list:res.data.cart
        })
console.log('商品列list:{{index}}',this.data.list)
if(this.data.list.length==0){
  this.setData({
    hasList:false,  
  })
}
else{
  this.new()
  this.setData({
     hasList: true,
    //  carts:this.data.carts
  })
}
              })//第一个then
.catch(res =>{
    console.log('商品列别请求失败',res)
})
console.log(this.data.carts);
    this.getTotalPrice();
  },
  new(){   this.data.carts=[]
    for (let index = 0; index < this.data.list.length; index++) {
  const element = this.data.list[index];
  console.log('element',element)
  this.data.veid[index]=element[0]
  console.log('veid',this.data.veid[index])
                   wx.cloud.database().collection("goods")
                    .doc(this.data.veid[index])
                    .get()
                    .then(res =>{
                        console.log('商品详情请求成功',res)
                        this.setData({
                       carts:[...this.data.carts,{id:res.data._id,title:res.data.name,image:res.data.image,num:this.data.list[index][1],price:res.data.price,selected:true}],
                      //  hasList:true,  
                        })
                        this.getTotalPrice()
                        console.log('购物车carts',this.data.carts)
                      })
                      .catch(err =>{
                        console.log('商品列别请求失败',err)
                    })
                }//for循环的
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    const id= e.currentTarget.dataset.id;
    let carts = this.data.carts;
    let num = carts[index].num;
    if(num> 1){
    num = num - 1;
    carts[index].num = num;
   this.change(id,num-1)
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  }
  },
//加减事件
order(){
  App.carts_=this.data.carts
  console.log('carts_',App.carts_)
},
change(id,number){
  console.log('iddidiididid',id)
      console.log('list列表',this.data.list)
      // var flag = 1
for (let index = 0; index < this.data.list.length; index++) {
  const element = this.data.list[index];
  console.log('element',element)
  if(element[0]==id){
    element[1]=number
    // flag=0;
this.data.list[index]=element
  }
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
  // })
  // .catch(res=>{
  //     console.error('连接失败',res)
  // })
},

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    console.log('carts的长度',carts.length)
    for(let i = 0; i<carts.length; i++) {         // 循环列表得到每个数据
      if(carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });

  }

})