const express = require("express");
const cors = require("cors");
const http = require("http");
const { PrismaClient } = require("@prisma/client");

const PORT = process.env.PORT;
require("dotenv").config();


const app = express();
const prisma = new PrismaClient();
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routes = require("./routes/routes");

app.use("/api/v1", routes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    status: "running...",
    message: "docs API can be found at /api-docs",
  }).stringfy;
});

async function connectToDb() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

connectToDb();

// const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Server started running on: " + " " + "http://localhost:" + PORT);
});