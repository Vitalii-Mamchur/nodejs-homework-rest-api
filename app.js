const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const api = require("./routes/api");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", api.contacts);
app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message });
});

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT);
    console.log(
      `Server running. Use our API on port: ${PORT}.\nDatabase connection successful`
    );
  })
  .catch(() => process.exit(1));

module.exports = app;
