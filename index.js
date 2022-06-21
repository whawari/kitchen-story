const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const serverRouter = require("./routes/server");

app.use("/server", serverRouter);

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
