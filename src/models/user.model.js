const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    image_url: String
})


module.exports = mongoose.model("users", userSchema, "users");
