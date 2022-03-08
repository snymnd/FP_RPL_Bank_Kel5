const express = require("express");
const router = express.Router();

const {
    getSaldo
  } = require("../controllers/saldo");

router.route("/:id/saldo")
.get(getSaldo);

module.exports = router;