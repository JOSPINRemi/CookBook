import { Data } from "../utils.js";
import IngredientDao from "./IngredientDao.js";
import { v4 as uuidv4 } from 'uuid';



export default class RecipeDao {
    constructor() {}

    getAll() {
        return Data.data.recipes;
    }

    save(recipe){
        
        const ingredientDao = new IngredientDao();

        recipe.ingredients.forEach((i) => {
            if(ingredientDao.findById(i.id) === undefined) {
                throw new Error(`unable to find ingredient with id: ${i.id}`);
            }
        })

        recipe.id = uuidv4();

        Data.data.recipes.push(recipe);
        Data.write();
        return recipe;
    }

    findById(id) {
        return Data.data.recipes.find((r) => (r.id == id));
    }

    deleteRecipe(id){
        Data.data.recipes = Data.data.recipes.filter((r) => (r.id != id));
        Data.write();
    }

    updateRecipe(recipeUpdate){
        const recipe = this.findById(recipeUpdate.id);
        console.log(recipeUpdate);
        if(recipe == undefined){
            return false;
        }
        recipe.name = recipeUpdate.name;
        recipe.description = recipeUpdate.description;
        recipe.instruction = recipeUpdate.instruction;
        recipe.ingredients = recipeUpdate.ingredients

        Data.write();
        return true;
    } 
}