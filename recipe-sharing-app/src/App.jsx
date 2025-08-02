import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";
import RecommendationsList from "./components/RecommendationsList"; // 🆕 Import
import useRecipeStore from "./components/recipeStore"; // 🆕 Access Zustand store
import "./App.css";

const App = () => {
  const recommendations = useRecipeStore((state) => state.recommendations); // 🆕

  return (
    <Router>
      <div className="container">
        <h1>Recipe Sharing App</h1>
        <AddRecipeForm />
        <SearchBar />

        {/* 🆕 Show Recommendations if any */}
        {recommendations.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h2>Recommended for You</h2>
            <RecommendationsList />
          </div>
        )}

        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;