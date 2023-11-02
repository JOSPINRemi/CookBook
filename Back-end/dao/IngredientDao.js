import { Data } from "../utils.js";
import { v4 as uuidv4 } from 'uuid';


export default class IngredientDao {
    constructor() {}

    getAll() {
        return Data.data.ingredients;
    }

    save(ingredient){
        ingredient.id = uuidv4();
        Data.data.ingredients.push(ingredient);
        Data.write();
        return ingredient;
    }

    findById(id) {
        return Data.data.ingredients.find((i) => (i.id == id));
    }

    deleteIngredient(id){
        Data.data.ingredients = Data.data.ingredients.filter((i) => (i.id != id));
        Data.write();
    }

    updateIngredient(ingredientUpdate){
        const ingredient = this.findById(ingredientUpdate.id);
        console.log(ingredientUpdate);
        if(ingredient == undefined){
            return false;
        }
        ingredient.name = ingredientUpdate.name;
        ingredient.quantity = ingredientUpdate.quantity;

        Data.write();
        return true;
    } 
}