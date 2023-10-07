const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./src/router");
const mongoose = require("mongoose");

//Configure the environment variable
dotenv.config();

//Configure cors
app.use(cors());

//Configure body parser for json and url encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Configure Password Manager router
app.use(router);

//Configure the mongo db using mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.alht5.mongodb.net/Password_Manager_DB?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB connected successfully"))
  .catch((error) => console.log(error, "DB is not connected"));

//Listening our backend app at the given port 
app.listen(process.env.PORT, () => {
  console.log(
    `Server started successfully at http://localhost:${process.env.PORT}`
  );
});
