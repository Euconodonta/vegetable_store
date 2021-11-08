// page/component/new-pages/user/address/address.js
Page({
  data:{
    address:{
      name:'',
      phone:'',
      detail:''
    }
  },
  onLoad(){
    var self = this;
    wx.cloud.database().collection("yonghu")
    .doc(App.user_account)
    .get()
    .then(res =>{
        console.log('查询成功',res)
        this.setData({
            list:res.data
        })
        console.log('查询成功',this.data.list)
    })
    .catch(res =>{
        console.log('商品列别请求失败',res)
    })
    
    // wx.getStorage({
    //   key: 'address',
    //   success: function(res){
    //     self.setData({
    //       address : res.data
    //     })
    //   }
    // })
  },

  
  formSubmit(e){
    const value = e.detail.value;
    if (value.name && value.phone && value.detail){
      wx.setStorage({
        key: 'address',
        data: value,
        success(){
          wx.navigateBack();
        }
      })
    }else{
      wx.showModal({
        title:'提示',
        content:'请填写完整资料',
        showCancel:false
      })
    }
  }
})