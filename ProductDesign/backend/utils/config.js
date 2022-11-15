require("dotenv").config()

let PORT = 3000
let MONGODB_URI = "mongodb+srv://Kengan:Peraza24.@phonebook.oc4u6nl.mongodb.net/AllCans?retryWrites=true&w=majority"

if (process.env.NODE_ENV === "test") {
	MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = { PORT, MONGODB_URI }