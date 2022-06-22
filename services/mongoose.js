const mongoose = require("mongoose");

const main = async () => {
  await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);

  console.log("Connected to database");
};

main().catch((error) => console.log("Error connecting to database", error));
