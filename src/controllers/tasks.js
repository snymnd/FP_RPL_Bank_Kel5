const Task = require("../models/Task.model");

const createUser = async (req, res) => {
  try {
    const {email, name, NIK, alamat, noTelp, password, saldo, noRek, pinATM} = req.body;
    const task = await Task.create({
        email,
        name,
        NIK,
        alamat,
        noTelp,
        password,
        saldo,
        noRek,
        pinATM,
    });
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getAllUser = async (req, res) => {
  try {
    const tasks = await Task.find({}); // bisa menggunakan filter pada argumen fungsi find()
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getUser = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID },{
      password: 0,
      _id:0
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error }); // untuk handle jika id nya tidak valid
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task: null, status: "success" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

/* metode patch */
// Update data diri user
const updateUser = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

/* metode put */
// const editTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//       overwrite: true, // ini yang dibutuhkan untuk method put
//     });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id: ${taskID}` });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };



module.exports = { createUser, getAllUser, getUser, updateUser, deleteUser };
