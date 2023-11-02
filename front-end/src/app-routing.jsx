import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RecipeList from "./components/recipe/RecipeList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //TODO add children to App element
    children: [{ path: "/", element: <RecipeList /> }],
  },
]);

export default router;
