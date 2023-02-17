// components/search/search.js
let keywords = ""
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: '请输入关键字'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInputHandler(event) {
      keywords = event.detail.value
    },
    onSearchHandler() {
      // database query
      // 将查询时间派送至父组建
      this.triggerEvent('search', {
        keywords
      })
    }
  }
})
