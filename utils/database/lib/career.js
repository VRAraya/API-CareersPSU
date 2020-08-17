'use strict'

module.exports = function setupCareer (CareerModel) {
  async function createOrUpdate (career) {
    const cond = {
      where: {
        codeid: career.codeid
      }
    }

    const existingCareer = await CareerModel.findOne(cond)

    if (existingCareer) {
      const updated = await CareerModel.update(career, cond)
      return updated ? CareerModel.findOne(cond) : existingCareer
    }

    const result = await CareerModel.create(career)
    return result.toJSON()
  }

  function findById (id) {
    return CareerModel.findById(id)
  }

  function findByCodeId (codeid) {
    return CareerModel.findOne({
      where: {
        codeid
      }
    })
  }

  function findAll () {
    return CareerModel.findAll()
  }

  function findByName (name) {
    return CareerModel.findAll({
      where: {
        name
      }
    })
  }

  return {
    createOrUpdate,
    findById,
    findByCodeId,
    findByName,
    findAll
  }
}
