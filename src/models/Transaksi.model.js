const mongoose = require("mongoose");

const NasabahInfoSchema = new mongoose.Schema({
    nama:{
        type: String,
    },
    rekening: {
        type: String,
    }
})

const TransaksiSchema = new mongoose.Schema({
    jenis: {
        type: String,
        required: [true, "Jenis Transaksi harus diisi!"]
    },
    norek: {
        type: String,
        required: [true, "Nomor Rekening nasabah Pembuat transaksi harus diisi!"]   
    },
    tanggal: {
        type: Date,
        default: Date.now,
    },
    pengirim : NasabahInfoSchema,
    penerima : NasabahInfoSchema,
    nominal : {
        type: Number,
        required: [true, "Nominal harus diisi!"]
    }
})

module.exports = mongoose.model("Transaksi", TransaksiSchema);
