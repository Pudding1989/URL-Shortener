const express = require('express')
const router = express.Router()

const Link = require('../../models/link')

const valid = require('valid-url')

// 預設首頁
router.get('/', (req, res) => {
  res.render('index')
})

// 接收提交網址
router.post('/', async (req, res) => {
  const inputUrl = req.body.link.trim()
  // 取得協議名、網域名
  const protocol = req.protocol
  const host = req.get('host')
  const path = req.path

  // 後端導入套件，再次驗證網址格式
  if (valid.isWebUri(inputUrl)) {
    let shortenUrl = ''
    // 非同步
    try {
      // 尋找原始網址，回傳值為null或物件
      let link = await Link.findOne({ original: inputUrl }).lean()
      switch (link) {
        case null:
          let shortenCode = ''
          // 尋找重複縮網址代碼，確保執行一次用do-while
          let CheckDuplicate = null
          do {
            shortenCode = randomCode(5)
            CheckDuplicate = await Link.findOne({ shortenCode }).lean()
          } while (CheckDuplicate)

          await Link.create({ original: inputUrl, shortenCode })

          shortenUrl = `${protocol}://${host}${path}${shortenCode}`
          break

        default:
          shortenUrl = `${protocol}://${host}${path}${link.shortenCode}`
          break
      }
      res.render('index', { inputUrl, shortenUrl })
    } catch (error) { console.log(`DataBase ERROR at POST Function:${error}`) }
  } else {
    // 處理輸入網址格式錯誤
    const invalid = true
    res.render('index', { inputUrl, invalid })
  }
})

module.exports = router

// 函式
function randomCode(codeLength = 5) {
  let randomCode = ''
  const codeData = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '1234567890'
  for (let i = 0; i < codeLength; i++) {
    randomCode += codeData[Math.floor(Math.random() * codeData.length)]
  }
  return randomCode
}
