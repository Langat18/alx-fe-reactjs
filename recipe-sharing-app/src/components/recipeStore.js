import { create } from "zustand";

const useRecipeStore = create((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  searchTerm: "",

  favorites: [],
  recommendations: [],

  addRecipe: (newRecipe) => {
    const updatedRecipes = [...get().recipes, newRecipe];
    const term = get().searchTerm.toLowerCase();
    const filtered = updatedRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term)
    );
    set({ recipes: updatedRecipes, filteredRecipes: filtered });
  },

  setRecipes: (recipes) => {
    const term = get().searchTerm.toLowerCase();
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term)
    );
    set({ recipes, filteredRecipes: filtered });
  },

  updateRecipe: (updatedRecipe) => {
    const updatedRecipes = get().recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    const term = get().searchTerm.toLowerCase();
    const filtered = updatedRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term)
    );
    set({ recipes: updatedRecipes, filteredRecipes: filtered });
  },

  deleteRecipe: (id) => {
    const updatedRecipes = get().recipes.filter((recipe) => recipe.id !== id);
    const term = get().searchTerm.toLowerCase();
    const filtered = updatedRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term)
    );
    const updatedFavorites = get().favorites.filter((favId) => favId !== id);
    set({
      recipes: updatedRecipes,
      filteredRecipes: filtered,
      favorites: updatedFavorites,
    });
  },

  setSearchTerm: (term) => {
    const filtered = get().recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term.toLowerCase())
    );
    set({ searchTerm: term, filteredRecipes: filtered });
  },

  // --- FAVORITES ---
  addFavorite: (recipeId) => {
    const currentFavorites = get().favorites;
    if (!currentFavorites.includes(recipeId)) {
      set({ favorites: [...currentFavorites, recipeId] });
    }
  },

  removeFavorite: (recipeId) => {
    const updatedFavorites = get().favorites.filter((id) => id !== recipeId);
    set({ favorites: updatedFavorites });
  },

  // --- RECOMMENDATIONS (Mock logic) ---
  generateRecommendations: () => {
    const state = get();
    const recommended = state.recipes.filter(
      (recipe) => state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    set({ recommendations: recommended });
  },
}));

export default useRecipeStore;