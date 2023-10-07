const mongoose = require("mongoose");

//Password Manager Schema
const PassMngSchema = new mongoose.Schema({
  websiteName: { type: String },
  userName: { type: String },
  password: { iv: { type: String }, encryptedText: { type: String } },
  websiteUrl: { type: String },
});

//Password Manager Model from the schema
const PassMngModel = mongoose.model("Password_Manager", PassMngSchema);

module.exports = PassMngModel;
