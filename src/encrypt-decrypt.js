const crypto = require("crypto");

//Algorithm to encrypt the plain text password
const algorithm = "aes-256-cbc";
//Secret key
const key = "6bded876707e20e2fe30c6479d1cb735";

//Handling the encryption
const encrypt = (plainText) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    encryptedText: encrypted.toString("hex"),
  };
};

//Handling the decryption
const decrypt = (encryptText) => {
  const iv = Buffer.from(encryptText.iv, "hex");
  const encryptedText = Buffer.from(encryptText.encryptedText, "hex");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  return decrypted.toString();
};

module.exports = { encrypt, decrypt };
