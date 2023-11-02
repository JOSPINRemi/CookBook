import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "./recipeSlice";
import { Link } from "react-router-dom";
import RecipeDisplay from "./RecipeDisplay";

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  return (
    <div className="row my-3">
      <div className="rounded bg-dark text-light p-3">
        <div className="d-flex align-items-center">
          <h3>Recipes</h3>
          <Link
            to="/add"
            className="ms-auto btn btn-success"
            onClick={() => dispatch(setFormMode("add"))}
          >
            <i className="bi bi-plus-circle"></i> Add
          </Link>
        </div>
        <hr />
        {recipes.length === 0 ? (
          `Il n'y a pas de recettes`
        ) : (
          <div className="row row-cols-1 ">
            {recipes.map((recipe) => (
              <RecipeDisplay key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
