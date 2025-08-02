import { useState } from "react";
import useRecipeStore from "./recipeStore";
import { Link } from "react-router-dom";
import AddRecipeForm from "./AddRecipeForm";

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const favorites = useRecipeStore((state) => state.favorites);
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );

  const [editingRecipe, setEditingRecipe] = useState(null);

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
  };

  const handleEditComplete = () => {
    setEditingRecipe(null);
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <div>
      <h2>Recipe List</h2>

      {editingRecipe && (
        <>
          <h3>Edit Recipe</h3>
          <AddRecipeForm
            recipeToEdit={editingRecipe}
            onFinishEdit={handleEditComplete}
          />
        </>
      )}

      {filteredRecipes.length === 0 ? (
        <p>No matching recipes found.</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <Link
              to={`/recipe/${recipe.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h3>
                {recipe.title}
                {isFavorite(recipe.id) && <span> ❤️</span>}
              </h3>
              <p>{recipe.description}</p>
            </Link>

            <button onClick={() => handleEdit(recipe)}>Edit</button>
            <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>

            <button
              onClick={() =>
                isFavorite(recipe.id)
                  ? removeFavorite(recipe.id)
                  : addFavorite(recipe.id)
              }
            >
              {isFavorite(recipe.id) ? "Remove Favorite" : "Add to Favorites"}
            </button>
          </div>
        ))
      )}

      {favorites.length > 0 && (
        <button onClick={generateRecommendations} style={{ marginTop: "20px" }}>
          Get Personalized Recommendations
        </button>
      )}
    </div>
  );
};

export default RecipeList;