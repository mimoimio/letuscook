import Image from "next/image";

export default async function RecipeDetails({ params }) {
  const id = await params.recipeId; //dptkan ID
  console.log(id);
  // console.log(recipeId)
  const apiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY; // Replace with your API key
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
  );
  const information = await response.json();
  console.log(information);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-center mb-10 font-sans text-2xl">Recipe Name: {information.title}</h2>
      <Image
        src={information.image}
        width={500}
        height={500}
        alt="Recipe Image"
      />
      <p className="my-10">Recipe Time: {information.readyInMinutes} minutes</p>
      {/* Render the summary with HTML */}
      <div dangerouslySetInnerHTML={{ __html: information.summary }} className="px-10 text-wrap"/>
    </div>
  );
}