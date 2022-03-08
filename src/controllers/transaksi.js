const Transaksi = require("../models/Transaksi.model");
const Task = require("../models/Task.model");
//nanti task diganti user
//saldo beneran gak
// Transaksi/transfer/:id
const createTransferSaldo = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const pengirim = await Task.findOne({ _id: userID });
    const penerima = await Task.findOne({ rek : req.body.rek_penerima });
    
    if (pengirim.saldo < req.body.nominal) {
        return res.status(400).json({ msg: "saldo tidak cukup" });
    }
    let saldoAkhirPengirim = pengirim.saldo - req.body.nominal;
    let saldoAkhirPenerima = penerima.saldo + req.body.nominal;
    const updatePengirim = { saldo: saldoAkhirPengirim };
    const updatePenerima = { saldo: saldoAkhirPenerima };
    await Task.findOneAndUpdate({ _id: taskID }, updatePengirim, {
        new: true,
        runValidators: true,
    });
    await Task.findOneAndUpdate({ _id: taskID }, updatePenerima, {
        new: true,
        runValidators: true,
    });


    const dataTransfer = {
        jenis: "transfer",
        norek: req.body.rek_pengirim,
        tanggal: new Date(),
        pengirim : {
            nama: pengirim.nama,
            rekening: pengirim.rek
        },
        penerima : {
            nama: penerima.nama,
            rekening: penerima.rek
        },
        nominal : req.body.nominal
    }
    const transaksi = await Transaksi.create(dataTransfer);
    
    return res.status(201).json({ transaksi });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// Transaksi/isi/:id
const createIsiSaldo = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const nasabah = await Task.findOne({ _id: userID });
    let saldoAkhir = nasabah.saldo + req.body.nominal;
    const update = {saldo : saldoAkhir}
    await Task.findOneAndUpdate({ _id: taskID }, update, {
      new: true,
      runValidators: true,
    });
    
    const dataTransfer = {
        jenis: "isi",
        norek: nasabah.rek,
        tanggal: new Date(),
        nominal : req.body.nominal
    }
    const transaksi = await Transaksi.create(dataTransfer);
    
    return res.status(201).json({ transaksi });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// Transaksi/isi/:id
const createTarikSaldo = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const nasabah = await Task.findOne({ _id: userID });

    if (nasabah.saldo < req.body.nominal) {
        return res.status(400).json({ msg: "saldo tidak cukup" });
    }

    let saldoAkhir = nasabah.saldo - req.body.nominal;
    const update = { saldo: saldoAkhir };
    await Task.findOneAndUpdate({ _id: userID }, update, {
      new: true,
      runValidators: true,
    });

    const dataTransfer = {
        jenis: "tarik",
        norek: nasabah.rek,
        tanggal: new Date(),
        nominal : req.body.nominal
    }
    const transaksi = await Transaksi.create(dataTransfer);

    res.status(201).json({ transaksi });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};


// Transaksi/history/:id
const getHistoryTransfer = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const nasabah = await Task.findOne({ _id: userID });

    const tasks = await Transfer.find({norek : nasabah.rekening}); // bisa menggunakan filter pada argumen fungsi find()
    return res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  createTransferSaldo,
  createIsiSaldo,
  createTarikSaldo,
  getHistoryTransfer,
};
