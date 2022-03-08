const Task = require("../models/Task.model");

const getSaldo = async (req, res) => {
    try {
      const { id: taskID } = req.params;
      const task = await Task.findOne({ _id: taskID },{
        email:0,
        name:0,
        NIK:0,
        alamat:0,
        noTelp:0,
        password:0,
        noRek:0,
        pinATM:0,
        saldo:1
      });
      if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
      }
      res.status(200).json({ task });
    } catch (error) {
      res.status(500).json({ msg: error }); // untuk handle jika id nya tidak valid
    }
  };

  module.exports = { getSaldo };