'use strict'

const debug = require('debug')('apicareers:db:setup')
const inquirer = require('inquirer')
const db = require('./')
const chalk = require('chalk')
const setupConfig = require('../config/config.js')

const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?'
    }
  ])

  if (!answer.setup) {
    return console.log('Nothing happened :)')
  }

  const config = setupConfig({
    setup: true,
    logging: s => debug(s)
  })

  await db(config.db).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
