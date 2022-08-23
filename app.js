const express = require("express");
const app = express();

const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users = require("./routes/users");
const organizations = require("./routes/organizations");
const news = require("./routes/news");
const stocks = require("./routes/stocks");
const newsSub = require("./routes/newsSub");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const cors = require("cors");
require("dotenv").config();

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/v1/users", users);
app.use("/api/v1/organizations", organizations);
app.use("/api/v1/news", news);
app.use("/api/v1/stocks", stocks);
app.use("/api/v1/newsSub", newsSub);

app.use(notFound);

const restPort = 8000;
const socketPort = 8001;

const startRest = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      restPort,
      console.log(`server is listening on http://localhost:${restPort}`)
    );
  } catch (error) {
    console.log(error);
  }
};

const startSocket = () => {
  io.on("connection", (socket) => {
    console.log("User Connected");
    socket.on("bid", (bid) => {
      console.log(bid);
      io.emit("bid", bid);
    });
  });
  server.listen(socketPort, "0.0.0.0", () => console.log("app started"));
};

startRest();
startSocket();
