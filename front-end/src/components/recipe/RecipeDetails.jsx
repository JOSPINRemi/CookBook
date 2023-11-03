import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteRecipe, fetchRecipe, setFormMode } from "./recipeSlice.js";
import { useEffect } from "react";

const RecipeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const recipe = useSelector((state) => state.recipes.selectedRecipe);

  const editForm = () => {
    dispatch(setFormMode("edit"));
    console.log(recipe);
  };

  const deleteSelectedRecipe = () => {
    if (
      confirm(`Êtes-vous sûr de vouloir supprimer la recette ${recipe.name}`)
    ) {
      dispatch(deleteRecipe(recipe.id));
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(fetchRecipe(id));
  }, []);

  return (
    <div className="col">
      <div className="card bg-dark text-light border border-light rounded">
        <div className="card-header d-flex align-items-center">
          <span>{recipe?.name}</span>
          <>
            <Link
              to={`/edit/${recipe?.id}`}
              className="p-2 py-1 btn btn-outline-warning ms-auto"
              onClick={() => editForm()}
            >
              <i className="bi bi-pencil-square"></i>
            </Link>
            <button
              className="p-2 py-1 btn btn-outline-danger ms-2"
              onClick={deleteSelectedRecipe}
            >
              <i className="bi bi-trash"></i>
            </button>
          </>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-dark text-light d-flex">
              <b className="me-auto">Description: </b>
              {recipe?.description}
            </li>
            <li className="list-group-item bg-dark text-light d-flex">
              <b className="me-auto">Ingrédients: </b>
              {recipe?.ingredients}
            </li>
            <li className="list-group-item bg-dark text-light d-flex">
              <b className="me-auto">Instructions: </b>
              {recipe?.instruction}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
