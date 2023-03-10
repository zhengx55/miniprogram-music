// components/blogCard/blogCard.js
import formateTime from "../../utils/formatTime.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog: Object
  },

  observers: {
    ['blog.createTime'](val) {
      if (val) {
        this.setData({
          _createTime: formateTime(new Date(val))

        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _createTime: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPreviewHandler(event) {
      wx.previewImage({
        urls: this.properties.blog.img,
        current: event.target.dataset.imgsrc
      })
    }
  }
})
