import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RecipeDetails from "./components/recipe/RecipeDetails";
import RecipeForm from "./components/recipe/RecipeForm";
import RecipeList from "./components/recipe/RecipeList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //TODO add ingredient elements
    children: [
      { path: "/", element: <RecipeList /> },
      { path: "/:id", element: <RecipeDetails /> },
      { path: "/add", element: <RecipeForm /> },
      { path: "/edit/:id", element: <RecipeForm /> },
    ],
  },
]);

export default router;
