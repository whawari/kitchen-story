const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

require("./services/mongoose");

const serverRouter = require("./routes/server");
const authRouter = require("./routes/auth");
const tokenRouter = require("./routes/token");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/server", serverRouter);
app.use("/auth", authRouter);
app.use("/token", tokenRouter);

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
