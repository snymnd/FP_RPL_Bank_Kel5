const express = require('express')
const app = express()
const connectDB = require("./db/connect");
const dotenv = require("dotenv")
dotenv.config()

const port = process.env.PORT || 3000;

const tasks = require("./routes/tasks.route");
const saldo = require("./routes/saldo.route");
const transaksi = require("./routes/transaksi.route");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/user", tasks);
app.use("/saldo", saldo);
app.use("/transaksi", transaksi);

app.use('/', (req, res)=>{
  res.status(404)
  return res.status(404).send({ success: false, message: "page not found" })
})

app.use((err, req, res, next) => {
  return res.status(500).send({ success: false, message: err.message })
})

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}... with monogoose`));
  } catch (error) {
    console.log(error);
  }
}
start()