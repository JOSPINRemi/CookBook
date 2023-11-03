import { Data } from "./utils.js";
import { resolve } from "path";
import express from "express";
import ingredients from "./routes/ingredients.js";
import recipes from "./routes/recipes.js";
import "dotenv/config.js"
import cors from "cors"

//console.log(process.env);
const DB_PATH = resolve("./data/db.json");
const PORT = 3000;

Data.file = DB_PATH;
Data.data = {ingredients: [], recipes: []};

const app = express();
app.use(express.json());
app.use(cors());

app.use("/ingredients", ingredients);
app.use("/recipes", recipes);

app.listen(process.env.PORT, () => {
    Data.read();
    console.log(`listening on: 127.0.0.1:${process.env.PORT}`);
})