// pages/edit/edit.js
const WORD_LIMIT = 140
const IMAGES_LIMIT = 9
const db = wx.cloud.database()
let userInfo = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordsNum: 0,
    footerBottom: 0,
    uploadedImage: [],
    showSelect: true,
    content: '',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    userInfo = options
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

  },

  onFocusHandler(event) {
    // 获取键盘高度
    this.setData({
      footerBottom: event.detail.height
    })
  },

  onBlurHandler(event) {
    this.setData({
      footerBottom: 0
    })
  },

  onSelectImage() {
    let max = IMAGES_LIMIT - this.data.uploadedImage.length
    wx.chooseMedia({
      count: max,
      sizeType: [],
      sourceType: ['album', 'camera'],
      success: (res) => {
        res.tempFiles.map((item) => {
          this.setData({
            uploadedImage: this.data.uploadedImage.concat(item.tempFilePath)
          })
        })
        max = IMAGES_LIMIT - this.data.uploadedImage.length
        this.setData({
          showSelect: max <= 0 ? false : true
        })
      },
    })
  },

  onInputHandler(event) {
    let wordsNum = event.detail.value.length
    if (wordsNum >= WORD_LIMIT) {
      wordsNum = `最大字数为${WORD_LIMIT}`
    }
    this.setData({
      content: event.detail.value,
      wordsNum
    })
  },

  onDeleteHandler(event) {
    this.data.uploadedImage.splice(event.target.dataset.index, 1)
    this.setData({
      uploadedImage: this.data.uploadedImage
    })
    if (this.data.uploadedImage.length === IMAGES_LIMIT - 1) {
      this.setData({
        showSelect: true
      })
    }
  },
  onPreviewHandler(event) {
    wx.previewImage({
      urls: this.data.uploadedImage,
      current: event.target.dataset.imgsrc
    })
  },

  onSendHandler() {
    // 数据发布至云数据库中
    // 数据库: 内容 fileid openid username avatar timestamp
    // 图片 -> 云存储 fileID 云文件ID
    if (this.data.content.trim() === '') {
      wx.showModal({
        title: '内容不能为空',
        content: '',
      })
      return
    }
    wx.showLoading({
      title: 'Loading...',
    })
    let promiseTask = []
    let fileIds = []
    for (let i = 0; i < this.data.uploadedImage.length; i++) {
      let task = new Promise((reslove, reject) => {
        let item = this.data.uploadedImage[i]
        let image_suffix = /\.\w+$/.exec(item)[0]
        wx.cloud.uploadFile({
          cloudPath: 'blog/' + Date.now() + '-' + Math.random() * 10000000 + image_suffix,
          filePath: this.data.uploadedImage[i],
          success: (res) => {
            fileIds = fileIds.concat(res.fileID)
            reslove(res)
          },
          fail: (err) => { reject(err) }
        })
      })
      promiseTask.push(task)
    }
    Promise.all(promiseTask).then((res) => {
      db.collection('blog').add({
        data: {
          content: this.data.content,
          img: fileIds,
          // 用户昵称 头像
          ...userInfo,
          createTime: db.serverDate()
        }
      }).then((res) => {
        wx.hideLoading()
        wx.showToast({
          title: '发布成功！',
        })
        wx.navigateBack()
      }).catch((err) => {
        wx.hideLoading()
        wx.showToast({
          title: '发布失败',
        })
      })
    })
    // insert to cloud database

  },
})