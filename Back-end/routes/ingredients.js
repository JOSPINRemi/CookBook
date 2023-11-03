import express from "express"
import { Ingredient }  from "../models/Ingredient.js"
import IngredientDao from "../dao/IngredientDao.js"
import 'dotenv/config';
import { authMiddleware } from "../middlewares/middlewares.js";

const ingredients = express.Router();
const ingredientDao = new IngredientDao();

ingredients.get("/", (req, res) => {
    return res.json(ingredientDao.getAll());
})

ingredients.get("/:id", (req, res) => {
    const ingredient = ingredientDao.findById(req.params.id);
    return ingredient === undefined ? res.sendStatus(404) : res.json(ingredient);
});

ingredients.post("/", authMiddleware, (req, res) => {
    const { name, quantity } = req.body;
    const ingredient = new Ingredient(null, name, quantity);
    return res.json(ingredientDao.save(ingredient));
});

ingredients.put("/:id", authMiddleware, (req, res) => {
    const { id, name, quantity } = req.body;
    if(req.params.id != id) res.sendStatus(409);
    let ingredient = new Ingredient(id, name, quantity);
    ingredientDao.updateIngredient(ingredient) ? res.sendStatus(200) : res.status(400).json({code: 400, message: "issue encountered during the update of the ingredient"})
});

ingredients.delete("/:id", authMiddleware,  (req, res) => {
    ingredientDao.deleteIngredient(req.params.id);
    res.sendStatus(200);
});







export default ingredients