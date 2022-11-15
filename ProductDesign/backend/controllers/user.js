const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const User = require('../models/user')

usersRouter.post("/", async (request, response) => {
	const saltRounds = 10
	const body = request.body
	const Password = request.body.password
	const passwordHash = await bcrypt.hash(Password, saltRounds)
	const user = new User({...body, password: passwordHash})
	const savedUser = await user.save()
	response.json(savedUser)
})

usersRouter.get("/", async (request, response) => {
	const users = await User.find({}).populate("cans", {
        canID: 1,
        storage: 1,
        location: 1,
        battery: 1,
        date: 1,
    })
	response.json(users)
})

module.exports = usersRouter