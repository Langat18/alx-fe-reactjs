import React from 'react';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Recipe Sharing App</h1>
      
      <div className="max-w-4xl mx-auto">
        <AddRecipeForm />
        <RecipeList />
      </div>
    </div>
  );
}

export default App;