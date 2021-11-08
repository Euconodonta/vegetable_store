let timeId = null;
Page({
    data: {
        list1:[],
        history: [],
        hot: ['芹菜', '大红枣', '西红柿'],
        result: [],
        showKeywords: false,
        // keywords: ['胡萝卜', '油麦菜', '冬瓜'],
        keywords:[],
        value: '',
        showResult: false,
    },

    cancelSearch() {
        this.setData({
            showResult: false,
            showKeywords: false,
            value: ''
        })
    },
    goDetail(e){
        console.log('点击跳转商品详情',e.currentTarget.dataset.id)
        wx.navigateTo({
          url: '/page/component/details/details?id=' + e.currentTarget.dataset.id,//跳页加传id值
        })
    },
    searchInput(e) {
        if(!e.detail.value){
            this.setData({
                showKeywords: false
            })
        }else{
            if(!this.data.showKeywords){
                timeId && clearTimeout(timeId);
                timeId = setTimeout(() => {
                    this.setData({
                        showKeywords: true
                    })
                }, 1000)
            }
        }
    },
    keywordHandle(e) {
        // result=[]
        const text = e.target.dataset.text;
        wx.cloud.database().collection("goods")
        .where({name:text})
        .get()
        .then(res =>{
            console.log('搜索成功',res)
            this.setData({
                list1:res.data,
                // result:[res.data]
                // result:[...this.data.result+res.data]
            })
            console.log('list1',this.data.list1)
            if(this.data.list1.length!=0){
                this.data.keywords=''
                this.setData({
                    keywords:[this.data.list1[0].name]
                })
                console.log('guanjianzi ',this.data.keywords)
                for (let index = 0; index < this.data.list1.length; index++) {
                    const element =this.data.list1[index];
                    console.log('lemen',element)
                    this.data.result={id:element._id,url:'/page/component/details/details?id='+ e.currentTarget.dataset.id,thumb:element.image,title:element.name,price:element.price}
                }
                console.log('result11111',this.data.result)
                this.setData({
                    result:[this.data.result],
                    value: text,
                    keywords:[this.data.value],
                    showKeywords: false,
                    showResult: true,
            })
            }
            else{
            this.setData({
            result:this.data.list1
            
            ,
            value: text,
            showKeywords: false,
            showResult: true,
        })
            }
        this.historyHandle(text);
            console.log('商品列别请求;isy成功',this.data.list
            )
        })
        .catch(res =>{
            console.log('数据库请求失败',res)
        })
       
    },
    historyHandle(value) {
        let history = this.data.history;
        const idx = history.indexOf(value);
        if (idx === -1) {
            // 搜索记录只保留8个
            if (history.length > 7) {
                history.pop();
            }
        } else {
            history.splice(idx, 1);
        }
        history.unshift(value);
        wx.setStorageSync('history', JSON.stringify(history));
        this.setData({
            history
        });
    },
    onLoad() {
        const history = wx.getStorageSync('history');
        if (history) {
            this.setData({
                history: JSON.parse(history)
            })
            console.log(this.data.history);
        }
        wx.cloud.database().collection("goods")
        .get()
        .then(res =>{
            console.log('商品列别请求成功',res)
            this.setData({
                list:res.data
            })
            console.log('商品列别请求;isy成功',this.data.list)
for (let index = 0; index < this.data.list.length; index++) {
    const element = this.data.list[index];
    this.data.keywords[index]=element.name;  
}
this.setData({
    keywords:'',
   keywords:this.data.keywords
})
console.log('keywords',this.data. keywords)
        })
        .catch(res =>{
            console.log('商品列别请求失败',res)
        })
    }
})