"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Favourites() {
    const [recipes, setRecipes] = useState([]); // Store detailed recipes

    // Fetch recipes from Spoonacular API
    useEffect(() => {
        async function getRecipes() {
            const apiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY;
            const detailsUrl = `https://api.spoonacular.com/recipes/informationBulk?ids=715415,715446,716004&includeNutrition=true&apiKey=${apiKey}`;
            try {
                const detailsResponse = await fetch(detailsUrl);

                if (!detailsResponse.ok) {
                    throw new Error("Failed to fetch recipe details");
                }
                const detailedData = await detailsResponse.json();
                setRecipes(detailedData); // Update state with fetched recipes
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        }

        getRecipes();
    }, []); // Empty dependency array ensures the API call runs only once

    return (
        <div className="flex flex-col text-black items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="w-full h-full bg-white p-2 container">
                {/* Header */}
                <div className="text-center mt-10">
                    <h1 className="font-bold text-4xl">Your Favorites</h1>
                </div>

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
                                <button
                                    onClick={() => storeRecipe(recipe)}
                                    className="bg-[#804] text-white px-2 rounded-full"
                                >
                                    Save Recipe
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No recipes found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
