// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcbRouter = require('tcb-router')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
const blogCollection = db.collection('blog')
// 云函数入口函数
exports.main = async (event, context) => {
  const app = new tcbRouter({
    event
  })
  app.router('blogList', async (ctx, next) => {
    let blogList = await blogCollection.skip(event.start).limit(event.count).orderBy('createTime', 'desc').get()
    ctx.body = blogList.data
  })
  return app.serve()
}