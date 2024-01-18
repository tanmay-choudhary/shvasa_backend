const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
//console.log(process.env.DB_URL) ;
const dburl = process.env.DB_URL;
const app = express();

mongoose
  .connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const con = mongoose.connection;

con.on("open", () => {
  console.log("Connected to MongoDB...");
});

app.use(express.json());
app.use(cors());
const Agent = require("./routes/Agent");
const Ticket = require("./routes/Ticket");

app.use("/api", Agent);
app.use("/api", Ticket);

app.get("/", (req, res) => {
  res.send(" Server is Running! ");
});

app.get("/health", (req, res) => {
  res.json({ message: "server is working fine" });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
