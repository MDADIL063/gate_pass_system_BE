const mongoose = require("mongoose");
const express = require("express");
const { dbConnect } = require("./services/dbService");

const app = express();
const cors = require("cors");
const routes = require("./routes/routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("dotenv").config();
/** */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}=${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

/**/

dbConnect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});

app.use("/", routes);
