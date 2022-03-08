const express = require("express");
const router = express.Router();

const {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getSaldo
} = require("../controllers/tasks");

router.route("/")
  .get(getAllUser)
  .post(createUser);
router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
  // .put(editTask);


module.exports = router;
