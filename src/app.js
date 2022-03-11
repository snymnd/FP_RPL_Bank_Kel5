const express = require('express')
const app = express()
const path = require("path");
const connectDB = require("./db/connect");
const dotenv = require("dotenv")
dotenv.config()

const port = process.env.PORT || 3000;

const index = require("./routes/index.route");
const tasks = require("./routes/tasks.route");
const saldo = require("./routes/saldo.route");
const transaksi = require("./routes/transaksi.route");

//gunakan ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views')) //membuat file views diakses respectively di folder yang sama 
app.use("/static", express.static("./public"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", index);
app.use("/user", tasks);
app.use("/saldo", saldo);
app.use("/transaksi", transaksi);

app.use('/', (req, res)=>{
  res.status(404)
  res.render("error", {
    status : 404,
    success: false,
    message: "page not found",
  });

})

app.use((err, req, res, next) => {
    res.status(500);
    res.render("error", {
      status: 500,
      success: false,
      message: err.message,
    });
  // return res.status(500).send({ success: false, message: err.message })
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