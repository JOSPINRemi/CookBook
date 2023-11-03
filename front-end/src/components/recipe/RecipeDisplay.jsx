import { Link } from "react-router-dom";

const RecipeDisplay = (props) => {
  const recipe = props.recipe;

  return (
    <div className="card bg-dark text-light border border-light rounded">
      <div className="card-header d-flex align-items-center">
        <span>{recipe.name}</span>
      </div>
      <div className="card-body">
        <span className="bg-dark text-light d-flex">
          <b className="me-auto">Description: </b>
          {recipe.description}
        </span>
      </div>
      <div className="car-footer ms-auto">
        <Link to={`/${recipe.id}`} className="btn btn-outline-info">
          <i className="bi bi-info-circle"></i> Détails
        </Link>
      </div>
    </div>
  );
};

export default RecipeDisplay;
