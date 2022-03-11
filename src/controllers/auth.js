const bcrypt = require('bcrypt');
const randomize = require("randomatic");

// Require models folder 
const User = require('../models/Task.model');

// Registration 
const registerController = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({
          email: req.body.email,
          name: req.body.name,
          password: hashedPassword,
          NIK: req.body.NIK,
          alamat: req.body.alamat,
          noTelp: req.body.noTelp,
          saldo: req.body.saldo,
          noRek: randomize("0", 10),
          pinATM: req.body.pinATM,
        });
        res.status(201).json({ user });  
        // return res.redirect('/')  
    } catch (error) {
        next(error)
    }
}

// Login
const loginController = async (req, res, next) => {

    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email });
        if (user) {
        // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                res.status(200).json({ message: "Login successfull" , data: user});
                // res.redirect('/user/' + user._id)
            } else {
                const error = new Error();
                error.message = "Error Occured: Invalid Password";
                throw error;
                // res.status(400).json({ error: "Error Occured: Invalid Password" });
            }
        } else {
            const error = new Error();
            error.message = "User does not exist";
            throw error;
            // res.status(401).json({ error: "User does not exist" });
        }
        
    } catch (error) {
        next(error)
    }

}

module.exports = {
    registerController,  
    loginController,  
}