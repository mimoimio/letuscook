"use client";
import Image from "next/image";
import { useState } from "react";

export default function Favourites() {
    const [recipes, setRecipes] = useState([]); // Store detailed recipes

    async function retrieveRecipe() {
        try {
            const response = await fetch('/api/recipes');
            const recipes = response.json
            if (response.ok) {
                setRecipes(recipes)
            } else {
                throw new Error('Failed to save recipe');
            }
        } catch (error) {
            console.error('Error saving recipe:', error);
            alert('Failed to save recipe');
        }
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
                    ) : (<p>Enter Ingredients to start browsing recipes</p>)
                    }
                </div>
            </div>
        </div>
    );
}
