import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the SQLite database
const dbPromise = open({
  filename: './recipes.db',
  driver: sqlite3.Database,
});

// This function stores the recipe in the database
async function storeRecipeInDB(recipe) {
  const db = await dbPromise;

  try {
    await db.run(
      `INSERT INTO recipes (id)
      VALUES (?)`,
      [recipe.id,]
    );
  } catch (error) {
    throw new Error('Failed to store recipe');
    // console.error(error)
  }
}

export async function POST(request) {
  const recipe = await request.json(); // Get the recipe data from the request body

  try {
    await storeRecipeInDB(recipe);
    return new Response('Recipe saved successfully', { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
