const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/dcd";

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.once("open", () => console.log(`connect to monogo @ ${db.host}:${db.port}`));

db.on("error", (err) => {
  console.log("error fool");
  console.log(err);
});
