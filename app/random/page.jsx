'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
  const [information, setInformation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY; // Replace with your API key
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch recipe data');
        }

        const data = await response.json();
        setInformation(data.recipes[0]); // Set the first recipe
      } catch (error) {
        console.error('Error fetching recipe:', error);
        alert('Failed to fetch recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []); // Run only once on component mount

  if (loading) {
    return <p>Loading...</p>; // Show loading state while data is being fetched
  }

  if (!information) {
    return <p>No recipe found.</p>; // Fallback if no recipe is available
  }

  return (
    <div className="w-full h-full items-center flex flex-col">
      <button onClick={() => storeRecipe()} className="bg-[#804] text-white px-2 rounded-full">
        Save Recipe
      </button>
      <div className="container h-full flex flex-row gap-2 p-4 bg-[#fbcfe8c0] rounded-[1rem] shadow-xl">
        {information.image ? (
          <Image
            src={information.image.trim() || null}
            width={500}
            height={500}
            alt="Recipe Image"
            className="bg-white rounded-xl max-h-[500px] flex-1 shadow-xl"
          />
        ) : (
          <p>No image available</p>
        )}
        <div className="flex flex-col w-full flex-[2] overflow-auto p-8">
          <h2 className="text-xl font-bold text-center w-full">Recipe Name: {information.title}</h2>
          <p>Recipe Time: {information.readyInMinutes} minutes</p>
          <div dangerouslySetInnerHTML={{ __html: information.summary }} />
        </div>
      </div>
    </div>
  );
}
