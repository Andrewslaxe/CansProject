const jwt = require('jsonwebtoken')
const cansRouter = require('express').Router()

const Can = require('../models/can')
const User = require('../models/user')

cansRouter.get('/', async (request, response) => {
  const token = request.headers.token
  const decodedToken = jwt.verify(token, 'KengodSecret')
  if (!request.headers.token || !decodedToken.userID) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  if (decodedToken.role === 'Admin') {
    const cans = await Can.find({}).populate('userID', {
      username: 1,
      email: 1,
      role: 1
    })
    response.json(cans)
  } else if (decodedToken.role === 'User') {
    const myuser = await User.findOne({userID: decodedToken.userID})
    const cans = await Can.find({userID: myuser._id}).populate('userID', {
      username: 1,
      email: 1,
      role: 1
    })
    response.json(cans)
  }
})

cansRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.headers.token, 'KengodSecret')
  if (!request.headers.token || !decodedToken.userID) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const user = await User.findOne({userID: decodedToken.userID})
  const can = new Can({
    canID: body.canID,
    storage: body.storage,
    location: body.location,
    battery: body.battery,
    date: new Date(),
    userID: user._id
  })
  const savedCan = await can.save()
  user.cans = user.cans.concat(savedCan._id)
  await user.save()
  response.status(201).json(savedCan)
})

cansRouter.delete('/:id', async (request, response) => {
  const token = request.headers.token
  const decodedToken = jwt.verify(token, 'KengodSecret')
  if (!request.headers.token || !decodedToken.userID) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  if (decodedToken.role === 'Admin') {
    await Can.findOneAndRemove({canID: request.params.id})
  } else if (decodedToken.role === 'User') {
    const theuser = await User.findOne({userID: decodedToken.userID})
    await Can.findOneAndRemove({canID: request.params.id, userID: theuser._id})
  }
  response.status(204).end()
})

cansRouter.put('/:id', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.headers.token, 'KengodSecret')
  if (!request.headers.token || !decodedToken.userID) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const user = await User.findOne({userID: decodedToken.userID})
  const can = {
    canID: body.canID,
    storage: body.storage,
    location: body.location,
    battery: body.battery,
    date: new Date(),
    userID: user._id
  }
  if (decodedToken.role === 'Admin') {
    const updatedCan = await Can.findOneAndUpdate(
      {canID: request.params.id},
      can,
      {new: true}
    )
    response.json(updatedCan)
  } else if (decodedToken.role === 'User') {
    const cans = await Can.find({userID: decodedToken.userID}).populate(
      'userID',
      {username: 1, email: 1, role: 1}
    )
    cans.forEach((can) => {
      if (can.canID === request.params.id) {
        const updatedCan = Can.findByIdAndUpdate(request.params.id, can, {
          new: true
        })
        response.json(updatedCan)
      }
    })
  }
})

module.exports = cansRouter
