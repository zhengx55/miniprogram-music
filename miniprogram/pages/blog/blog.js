// pages/blog/blog.js
let keyword = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    blogList: [],
    start: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._loadBlogList()
  },

  _loadBlogList() {
    wx.showLoading({
      title: '读取中...',
    })
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        keyword,
        $url: 'blogList',
        start: this.data.start,
        count: 5,
      }
    }).then((res) => {
      this.setData({
        blogList: this.data.blogList.concat(res.result),
        start: this.data.start + this.data.blogList.concat(res.result).length,
      })
      wx.hideLoading()
    })
  },

  onSearchHandler(event) {
    keyword = event.detail.keywords
    this.setData({
      start: 0,
      blogList: []
    })
    this._loadBlogList()
  },

  handlePublish() {
    //检查用户是否授权
    wx.getUserProfile({
      desc: 'desc',
      success: (res) => {
        this.handleLoginSuccess({
          detail: res.userInfo
        })
      },
      fail: (e) => {
        wx.showModal({
          title: '未授权',
          content: '需授权才能进行发布',

        })
      }
    })
  },

  handleLoginSuccess(event) {
    const { detail } = event
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

  toCommentPage(event) {
    wx.navigateTo({
      url: `../../pages/comment/comment?id=${event.target.dataset.id}`,
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
    this.setData({
      start: 0,
      blogList: []
    })
    this._loadBlogList()
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this._loadBlogList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})