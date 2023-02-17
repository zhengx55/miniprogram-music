// pages/comment/comment.js
import formatTime from '../../utils/formatTime.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    blogDetail: {},
    commentList: [],
    blogId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      blogId: options.id
    })
    this._getBlogDetail(options.id)
  },

  _getBlogDetail() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: "blog",
      data: {
        blogId: this.data.blogId,
        $url: 'detail'
      }
    }).then((res) => {
      let temp_list = res.result.commentList.data
      for (let i = 0; i < temp_list.length; i++) {
        temp_list[i].createTime = formatTime(new Date(temp_list[i].createTime))
      }
      wx.hideLoading()
      this.setData({
        commentList: temp_list,
        blogDetail: res.result.detail[0]
      })
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