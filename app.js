const express = require("express");
const app = express();
const users = require("./routes/users");
const organizations = require("./routes/organizations");
const news = require("./routes/news");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/v1/users", users);
app.use("/api/v1/organizations", organizations);
app.use("/api/v1/news", news);

app.use(notFound);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`server is listening on http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
