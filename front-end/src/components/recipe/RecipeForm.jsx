import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRecipe, editRecipe, setFormMode } from "./recipeSlice";

const RecipeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.recipes.formMode);
  const recipe = useSelector((state) => state.recipes.selectedProject);

  const nameRef = useRef();
  const descriptionRef = useRef();
  const instructionRef = useRef();
  const ingredientsRef = useRef();

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const instruction = instructionRef.current.value;
    // const ingredients = ingredientsRef.current.value;
    const ingredients = [];

    const newRecipe = {
      name,
      description,
      instruction,
      ingredients,
    };
    if (mode === "add") {
      dispatch(addRecipe(newRecipe));
    } else if (mode === "edit") {
      dispatch(editRecipe({ ...newRecipe, id: recipe.id }));
    }

    dispatch(setFormMode(""));
    navigate("/");
  };

  return (
    <>
      <h3>{mode} Recipe</h3>
      <hr />
      <form onSubmit={submitFormHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nom de la recette :
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            required
            ref={nameRef}
            defaultValue={recipe?.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description :
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            cols="30"
            rows="10"
            required
            ref={descriptionRef}
            defaultValue={recipe?.description}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="instruction" className="form-label">
            Instructions :
          </label>
          <textarea
            id="instruction"
            name="instruction"
            className="form-control"
            cols="30"
            rows="10"
            required
            ref={instructionRef}
            defaultValue={recipe?.instruction}
          ></textarea>
        </div>
        //TODO add ingredients inputfield
        <div className="text-end">
          <button
            className={`btn btn-${mode === "add" ? "success" : "warning"}`}
          >
            <i
              className={`bi bi-${
                mode === "edit" ? "pencil-square" : "plus-circle"
              }`}
            ></i>
            {mode}
          </button>
        </div>
      </form>
    </>
  );
};

export default RecipeForm;
