"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Explore() {
  const [recipes, setRecipes] = useState([]); // Store detailed recipes
  const [category, setCategory] = useState("appetizer"); // Default category
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch recipes from Spoonacular API based on category
  async function getRecipe(selectedCategory) {
    setLoading(true);
    setSearched(false);
    const apiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY; // Your API key
    const url = `https://api.spoonacular.com/recipes/complexSearch?type=${selectedCategory}&number=9&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch recipes");
      const data = await response.json();

      if (data.results?.length > 0) {
        const recipeIds = data.results.map((recipe) => recipe.id).join(",");
        const detailsUrl = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds}&includeNutrition=true&apiKey=${apiKey}`;
        const detailsResponse = await fetch(detailsUrl);
        if (!detailsResponse.ok) throw new Error("Failed to fetch recipe details");
        const detailedData = await detailsResponse.json();
        setRecipes(detailedData);
      } else setRecipes([]);
    } catch (error) {
      console.error(error);
      setRecipes([]);
    }finally{
      setLoading(false);
      setSearched(true);
    }
  }

  // Fetch recipes whenever the category changes
  useEffect(() => {
    getRecipe(category);
  }, [category]);

  // Function to save recipes to the database
  async function storeRecipe(recipe) {
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });
      if (response.ok) alert("Recipe saved successfully");
      else throw new Error("Failed to save recipe");
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Failed to save recipe");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-center mt-10">
        <h1 className="font-bold text-4xl">Explore Recipes</h1>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center mt-8">
        <div className="bg-pink-100 rounded-xl px-6 py-3 flex space-x-6">
          <button
            onClick={() => setCategory("appetizer")}
            className={`${
              category === "appetizer" ? "bg-white font-bold" : ""
            } text-black px-4 py-2 rounded-full`}
          >
            Appetisers
          </button>
          <button
            onClick={() => setCategory("main course")}
            className={`${
              category === "main course" ? "bg-white font-bold" : ""
            } text-black px-4 py-2 rounded-full`}
          >
            Main Course
          </button>
          <button
            onClick={() => setCategory("side dish")}
            className={`${
              category === "side dish" ? "bg-white font-bold" : ""
            } text-black px-4 py-2 rounded-full`}
          >
            Side Dish
          </button>
          <button
            onClick={() => setCategory("dessert")}
            className={`${
              category === "dessert" ? "bg-white font-bold" : ""
            } text-black px-4 py-2 rounded-full`}
          >
            Dessert
          </button>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-20">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="p-4 border border-gray-300 rounded-lg flex flex-col items-center"
            >
              {/* Recipe Image */}
              {recipe.image ? (
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-[300px] h-[300px] bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-sm text-gray-500">No Image</span>
                </div>
              )}

              {/* Recipe Info */}
              <div className="text-center mt-2">
                <h3 className="text-lg font-bold">{recipe.title}</h3>
                <p className="text-sm text-gray-600">
                  Ready in {recipe.readyInMinutes} minutes | Servings:{" "}
                  {recipe.servings}
                </p>
              </div>

              {/* Save Recipe Button */}
              <button
                onClick={() => storeRecipe(recipe)}
                className="mt-2 bg-pink-500 text-white px-4 py-1 rounded-full"
              >
                Save Recipe
              </button>
            </div>
          ))
        ) : (
          searched ? (<p className="text-center col-span-3 text-gray-600">
            No recipes found. Try selecting a different category!
          </p>) :  "" 
        )}
      </div>
    </div>
  );
}
