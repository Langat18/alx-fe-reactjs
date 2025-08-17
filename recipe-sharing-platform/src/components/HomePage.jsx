import { useState, useEffect } from 'react';

const recipeData = [
  {
    "id": 1,
    "title": "Spaghetti Carbonara",
    "summary": "A classic Italian pasta dish with eggs, cheese, bacon, and black pepper.",
    "image": "https://via.placeholder.com/300x200/FFB6C1/000000?text=Spaghetti+Carbonara"
  },
  {
    "id": 2,
    "title": "Chicken Tikka Masala",
    "summary": "Chunks of grilled chicken (tikka) cooked in a smooth buttery & creamy tomato based gravy.",
    "image": "https://via.placeholder.com/300x200/FFA07A/000000?text=Chicken+Tikka"
  },
  {
    "id": 3,
    "title": "Caesar Salad",
    "summary": "A green salad of romaine lettuce and croutons dressed with lemon juice, olive oil, egg, Worcestershire sauce, anchovies, garlic, Dijon mustard, Parmesan cheese, and black pepper.",
    "image": "https://via.placeholder.com/300x200/98FB98/000000?text=Caesar+Salad"
  },
  {
    "id": 4,
    "title": "Beef Stroganoff",
    "summary": "An originally Russian dish of sautéed pieces of beef served in a sauce with smetana (sour cream).",
    "image": "https://via.placeholder.com/300x200/DDA0DD/000000?text=Beef+Stroganoff"
  },
  {
    "id": 5,
    "title": "Chocolate Chip Cookies",
    "summary": "Classic homemade cookies with chocolate chips, perfect for any occasion.",
    "image": "https://via.placeholder.com/300x200/F4A460/000000?text=Chocolate+Cookies"
  },
  {
    "id": 6,
    "title": "Fish and Chips",
    "summary": "Traditional British dish of battered and fried fish with crispy chips.",
    "image": "https://via.placeholder.com/300x200/87CEEB/000000?text=Fish+and+Chips"
  },
  {
    "id": 7,
    "title": "Vegetable Stir Fry",
    "summary": "A healthy mix of fresh vegetables stir-fried with aromatic Asian sauces.",
    "image": "https://via.placeholder.com/300x200/90EE90/000000?text=Veggie+Stir+Fry"
  },
  {
    "id": 8,
    "title": "Margherita Pizza",
    "summary": "Classic Italian pizza topped with fresh tomatoes, mozzarella cheese, and basil.",
    "image": "https://via.placeholder.com/300x200/FFE4B5/000000?text=Margherita+Pizza"
  }
];

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
        setRecipes(recipeData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading recipes:', error);
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
      {/* Header Section */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Featured Recipes
          </h2>
          <p className="text-gray-600">
            Explore our collection of {recipes.length} delicious recipes
          </p>
        </div>

        {/* Responsive Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* No recipes fallback */}
        {recipes.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No recipes found.</p>
          </div>
        )}
      </main>

      {/* Footer */}
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