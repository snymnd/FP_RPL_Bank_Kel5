const express = require('express')
const app = express()
const connectDB = require("./db/connect");
const dotenv = require("dotenv")
dotenv.config()

const port = process.env.PORT || 3000;

app.use(express.json())

//routes


app.use('/', (req, res)=>{
  res.status(404)
  return res.status(404).send({ success: false, message: "page hhghg not found" })
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