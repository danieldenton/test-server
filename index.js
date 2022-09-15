require("./models");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "This works!" });
});

// controllers
app.use("/api-v1/users", require("./controllers/api-v1/users"));

app.listen(PORT, () => console.log(`you're listening to ${PORT}`));
