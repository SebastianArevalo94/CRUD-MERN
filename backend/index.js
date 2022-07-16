import express from "express";
import cors from "cors";
import mongoose from "./database.js";
import router from "./routes/routes.js";  

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
 app.use(express.json());

 app.use('/games', router)

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});