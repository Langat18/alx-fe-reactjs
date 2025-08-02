import useRecipeStore from "./recipeStore";
import { Link } from "react-router-dom";

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) =>
    state.favorites.map((id) => recipes.find((r) => r.id === id))
  );

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        favorites.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;