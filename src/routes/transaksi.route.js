const express = require("express");
const router = express.Router();

const {
  createTransferSaldo,
  createIsiSaldo,
  createTarikSaldo,
  getHistoryTransfer,
} = require("../controllers/transaksi");

router.route("/:id").get(getHistoryTransfer);

router.route("/transfer/:id")
    .post(createTransferSaldo)
    
router.route("/isi/:id")
    .post(createIsiSaldo);
    
router.route("/tarik/:id")
    .post(createTarikSaldo);
      
module.exports = router;
