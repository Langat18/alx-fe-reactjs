import { useState, useEffect } from 'react';
import recipeData from './src/data.json';

function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden">
      <img 
        src={recipe.image} 
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200">
          {recipe.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {recipe.summary}
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium">
          View Recipe
        </button>
      </div>
    </div>
  );
}

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        setRecipes(recipeData || []);
        setLoading(false);
      } catch (error) {
        console.error('Error loading recipes:', error);
        setRecipes([]);
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading delicious recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">
            Recipe Sharing Platform
          </h1>
          <p className="text-gray-600 text-center mt-2 text-sm sm:text-base">
            Discover and share amazing recipes from around the world
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Featured Recipes
          </h2>
          <p className="text-gray-600">
            Explore our collection of {recipes.length} delicious recipes
          </p>
        </div>

        {/* This is where .map() is used */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {recipes.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No recipes found.</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Recipe Sharing Platform. Share the love of cooking!
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;