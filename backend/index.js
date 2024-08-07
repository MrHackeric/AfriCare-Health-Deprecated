import express from "express";
import routes from "./routes/users.js";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();

const port = 5000;

//middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan("dev"));

// routes
app.use("/api", routes);

 app.listen(port, ()=>{
   console.log(`Server is running on port ${port}`)
 });
