import express from "express";
import { connectToDatabase } from "./src/backend/config/database.js";
import UserRoutes from "./src/backend/routes/UserRoutes.js";
import bodyParser from 'body-parser'; 
import cors from 'cors'
import morgan from 'morgan'

const app = express();

const port = 5000


//middleware
app.use(cors())
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan("dev"));


// routes
app.use('/api', UserRoutes)

const startServer = async () => {
  try {
    await connectToDatabase();
    // Start your server or other initializations
    app.listen(port, () => {
      console.log("Server is running on port 5000");
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
