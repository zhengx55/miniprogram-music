// pages/playlist/playlist.js
const MAX_LIMIT = 15
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrls: [{
      url: 'http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg',
    },
    {
      url: 'http://p1.music.126.net/xhWAaHI-SIYP8ZMzL9NOqg==/109951164167032995.jpg',
    },
    {
      url: 'http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg',
    }],
    playList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._getPlayList()
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
      playList: []
    })
    this._getPlayList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 触底调用云函数
    this._getPlayList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  _getPlayList() {
    wx.showLoading({
      title: 'Loading...',
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'music',
      data: {
        start: 0,
        count: MAX_LIMIT,
        $url: 'playlist'
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        playList: this.data.playList.concat(res.result.data)
      })
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })
  }
})