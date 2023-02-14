// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
// const URL = "http://musicapi.xiecheng.live/personalized"
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _playList = [{ "_id": "08560c9e5d042a5c0174f1ca26f1d7b2", "copywrier": "热门推荐", "playCount": 1.4641238e+06, "highQuality": false, "type": 0.0, "canDislike": true, "name": "天气转热了，适合听点凉爽的歌。", "alg": "cityLevel_unknow", "createTime": { "$date": "2019-06-14T23:14:36.746Z" }, "id": 2.780381322e+09, "picUrl": "https://p2.music.126.net/Biky7TE4CtW6NjGuqoUKZg==/109951164041827987.jpg", "trackCount": 53.0 },
{ "_id": "08560c9e5d042a5c0174f1da7aa357aa", "highQuality": false, "copywriter": "热门推荐", "canDislike": true, "playCount": 622822.6, "id": 2.740107647e+09, "name": "「时空潜行」囿于昼夜的空想主义者", "type": 0.0, "alg": "cityLevel_unknow", "createTime": { "$date": "2019-06-14T23:14:36.955Z" }, "picUrl": "https://p2.music.126.net/Q0eS0avwGK04LufWM7qJug==/109951164116217181.jpg", "trackCount": 20.0 },
{ "_id": "08560c9e5d042a5c0174f1de21c7e79e", "id": 2.828842343e+09, "type": 0.0, "name": "粤语情诗：与你听风声，观赏过夜星", "picUrl": "https://p2.music.126.net/K9IcG8cU6v4_SwuQ_x2xMA==/109951164124604652.jpg", "highQuality": false, "alg": "cityLevel_unknow", "playCount": 1.785097e+06, "trackCount": 52.0, "copywriter": "热门推荐", "canDislike": true, "createTime": { "$date": "2019-06-14T23:14:36.982Z" } },
{ "_id": "08560c9e5d042a5d0174f1e67d1bb16f", "playCount": 7.719329e+06, "highQuality": false, "trackCount": 950.0, "alg": "cityLevel_unknow", "id": 9.17794768e+08, "type": 0.0, "name": "翻唱简史：日本四百首", "canDislike": true, "createTime": { "$date": "2019-06-14T23:14:37.037Z" }, "copywriter": "热门推荐", "picUrl": "https://p2.music.126.net/NczCuurE5eVvObUjssoGjQ==/109951163788653124.jpg" },
{ "_id": "08560c9e5d042a5d0174f1ea32c4c288", "type": 0.0, "copywriter": "热门推荐", "highQuality": false, "createTime": { "$date": "2019-06-14T23:14:37.097Z" }, "id": 2.201879658e+09, "alg": "cityLevel_unknow", "playCount": 1.06749088e+08, "name": "你的青春里有没有属于你的一首歌？", "picUrl": "https://p2.music.126.net/wpahk9cQCDtdzJPE52EzJQ==/109951163271025942.jpg", "canDislike": true, "trackCount": 169.0 },
{ "_id": "08560c9e5d0829820362a79f4b049d2d", "alg": "cityLevel_unknow", "name": "「乐队的夏天」参赛歌曲合集丨EP04更新", "highQuality": false, "picUrl": "http://p2.music.126.net/2WE5C2EypEwLJd2qXFd4cw==/109951164086686815.jpg", "trackCount": 158.0, "createTime": { "$date": "2019-06-18T00:00:02.553Z" }, "copywriter": "热门推荐", "playCount": 1.5742008e+06, "canDislike": true, "id": 2.79477263e+09, "type": 0.0 }]
const playListCollection = db.collection('playlist')
const MAX_LIMIT = 10
// 云函数入口函数
exports.main = async (event, context) => {
  // const databaseCount = await playListCollection.count()
  // const total = databaseCount.total
  // const batchTimes = Math.ceil(total / MAX_LIMIT)
  // const tasks = []
  // for (let i = 0; i < batchTimes; i++) {
  //   let promise = playListCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
  //   tasks.push(promise)
  // }

  // let list = {
  //   data: []
  // }
  // if (tasks.length > 0) {
  //   list = (await Promise.all(tasks)).reduce((acc, cur) => {
  //     return {
  //       data: acc.data.concat(cur.data)
  //     }
  //   })
  // }

  const list = await playListCollection.get()
  const newData = []
  for (let i = 0, len1 = _playList.length; i < len1; i++) {
    let flag = true
    for (let j = 0, len2 = list.data.length; j < len2; j++) {
      if (_playList[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if (flag) {
      newData.push(_playList[i])
    }
  }
  for (let i = 0; i < newData.length; i++) {
    await playListCollection.add({
      data: {
        ...newData[i],
        createTime: db.serverDate()
      }
    }).then(() => {
      console.log('success')
    }).catch(() => {
      console.log('fail')
    })
  }
}