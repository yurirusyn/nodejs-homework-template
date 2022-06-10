const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;
console.log(DB_HOST);

// mongoose
//   .connect(DB_HOST)
//   .then(() => console.log("data connect ok"))
//   .catch((error) => console.log(error.massage));

const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() => console.log("data connect ok"))
  .then(() => app.listen(PORT))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
