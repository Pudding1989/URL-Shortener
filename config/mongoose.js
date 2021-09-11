const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || ' mongodb://localhost/url-shortener'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const dataBase = mongoose.connection

dataBase.on('error', console.error.bind(console, '！！MongoDB ERROR:'))
dataBase.once('open',() => { console.log('MongoDB Connected  ｡:.ﾟヽ(*´∀`)ﾉﾟ.:｡ ') })

module.exports = dataBase