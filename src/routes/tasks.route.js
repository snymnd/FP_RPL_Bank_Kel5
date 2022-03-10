const express = require("express");
const router = express.Router();

const {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getSaldo,
  getUpdateUser
} = require("../controllers/tasks");

router.route("/")
  .get(getAllUser)

router.route("/add")
  .get( (req, res) => {
    res.render('register')}
  )
  .post(createUser);
router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
  // .put(editTask);

//for html need
router
  .route("/update/:id")
  .get(getUpdateUser)
  .post(updateUser);

router
  .route("/delete/:id")
  .get(deleteUser)



module.exports = router;
