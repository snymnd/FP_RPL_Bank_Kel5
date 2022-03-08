const mongoose = require("mongoose");

const NasabahInfoSchema = new mongoose.Schema({
    nama:String,
    rekening: String,
})

const TransaksiSchema = new mongoose.Schema({
    jenis: String,
    norek: String,
    tanggal: {
        type: Date,
        default: Date.now,
    },
    pengirim : NasabahInfoSchema,
    penerima : NasabahInfoSchema,
    nominal : Number
})

module.exports = mongoose.model("Transaksi", TransaksiSchema);
