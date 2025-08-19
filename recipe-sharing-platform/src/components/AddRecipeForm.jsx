import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, ArrowLeft } from 'lucide-react';

function AddRecipeForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', ingredients: '', steps: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
    else if (formData.ingredients.trim().split('\n').filter(i => i.trim()).length < 2) {
      newErrors.ingredients = 'At least 2 ingredients are required';
    }
    if (!formData.steps.trim()) newErrors.steps = 'Preparation steps are required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Recipe Submitted:', formData);
      navigate('/');
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeft size={20} className="mr-2" /> Back to Recipes
          </button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <ChefHat className="mr-3 text-orange-500" size={32} /> Add New Recipe
          </h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Recipe Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients (one per line)</label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                rows="5"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
              {errors.ingredients && <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>}
            </div>

            <div>
              <label htmlFor="steps" className="block text-sm font-medium text-gray-700">Preparation Steps (one per line)</label>
              <textarea
                id="steps"
                name="steps"
                value={formData.steps}
                onChange={handleChange}
                rows="5"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
              {errors.steps && <p className="mt-1 text-sm text-red-600">{errors.steps}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Submit Recipe
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddRecipeForm;