"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [recipes, setRecipes] = useState([]); // Store detailed recipes
  const [input, setInput] = useState(""); // Store user input

  async function storeRecipe(recipe) {
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      if (response.ok) {
        alert('Recipe saved successfully');
      } else {
        throw new Error('Failed to save recipe');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe');
    }
  }

  // Simulate the response with a test JSON object
  function testgetRecipe(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const testRecipes = [
      {
        id: 1,
        title: "Spaghetti Carbonara",
        image: "",
        readyInMinutes: 20,
        servings: 4,
        nutrition: {
          nutrients: [
            { name: "Calories", amount: 200, unit: "kcal" },
            { name: "Fat", amount: 10, unit: "g" },
            { name: "Carbs", amount: 30, unit: "g" }
          ]
        }
      },
      {
        id: 2,
        title: "Chicken Salad",
        image: "",
        readyInMinutes: 15,
        servings: 2,
        nutrition: {
          nutrients: [
            { name: "Calories", amount: 150, unit: "kcal" },
            { name: "Fat", amount: 5, unit: "g" },
            { name: "Protein", amount: 20, unit: "g" }
          ]
        }
      }
    ];

    // Set the test data to recipes
    setRecipes(testRecipes);
  }

  // Fetch recipes from Spoonacular API
  async function getRecipe(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const apiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY; // Replace with your API key
    const ingredients = input; // Use the input string for the includeIngredients parameter
    const url = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${encodeURIComponent(
      ingredients
    )}&number=9&apiKey=${apiKey}`; // Set the URL dynamically

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        // Extract IDs from the results
        const recipeIds = data.results.map((recipe) => recipe.id).join(",");

        // Fetch detailed information
        const detailsUrl = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds}&includeNutrition=true&apiKey=${apiKey}`;
        const detailsResponse = await fetch(detailsUrl);

        if (!detailsResponse.ok) {
          throw new Error("Failed to fetch recipe details");
        }
        const detailedData = await detailsResponse.json();

        // Update state with detailed recipes
        setRecipes(detailedData);
      } else {
        setRecipes([]); // No recipes found
      }
    } catch (error) {
      console.error(error);
      setRecipes([]); // Reset recipes on error
    }
  }

  return (
    <div className="flex flex-col text-black items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full h-full bg-white p-2 container">
        {/* Input Form */}
        <form onSubmit={testgetRecipe}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)} // Update input state
            className="w-full p-2 border-2 border-black"
            placeholder="Enter your ingredients (e.g., tomato, cheese)"
          />
          <button
            type="submit"
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Get Recipes
          </button>
        </form>

        {/* Recipe List */}
        <div className="container p-2 grid grid-cols-3 gap-4 ">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="p-4 border border-gray-300 rounded-lg my-2 flex flex-col items-center"
              >
                {recipe.image ? (
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={300}
                    height={300}
                    className="rounded-xl"
                  />
                ) : (
                  <div className="w-[300px] h-[300px] bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-sm text-gray-500">Image not available</span>
                  </div>
                )}
                <div className="ml-4 w-full">
                  <h3 className="text-lg font-bold">{recipe.title}</h3>
                  <p className="text-sm text-gray-600">
                    Ready in {recipe.readyInMinutes} minutes | Servings: {recipe.servings}
                  </p>
                  <ul className="text-sm mt-2">
                    {recipe.nutrition?.nutrients?.slice(0, 3).map((nutrient) => (
                      <li key={nutrient.name}>
                        {nutrient.name}: {nutrient.amount}
                        {nutrient.unit}
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => storeRecipe(recipe)} className="bg-[#804] text-white px-2 rounded-full">
                  Save Recipe
                </button>
              </div>
            ))
          ) : (
            <p>No recipes found. Try different ingredients!</p>
          )}
        </div>
      </div>
    </div>
  );
}
