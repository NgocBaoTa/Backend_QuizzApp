const express = require("express");
const { db } = require("../model/db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const AdminRouter = express.Router();

AdminRouter.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password)
    return res.status(400).json({
      success: false,
      message: "Missing email or username or password",
    });

  try {
   

    const newpassword = await bcrypt.hash(password, 10);

    const newUser = await db.Admin.insertOne({
      email,
      username,
      password: newpassword,
    });
    const accessToken = jwt.sign({ userId: newUser.insertedId }, "sha");
    res.json({ success: true, accessToken });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

AdminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const msgBody = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      message: "Missing email or password ",
    });

  try {
    const admin = await db.Admin.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    let checkPassword = await bcrypt.compare(password, admin.password);

    if (!checkPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const accessToken = jwt.sign(msgBody, "sha");
    const adminId = admin._id;
    const adminName = admin.username
    return res.json({ success: true, accessToken, adminId, adminName });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = AdminRouter