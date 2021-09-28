const mongoose = require('mongoose')

const Schema = mongoose.Schema

const linkSchema = new Schema({
  original: {
    type: String,
    required: true
  },
  shortenCode: {
    type: String,
    required: true
  }
  // NOTE: UTM應用可以作為之後 side project開發方向
  // URL: ...網址?utm_source=facebook
  // campaignSource: {
  //   type: String,
  // },
  // campaignMedium: {
  //   type: String,
  // },
  // campaignName: {
  //   type: String,
  // }
})

module.exports = mongoose.model('Link', linkSchema)
