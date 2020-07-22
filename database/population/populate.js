'use strict'

const db = require('../')
const fs = require('fs')

let careerArray = []
let careerLine
let careerInfo

fs.readFile('/home/vissstors/Documentos/API-CarrerasPSU/database/population/PSUCareers.csv', 'utf8', function read(err, data) {
  if (err) {
    throw err
  }
  careerArray = data.split(/\r?\n/)
})

async function run() {
  const config = {
    database: process.env.DB_NAME || 'psucareers',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'Test123**',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
  }

  const { Career } = await db(config).catch(handleFatalError)

  console.log(careerArray)

  for (careerLine of careerArray) {
    careerInfo = careerLine.split(',')

    let career = await Career.createOrUpdate({
      codeid: parseInt(careerInfo[1]),
      name: careerInfo[0],
      nem: parseFloat(careerInfo[2]),
      ranking: parseFloat(careerInfo[3]),
      language: parseFloat(careerInfo[4]),
      maths: parseFloat(careerInfo[5]),
      science: parseFloat(careerInfo[6]),
      history: parseFloat(careerInfo[7]),
      minavgappscore: parseInt(careerInfo[8]),
      vacancies: parseInt(careerInfo[10]),
      firstscorelastyear: parseFloat(careerInfo[11]),
      lastscorelastyear: parseFloat(careerInfo[12])
    }).catch(handleFatalError)

    console.log('---career---')
    console.log(career)
  }

  process.exit(0)
}


function handleFatalError(err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()