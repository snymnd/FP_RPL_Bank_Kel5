const express = require("express");
const router = express.Router();

const { 
    registerController, 
    loginController 
} = require("../controllers/auth");

router.route("/login")
    .post(loginController);
router.route("/register")
    .post(registerController);


module.exports = router;
