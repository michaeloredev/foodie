import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getAllMeals() {
    // Simulate a slow database query
    await new Promise((resolve) => setTimeout(resolve, 2000));
        //throw new Error('Could not fetch meals');
    //DB call to get all meals
    return db.prepare('SELECT * FROM meals').all();
}

export function getMealBySlug(slug) {
 return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);   
}