const express = require("express");
const router = express.Router();

const {
  createTransferSaldo,
  createIsiSaldo,
  createTarikSaldo,
  getHistoryTransfer,
  getTransaction,
} = require("../controllers/transaksi");

router.route("/:id")
    .get(getTransaction)
router.route("/history/:id")
    .get(getHistoryTransfer);
router.route("/transfer/:id")
    .post(createTransferSaldo)
    
router.route("/isi/:id")
    .post(createIsiSaldo);
    
router.route("/tarik/:id")
    .post(createTarikSaldo);
      
module.exports = router;
