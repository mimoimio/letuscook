import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the SQLite database
const dbPromise = open({
    filename: './recipes.db',
    driver: sqlite3.Database,
});

// This function stores the recipe in the database
async function storeRecipeInDB(id) {
    const db = await dbPromise;
    try {
        await db.run(
            `INSERT INTO recipes (id)
      VALUES (?)`,
            [id]
        );
    } catch (error) {
        throw new Error('Failed to store recipe');
        // console.error(error)
    }
}
// This function retrieve the recipe in the database
async function retrieveRecipeInDB() {
    const db = await dbPromise;
    try {
        const recipes = await db.all(`SELECT * FROM recipes`);
        return recipes;
    } catch (error) {
        throw new Error('Failed to retrieve recipes');
    }

}

export async function POST(request) {
    const id = await request.json(); // Get the recipe data from the request body

    try {
        await storeRecipeInDB(id);
        return new Response('Recipe saved successfully', { status: 200 });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
}



export async function GET(request) {
    try {
        const recipes = await retrieveRecipeInDB();
        return new Response(recipes, { status: 200 });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
}
