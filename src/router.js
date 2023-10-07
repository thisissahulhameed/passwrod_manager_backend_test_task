const express = require("express");
const router = express.Router();
const {
  createPassMng,
  readAllPassMng,
  updatePassMng,
  deletePassMng,
} = require("./controller");

// Handling the HTTP Routes Get, Post, Update, Delete
router.get("/getAllPassMng", readAllPassMng);
router.post("/postNewPassMng", createPassMng);
router.put("/updatePassMng/:passMngId", updatePassMng);
router.delete("/deletePassMng/:passMngId", deletePassMng);

module.exports = router;
