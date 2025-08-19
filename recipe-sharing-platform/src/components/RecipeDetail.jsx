import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, ChefHat, ArrowLeft, Star, Heart, PrinterIcon } from 'lucide-react';
import recipesData from './src/data.json';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        // Find recipe by ID from imported data
        const foundRecipe = recipesData.find(r => r.id === parseInt(id));
        setRecipe(foundRecipe);
        setCompletedSteps(new Set()); // Reset completed steps when recipe changes
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const toggleStepCompletion = (stepIndex) => {
    setCompletedSteps(prev => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(stepIndex)) {
        newCompleted.delete(stepIndex);
      } else {
        newCompleted.add(stepIndex);
      }
      return newCompleted;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipe Not Found</h2>
          <p className="text-gray-600 mb-4">The recipe you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-2"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Recipes
          </button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <ChefHat className="mr-3 text-orange-500" size={32} />
            Recipe Share
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recipe Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{recipe.title}</h1>
                <p className="text-lg opacity-90">{recipe.description}</p>
              </div>
            </div>
          </div>

          {/* Recipe Stats */}
          <div className="p-6 bg-gray-50 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Clock className="mx-auto mb-2 text-orange-500" size={24} />
                <p className="text-sm text-gray-500">Cook Time</p>
                <p className="font-semibold">{recipe.cookTime}</p>
              </div>
              <div className="text-center">
                <Users className="mx-auto mb-2 text-orange-500" size={24} />
                <p className="text-sm text-gray-500">Servings</p>
                <p className="font-semibold">{recipe.servings}</p>
              </div>
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </span>
                <p className="text-sm text-gray-500 mt-1">Difficulty</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Star className="text-yellow-400 fill-yellow-400 mr-1" size={20} />
                  <span className="font-semibold">{recipe.rating}</span>
                </div>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                  {recipe.ingredients.length}
                </span>
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                  {recipe.instructions.length}
                </span>
                Instructions
              </h2>
              <div className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <div
                    key={index}
                    className={`flex items-start p-4 border rounded-lg transition-all group cursor-pointer ${
                      completedSteps.has(index)
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50'
                    }`}
                    onClick={() => toggleStepCompletion(index)}
                  >
                    <span className={`rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-0.5 font-bold flex-shrink-0 transition-colors ${
                      completedSteps.has(index)
                        ? 'bg-green-500 text-white'
                        : 'bg-orange-500 text-white group-hover:bg-orange-600'
                    }`}>
                      {completedSteps.has(index) ? '✓' : index + 1}
                    </span>
                    <p className={`leading-relaxed ${
                      completedSteps.has(index) ? 'text-green-700 line-through' : 'text-gray-700'
                    }`}>
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">
                    {completedSteps.size} of {recipe.instructions.length} steps
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedSteps.size / recipe.instructions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
              isSaved 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            <Heart size={20} className={`mr-2 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? 'Saved!' : 'Save Recipe'}
          </button>
          <button 
            onClick={handlePrint}
            className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <PrinterIcon size={20} className="mr-2" />
            Print Recipe
          </button>
        </div>
      </main>
    </div>
  );
}

export default RecipeDetail;