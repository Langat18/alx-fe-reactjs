import { useState, useEffect } from 'react';
import recipeData from '../src/data.json';

// Remove the existing recipeData constant since we're importing it

function RecipeCard({ recipe }) {
  // ...existing code...
}

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        setRecipes(recipeData.recipes); // Update this line to use the imported data
        setLoading(false);
      } catch (error) {
        console.error('Error loading recipes:', error);
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  // ...rest of the existing code...
}

export default HomePage;