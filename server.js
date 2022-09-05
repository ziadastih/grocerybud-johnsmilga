const express = require("express");
const app = express();
const grocery = require("./routes/routes");
const connectToDb = require("./connectToDb/connectToDb");
require("dotenv").config();
const port = 3000;

// =============setup the middleware =========
app.use(express.json());
app.use(express.static("./public"));
// ============route ========================
app.use("/api/v1/grocery", grocery);

const start = async () => {
  try {
    await connectToDb(process.env.mongoose_uri);
    app.listen(port, console.log(`server is listening on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
