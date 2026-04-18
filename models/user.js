const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

//this will do everything related to password, hashing salting etc
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
