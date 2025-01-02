var mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
})
var userModel = mongoose.model("user", userSchema)
module.exports = userModel;