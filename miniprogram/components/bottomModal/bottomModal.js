// components/bottom-modal/bottom-modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModal: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  options: {
    multipleSlots: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClose() {
      console.log(123)
      this.setData({
        showModal: false,
      })
    }
  }
})
