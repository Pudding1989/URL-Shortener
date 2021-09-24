const dataBase = require('../../config/mongoose')

const Link = require('../link')
const seeds = require('../seeds/seedData')

dataBase.once('open', async () => {
  console.log('Seeder connect to MongoDB ｡:.ﾟヽ(*´∀`)ﾉﾟ.:｡ ')
  try {
    await Link.insertMany(seeds)

    console.log('播種完畢 <(￣︶￣)>')
    process.exit()
  } catch
  (error) { console.log(`DataBase ERROR at insertMany Function:${error}`) }
})
