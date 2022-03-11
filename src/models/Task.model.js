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
    unique: true,
    required : [true, 'NIK Harus diisi!']
  },
  alamat:{
    type: String,
    required : [true, 'Alamat Harus diisi!']
  },
  noTelp:{
    type: String,
    unique: true,
    required : [true, 'No Telp Harus diisi!']
  },
  password:{
    type: String,
    min: [6, "Password minimal 6 karakter!"],
    max: [12, "Password maksimal 12 karakter!"],
    length: [6, 12],
    required : [true, 'Password Harus diisi!']
  },
  saldo:{
    type: Number,
    required : [true, 'Saldo awal harus diberikan!']
  },
  noRek:{
    type:String,
    unique: true,
    required : [true, 'Nomor Rekening harus digenreate!']
  },
  pinATM:{
    type: String,
    min: [6, "PIN minimal 4 karakter!"],
    max: [6, "PIN maksimal 4 karakter!"],
    required : [true, 'PIN ATM harus harus sesuai!']
  }
});

module.exports = mongoose.model("Task", TaskSchema);
