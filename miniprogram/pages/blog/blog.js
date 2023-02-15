// pages/blog/blog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  handlePublish() {
    //检查用户是否授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          // this.setData({
          //   showModal: true
          // })
          // already authraized 
          // fetch avatar, username... 
          wx.getUserInfo({
            success: (res) => {
              this.handleLoginSuccess({
                detail: res.userInfo
              })
            }
          })
        } else {
          this.setData({
            showModal: true
          })
        }
      }
    })

  },

  handleLoginSuccess(event) {
    const { detail } = event
    console.log(detail)
    wx.navigateTo({
      url: `../edit/edit?nickName=${detail.nickName}&avatar=${detail.avatarUrl}`,
    })
  },
  handleLoginFail() {
    wx.showModal({
      title: '用户未授权',
      content: '发布内容需要您的账号授权',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})