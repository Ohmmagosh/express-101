import mongoose from "mongoose";
import express from "express";
import dontenv from "dotenv";
import cors from "cors";

async function start() {
  try {
    dontenv.config();
    const app = express();

    app.use(cors());
    app.use(express.json());

    const mongoURI: string | undefined = process.env.MONGO_URI;
    const mongoDB: string | undefined = process.env.MONGO_DB;
    const PORT = process.env.PORT || 5000;

    if (!mongoURI || !mongoDB) {
      throw new Error("Mongo URI or DB is not provided");
    }
    app.get("/", (req, res) => {
      res.send("service is alive");
    });
    app.use("/users", require("./routes/user").router);

    app.listen(PORT, async () => {
      await mongoose.connect(mongoURI! +"/"+ mongoDB! + "?authSource=admin");
      console.log("Server is running on port", PORT);
    });
  } catch (error) {
    console.log("Error : ", error);
  }
}

start();
