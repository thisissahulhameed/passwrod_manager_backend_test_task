const PassMngModel = require("./model");
const { encrypt, decrypt } = require("./encrypt-decrypt");

//Creating a new Password Manager
const createPassMng = async (req, res) => {
  try {
    const { websiteName, userName, password, websiteUrl } = req.body;

    //Encrypitng the Plain Text Password
    const encryptPassword = encrypt(password);

    const newPassMng = await PassMngModel.create({
      websiteName,
      userName,
      password: encryptPassword,
      websiteUrl,
    });

    res.status(201).json(newPassMng);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ errMessage: "Error while creating new password manager" });
  }
};

//Read all the Password Manager for displaying in UI from DB
const readAllPassMng = async (req, res) => {
  try {
    let allPassMng = await PassMngModel.find();

    //Decrypting passwords while dispaling to user
    allPassMng = allPassMng.map((passMng) => {
      return {
        ...passMng._doc,
        password: decrypt(passMng.password),
      };
    });

    res.status(200).json(allPassMng);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ errMessage: "Error while reading all password manager" });
  }
};

//Updating the Password Manager
const updatePassMng = async (req, res) => {
  try {
    const { passMngId } = req.params;

    const { userName, password } = req.body;

    console.log(userName, password);

    //Encrypitng the Plain Text Password
    const encryptPassword = encrypt(password);

    const passMng = await PassMngModel.findByIdAndUpdate(passMngId, {
      userName,
      password: encryptPassword,
    });
    res.status(200).json(passMng);
  } catch (err) {
    res
      .status(500)
      .json({ errMessage: "Error while updating password manager" });
  }
};

//Deleting the Password Manager
const deletePassMng = async (req, res) => {
  try {
    const { passMngId } = req.params;

    await PassMngModel.findByIdAndDelete(passMngId);

    res.status(200).send("successfully deleted");
  } catch (err) {
    res
      .status(500)
      .json({ errMessage: "Error while updating password manager" });
  }
};

module.exports = {
  createPassMng,
  readAllPassMng,
  updatePassMng,
  deletePassMng,
};
