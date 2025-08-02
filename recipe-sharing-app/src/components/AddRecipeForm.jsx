import { useEffect, useState } from "react";
import useRecipeStore from "./recipeStore";

const AddRecipeForm = ({ recipeToEdit, onFinishEdit }) => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title);
      setDescription(recipeToEdit.description);
    }
  }, [recipeToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (recipeToEdit) {
      updateRecipe({
        ...recipeToEdit,
        title,
        description,
      });
      if (onFinishEdit) onFinishEdit();
    } else {
      addRecipe({ id: Date.now(), title, description });
    }

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">
        {recipeToEdit ? "Update Recipe" : "Add Recipe"}
      </button>
    </form>
  );
};

export default AddRecipeForm;