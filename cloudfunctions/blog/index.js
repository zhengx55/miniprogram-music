// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcbRouter = require('tcb-router')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
const blogCollection = db.collection('blog')
const commentCollection = db.collection('comments')
const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
  const app = new tcbRouter({
    event
  })
  app.router('blogList', async (ctx, next) => {
    // 搜索
    const keyword = event.keyword
    let serachResult = {}
    if (keyword.trim() != "") {
      serachResult = {
        content: db.RegExp({
          regexp: keyword,
          options: 'i'
        })
      }
    }
    let blogList = await blogCollection.where(serachResult).skip(event.start).limit(event.count).orderBy('createTime', 'desc').get()
    ctx.body = blogList.data
  })

  app.router('detail', async (ctx, next) => {
    let blogId = event.blogId
    let detail = await blogCollection.where({
      _id: blogId
    }).get().then((res) => {
      return res.data
    })
    // comment query
    const countResult = await blogCollection.count()
    const total = countResult.total
    let commentList = {
      data: []
    }
    if (total > 0) {
      // 分次查询
      const batchTimes = Math.ceil(total / MAX_LIMIT)
      const tasks = []
      for (let i = 0; i < batchTimes; i++) {
        tasks.push(commentCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
          blogId
        }).orderBy('createTime', 'desc').get())
      }
      if (tasks.length > 0) {
        commentList = (await Promise.all(tasks)).reduce((acc, cur) => {
          return {
            data: acc.data.concat(cur.data)
          }
        })
      }
      ctx.body = {
        commentList, detail
      }
    }
  })
  return app.serve()
}