// page/component/login/login.js
let mima = ''
let account=''
Page({
    data:{
        loginer:{}
    },
    onLoad(){

            wx.cloud.database().collection("yonghu")
            .get()
            .then(res =>{
                console.log('用户请求成功',res)
                // this.setData({
                //     list:res.data
                // })
            })
            .catch(res =>{
                console.log('用户请求失败',res)
            })
    },  
    //获取用户输入的账号  
    getName(e){
      account= e.detail.value
        console.log(account)
    },
    //获取输入的密码
    // getPassword(e){
    //       mima= e.detail.mima
    //       console.log(mima)
    //   },
     //监听输入的密码
 usePasswordInp(e) {
    mima = e.detail.value;
           console.log(mima)
   },
    goZhuce(){
        console.log('点击跳转注册页')
        wx.navigateTo({
          url: '/page/component/zhuce/zhuce' ,//跳页加传id值
        })
    },
    Login(){

  //登录功能
   //校验账号
    if(account.length<4){
     wx.showToast({
      title: '账号至少4位',
       icon:"none"
    })
      return
    }
    //登录功能的实现
    wx.cloud.database().collection("yonghu")
        .where({Account:account})
          .get() 
          
            .then(res=>{
             if(res.data.length!=0){
            console.log("获取账号成功",res);
            //校验密码长度
            if(mima.length<4){
              wx.showToast({
              title: '密码至少4位',
                  icon:"none"
              })
              return
            }
            //校验密码是否等于数据库中的密码
          if(mima==res.data[0].password){
              console.log("登录成功",res);
              App.user_account=res.data[0]._id
              console.log("此时用户id",res.data[0]._id);
              console.log("此时用户idapp输出",App.user_account);
            //显示登录成功提示
              wx.showToast({
                title: '登录成功',
                icon:"success",
                duration:2000,
                  //提示1秒后自动跳转到首页
                  success:function(){

                    setTimeout(function(){
                      wx.switchTab({
                  url: '/page/component/index',
                    }) 
                  },500)
                  }
              })
          
              }else{
                console.log("密码不正确，登录失败");
              wx.showToast({
                title: '密码不正确',
                icon:"none"
              })
            }
          }

        else{
            console.log("用户名获取失败",err),
                  wx.showToast({
                    title: '用户名不存在,请您注册账号',
                   icon:"none"
          })
          }
        // })
        // }
        // })
            })
      .catch(err=>{
      console.log("获取账号失败",err);
      wx.showToast({
        title: '用户名不存在',
       icon:"none"
      })
   })



     }
        })
  // 


        

        
//         wx.request({
//         //  url: 'https://localhost:8180/exam/login',
//          data: {
//           username: account,
//           password: mima
//          },
//         //  header: {
//         //   'content-type': 'application/x-www-form-urlencoded' // 默认值
//         //  },
//          method: 'post',
//          success: function (res) {
//           wx.hideLoading();
//           wx.removeStorageSync('sessionid');
//         //   console.log('登录成功', res.data.data);
//     }
// })
// }

// }
// })