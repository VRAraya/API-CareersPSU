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

  console.log(config.db.defaultAdminRut)
  let userAdmin = await User.createAdmin({
    rut: config.db.defaultAdminRut,
    email: config.db.defaultAdminEmail,
    isAdmin: true,
    password: config.db.defaultAdminPassword
  })

  let firstUser = await User.create({
    rut: config.db.defaultFirstRut,
    email: config.db.defaultFirstEmail,
    password: config.db.defaultFirstPassword
  })

  let secondUser = await User.create({
    rut: config.db.defaultSecondRut,
    email: config.db.defaultSecondEmail,
    password: config.db.defaultSecondPassword
  })

  console.log(userAdmin)
  console.log(firstUser)
  console.log(secondUser)


  /*const adminScopes = [
    'signin:auth',
    'signup:auth',
    'read:users',
    'create:users',
    'read:careers'
  ]

  const publicScopes = [
    'signin:auth',
    'signup:auth',
    'read:careers'
  ]*/

  process.exit(0)
}


function handleFatalError(err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

seed()