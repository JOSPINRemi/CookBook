import express from "express"
import { Recipe }  from "../models/Recipe.js"
import RecipeDao from "../dao/RecipeDao.js"
import 'dotenv/config';
import { authMiddleware } from "../middlewares/middlewares.js";

const recipes = express.Router();
const recipeDao = new RecipeDao();

recipes.get("/", (req, res) => {
    return res.json(recipeDao.getAll());
})

recipes.get("/:id", (req, res) => {
    const recipe = recipeDao.findById(req.params.id);
    return recipe === undefined ? res.sendStatus(404) : res.json(recipe);
});

recipes.post("/", authMiddleware,  (req, res) => {
    const { name, description, instruction, ingredients } = req.body;
    const recipe = new Recipe(null, name, description, instruction, ingredients);
    return res.json(recipeDao.save(recipe));
});

recipes.put("/:id", authMiddleware,  (req, res) => {
    const { id, name, description, instruction, ingredients } = req.body;
    if(req.params.id != id) res.sendStatus(409);
    let recipe = new Recipe(id, name, description, instruction, ingredients);
   return recipeDao.updateRecipe(recipe) ? res.sendStatus(200) : res.status(400).json({code: 400, message: "issue encountered during the update of the recipe"})
});

recipes.delete("/:id", authMiddleware,  (req, res) => {
    recipeDao.deleteRecipe(req.params.id);
    res.sendStatus(200);
});







export default recipes