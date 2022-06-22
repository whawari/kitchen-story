const express = require("express");
require("dotenv").config();
require("./services/mongoose");

const app = express();
const port = process.env.PORT || 5000;
const serverRouter = require("./routes/server");
const authRouter = require("./routes/auth");

app.use(express.json());

app.use("/server", serverRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
