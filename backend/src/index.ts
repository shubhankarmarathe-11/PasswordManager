import express from "express";
import cors from "cors"
import dotenv from "dotenv"
const mainRoute = require('./ExportsRoutes')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Backend with TypeScript is running!");
  });

app.use(mainRoute);

app.listen(PORT, () => {
    console.log(`Server running on http://192.168.5.28:${PORT}`);
});