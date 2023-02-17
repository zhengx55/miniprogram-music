
// components/control/control.js
let userInfo = {}
const db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    showCommentModal: false,
    comment: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onSendHandler(event) {
      let formId = event.detail.formId
      let content = event.detail.value.content
      if (content.trim() == "") {
        wx.showModal({
          title: '评论内容不能为空',
          content: '',
        })
        return
      }
      wx.showLoading({
        title: '发送评论中...',
        mask: true
      })
      db.collection('comments').add({
        data: {
          content,
          blogId: this.properties.blogId,
          createTime: db.serverDate(),
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }
      }).then((res) => {
        wx.hideLoading()
        wx.showToast({
          title: '评论成功',
        })
        this.setData({
          showCommentModal: false,
          comment: ''
        })
        // 刷新页面
        this.triggerEvent('refreshCommentList')
      })
    },
    onCommentHandler() {
      // 判断授权情况
      wx.getUserProfile({
        desc: 'desc',
        success: (res) => {
          userInfo = res.userInfo
          this.setData({
            showCommentModal: true
          })
        }, fail: (e) => {
          wx.showModal({
            title: '未授权',
            content: '授权用户才可以评论',
          })
        }
      })

    },
    onShareHandler() { },

  }
})
