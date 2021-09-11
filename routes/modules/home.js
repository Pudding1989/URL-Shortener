const express = require('express')
const router = express.Router()

const Link = require('../../models/link')

router.get('/', (req, res) => {
  res.send('Router is operating')
})

module.exports = router
