'use strict'

require('dotenv').config()

const config = ({ setup = false, logging = () => { } } = {}) => ({
  db: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging,
    setup,
    defaultAdminRut: process.env.DEFAULT_ADMIN_RUT,
    defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
    defaultAdminEmail: process.env.DEFAULT_ADMIN_EMAIL,
    defaultFirstRut: process.env.DEFAULT_FIRST_RUT,
    defaultFirstPassword: process.env.DEFAULT_FIRST_PASSWORD,
    defaultFirstEmail: process.env.DEFAULT_FIRST_EMAIL,
    defaultSecondRut: process.env.DEFAULT_SECOND_RUT,
    defaultSecondPassword: process.env.DEFAULT_SECOND_PASSWORD,
    defaultSecondEmail: process.env.DEFAULT_SECOND_EMAIL,
  },
  auth: {
    defaultAdminJwtSecret: process.env.DEFAULT_ADMIN_JWT_SECRET,
    defaultFirstUserJwtSecret: process.env.DEFAULT_FIRST_USER_JWT_SECRET,
    defaultSecondUserJwtSecret: process.env.DEFAULT_SECOND_USER_JWT_SECRET
  }
})

module.exports = config