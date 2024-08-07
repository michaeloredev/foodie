import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getAllMeals() {
    // Simulate a slow database query
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    }); 

    //DB call to get all meals
    return db.prepare('SELECT * FROM meals').all();
}