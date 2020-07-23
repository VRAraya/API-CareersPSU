'use strict'

const db = require('..')
const fs = require('fs')
const populateConfig = require('psucareers-config')
const debug = require('debug')('apicareers:db:seed')

let careerArray = []
let careerLine
let careerInfo

fs.readFile('/home/vissstors/Documentos/API-CarrerasPSU/database/seed/PSUCareers.csv', 'utf8', function read(err, data) {
  if (err) {
    throw err
  }
  careerArray = data.split(/\r?\n/)
})

const config = populateConfig({
  logging: s => debug(s)
})

async function seed() {
  const { User, Career } = await db(config.db).catch(handleFatalError)

  console.log('---Careers---')

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

    console.log(career)
  }

  console.log('---User Admin---')

  let userAdmin = await User.createAdmin({
    rut: 1,
    email: 'root@undefined.sh',
    isAdmin: true,
    password: config.db.defaultAdminPassword
  })

  let firstUser = await User.create({
    rut: 2,
    email: '2@undefined.sh',
    password: config.db.defaultPassword
  })

  let secondUser = await User.create({
    rut: 2,
    email: '2@undefined.sh',
    password: config.db.defaultPassword
  })

  console.log(userAdmin)
  console.log(firstUser)
  console.log(secondUser)

  process.exit(0)
}


function handleFatalError(err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

seed()