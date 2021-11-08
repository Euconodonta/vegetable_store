// index.js
// 获取应用实例
const app = getApp()
let account='';
let password1='';
let password2='';
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
    //获取用户输入的商品名
    getNAccount(e){
      account= e.detail.value
      console.log(account)
  },
  //获取用户输入的商品价格
  getPs1(e){
      password1=e.detail.value
      console.log(password1)
  },
  getPs2(e){
    password2=e.detail.value
    console.log(password2)
},
  zhuce(){
    console.log('账号',account)
    console.log('密码1',password1)
    console.log('密码2',password2)

    if(account.length<4){
        wx.showToast({
            icon:'none',
          title: '账户至少为四位'
        })
    }
    else if(account.length>=4){
      wx.cloud.database().collection('yonghu')
      .where({Account:account})
      .get()
      .then(res=>{
        if(res.data.length!=0){
            console.log('账户是不新的',res)
            wx.showToast({
              icon:'none',
            title: '该账户已注册'
          })
        }
        if(res.data.length==0){
          if(password1.length<4){
              wx.showToast({
                  icon:'none',
                title: '密码长度少于四位'
              })
          }
          if(password1!=password2){
            wx.showToast({
              icon:'none',
            title: '两次密码不一致'
          })
          }
            if(password1==password2&&password1.length>=4){
              console.log(1234567890)
                  this.addaccount()
              }
     }
     
    })
    
      .catch(err=>{
          console.log('是新的1234', err)
      })
    }
    
 },
 addaccount(){
  wx.cloud.database().collection('yonghu')
  .add({
      data:{
          Account:account,
          password:password1,
          cart:[],
          address:{},
          ordered:[],
          tel:0,
          cartnum:0,
          name:''
      }
  }) 
  .then(res=>{
      console.log('添加成功',res)
      wx.showToast({
        title: '注册成功',
        icon:"success",
        duration:2000,
          //提示1秒后自动跳转到首页
          success:function(){
            setTimeout(function(){
              wx.navigateTo({
          url: '/page/component/login/login',
            }) 
          },500)
          }
      })

  })
  .catch(err=>{
      console.log('添加失败',err)
      wx.showToast({
        icon:'none',
      title: '注册失败'
    })
  })
 },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
