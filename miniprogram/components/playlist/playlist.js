// components/playlist/playlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object
    }
  },
  observers: {
    ['item.playCount'](val) {
      this.setData({
        _count: this._parsePlaycount(val, 2)

      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    _count: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToMusicList(){
      wx.navigateTo({
        // page path
        url:`../../pages/list/list?musicId=${this.properties.item.id}`,
        // parameters

      })
    },
    _parsePlaycount(num, decimal) {
      let numStr = num.toString().split('.')[0]
      if (numStr.length < 6) {
        return numStr
      } else if (numStr.length >= 6 && numStr.length <= 8) {
        let dec = numStr.substring(numStr.length - 4, numStr.length + decimal)
        return `${parseFloat(parseInt(num / 10000) + '.' + dec)}万`
      } else if (numStr.length > 8) {
        let dec = numStr.substring(numStr.length - 8, numStr.length - 8 + decimal)
        return `${parseFloat(parseInt(num / 100000000) + '.' + dec)}亿`
      }
    },
  }
})
