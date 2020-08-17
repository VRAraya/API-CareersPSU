'use strict'

require('dotenv').config()

const config = ({ setup = false, logging = () => { } } = {}) => ({
  db: {
    dev: process.env.NODE_ENV !== 'production',
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
    defaultFirstEmail: process.env.DEFAULT_FIRST_EMAIL
  },
  auth: {
    defaultJwtSecret: process.env.DEFAULT_JWT_SECRET
  }
})

module.exports = config
