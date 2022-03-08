const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
    },
    required: [true, "Email required"]
  },
  name: {
    type: String,
    required : [true, 'Nama Harus diisi!']
  },
  NIK:{
    type: Number,
  },
  alamat:{
    type: String
  },
  noTelp:{
    type: String
  },
  password:{
    type: String
  },
  saldo:{
    type: Number
  },
  noRek:{
    type:String
  },
  pinATM:{
    type: String
  }
});

module.exports = mongoose.model("Task", TaskSchema);
