const Task = require("../models/Task.model");
const randomize = require("randomatic");
const createUser = async (req, res) => {
  try {
    const {email, name, NIK, alamat, noTelp, password, saldo, pinATM} = req.body;
    const task = await Task.create({
        email,
        name,
        NIK,
        alamat,
        noTelp,
        password ,
        saldo,
        noRek: randomize("0", 10),
        pinATM,
    });
    //console.log(randomize("0", 10));
    // res.redirect('/')
    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getAllUser = async (req, res) => {
  try {
    const tasks = await Task.find({}); // bisa menggunakan filter pada argumen fungsi find()
    res.render('allUser', {
      users : tasks
    })
    // res.status(200).json({ tasks });
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
    res.redirect('/user')
    // res.status(200).json({ task: null, status: "success" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

/* metode patch */
// Update data diri user
const getUpdateUser = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    res.render("update",{
      user: task
    });
    // res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    res.redirect("/user")
    // res.status(200).json({ task });
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



module.exports = { createUser, getAllUser, getUser, updateUser, getUpdateUser ,deleteUser };
