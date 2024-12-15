'use client'
import Image from "next/image";

export default async function RecipeDetails({ params }) {
  const id = await params.recipeId; //dptkan ID

  const apiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY; // Replace with your API key
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
  );
  const information = await response.json();

  async function storeRecipe() {
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
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

  return (
    <div className="w-full h-full items-center flex flex-col " >

      <button onClick={() => storeRecipe()} className="bg-[#804] text-white px-2 rounded-full">
        Save Recipe
      </button>
      <div className="container h-full flex flex-row gap-2 p-4 bg-[#fbcfe8c0] rounded-[1rem] shadow-xl">
        {/* Safeguard against empty strings in `information.image` */}
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