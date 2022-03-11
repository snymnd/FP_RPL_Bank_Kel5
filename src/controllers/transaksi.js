const Transaksi = require("../models/Transaksi.model");
const Task = require("../models/Task.model");
//nanti task diganti user
//saldo beneran gak
// Transaksi/transfer/:id
const getTransaction = async (req, res, next) => {
  try { 
    const { id: taskID } = req.params;
    const task = await Task.findOne(
      { _id: taskID }
    );
    res.render("transaction", {
      user: task,
    });

  } catch (error) {
    next(error)
  }
}


const createTransferSaldo = async (req, res, next) => {
  try {
    const { id: userID } = req.params;
    const pengirim = await Task.findOne({ _id: userID });
    const penerima = await Task.findOne({ noRek : req.body.rekening });
    console.log(penerima);
    console.log(pengirim);
    const nominal = parseInt(req.body.nominal);
    if (pengirim.saldo < nominal) {
      const err = new Error();
      err.message = "Saldo tidak cukup, silahkan isi saldo terlebih dahulu";
      throw err;
    }
    let saldoAkhirPengirim = pengirim.saldo - nominal;
    let saldoAkhirPenerima = penerima.saldo + nominal;
    const updatePengirim = { saldo: saldoAkhirPengirim };
    const updatePenerima = { saldo: saldoAkhirPenerima };
    await Task.findOneAndUpdate({ norek: pengirim.noRek }, updatePengirim, {
        new: true,
        runValidators: true,
    });
    await Task.findOneAndUpdate({ noRek: req.body.rekening }, updatePenerima, {
        new: true,
        runValidators: true,
    });


    const dataTransfer = {
        jenis: "Transfer",
        tanggal: new Date(),
        norek : pengirim.noRek,
        pengirim : {
            nama: pengirim.name,
            rekening: pengirim.noRek
        },
        penerima : {
            nama: penerima.name,
            rekening: penerima.noRek
        },
        nominal
    }
    const transaksi = await Transaksi.create(dataTransfer);
    res.render("invoice", { transaksi, pengirim, penerima });
    // res.status(201).json({ transaksi});
    // res.render('transaction', { transaksi });
  } catch (error) {
    next(error);
  }
};

// Transaksi/isi/:id
const createIsiSaldo = async (req, res, next ) => {
  try {
    const { id: userID } = req.params;
    const nasabah = await Task.findOne({ _id: userID });
    const nominal = parseInt(req.body.nominal);
    let saldoAkhir = nasabah.saldo + nominal;
    const update = {saldo : saldoAkhir}
    await Task.findOneAndUpdate({ _id: userID }, update, {
      new: true,
      runValidators: true,
    });
    
    const dataTransfer = {
        jenis: "Isi",
        norek: nasabah.noRek,
        tanggal: new Date(),
        nominal
    }
    const transaksi = await Transaksi.create(dataTransfer);
    res.render("invoice", { transaksi, pengirim : nasabah, penerima : undefined });
    // return res.status(201).json({ transaksi });
    // res.render("transaction", { transaksi });
  } catch (error) {
    next(error);
  }
};

// Transaksi/isi/:id
const createTarikSaldo = async (req, res, next) => {
  try {
    const { id: userID } = req.params;
    console.log(userID);
    const nasabah = await Task.findOne({ _id: userID });
    const nominal = parseInt(req.body.nominal);
    if (nasabah.saldo < nominal) {
        return res.status(400).json({ msg: "saldo tidak cukup" });
    }

    let saldoAkhir = nasabah.saldo - nominal;
    const update = { saldo: saldoAkhir };
    await Task.findOneAndUpdate({ _id: userID }, update, {
      new: true,
      runValidators: true,
    });
    console.log(req.body)
    const dataTransfer = {
        jenis: req.body.jenis,
        norek: nasabah.noRek,
        tanggal: new Date(),
        nominal
    }
    const transaksi = await Transaksi.create(dataTransfer);
    res.render("invoice", { transaksi, pengirim : nasabah, penerima : undefined });
    // res.status(201).json({ transaksi });
  } catch (error) {
    next(error);
  }
};


// Transaksi/history/:id
const getHistoryTransfer = async (req, res, next) => {
  try {
    const { id: userID } = req.params;
    const nasabah = await Task.findOne({ _id: userID });
    const transaksi = await Transaksi.find({$or:[{norek : nasabah.noRek}, {'pengirim.rekening':nasabah.noRek}, {'penerima.rekening': nasabah.noRek}]}); // bisa menggunakan filter pada argumen fungsi find()
    res.render("history", { 
      transactions : transaksi, 
      user : nasabah 
    });
    // return res.status(200).json({ transaksi });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransferSaldo,
  createIsiSaldo,
  createTarikSaldo,
  getHistoryTransfer,
  getTransaction
};
