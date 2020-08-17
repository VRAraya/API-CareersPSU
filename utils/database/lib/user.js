'use strict'

const bcrypt = require('bcrypt')

module.exports = function setupUser (UserModel) {
  async function create (user) {
    const { rut, email, password } = user
    const hashedPassword = await bcrypt.hashSync(password, 10)

    const result = await UserModel.create({
      rut,
      email,
      password: hashedPassword
    })

    return result.toJSON()
  }

  async function createAdmin (user) {
    const { rut, email, isAdmin, password } = user
    const hashedPassword = await bcrypt.hashSync(password, 10)

    const result = await UserModel.create({
      rut,
      email,
      isAdmin,
      password: hashedPassword
    })

    return result.toJSON()
  }

  async function findById (id) {
    return UserModel.findById(id)
  }

  async function findAll () {
    return await UserModel.findAll()
  }

  async function findByRut (rut) {
    const result = await UserModel.findAll({
      where: {
        rut
      }
    })
    return result
  }

  function isAdmin (rut) {
    return UserModel.findAll({
      where: {
        rut
      },
      attributes: {
        isAdmin
      }
    })
  }

  function findByEmail (email) {
    return UserModel.findOne({
      where: {
        email
      }
    })
  }

  return {
    create,
    createAdmin,
    findById,
    findAll,
    findByRut,
    isAdmin,
    findByEmail
  }
}
