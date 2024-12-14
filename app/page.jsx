"use client";
import Image from "next/image";
import { useState } from "react";
/*
* ueah
*/
export default function Home() {
  const [recipes, setRecipes] = useState([]); // Store fetched recipes
  const [input, setInput] = useState(""); // Store user input

  // Fetch recipes from Spoonacular API
  async function getRecipe(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const apiKey = process.env.REACT_APP_API_KEY; // Replace with your API key
    const ingredients = input; // Use the input string for the includeIngredients parameter
    const url = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${encodeURIComponent(
      ingredients
    )}&number=10&apiKey=${apiKey}`; // Set the URL dynamically

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();

      // Update state with fetched recipes
      setRecipes(data.results || []);
    } catch (error) {
      console.error(error);
      setRecipes([]); // Reset recipes on error
    }
  }

  return (
    <div className="flex flex-col text-black items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full h-full bg-white p-2 container">
        {/* Input Form */}
        <form onSubmit={getRecipe}>
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
        <div className="container p-2">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="p-4 border border-gray-300 rounded-lg my-2 flex items-center"
            >
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={300} // Set width to 40px
                height={300} // Set height to 40px
                className="rounded"
              />
              <h3 className="text-lg font-bold ml-4">{recipe.title}</h3>
              <p>{}</p>
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
