import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getAllMeals() {
  // Simulate a slow database query
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //throw new Error('Could not fetch meals');
  //DB call to get all meals
  return db.prepare("SELECT * FROM meals").all();
}

export function getMealBySlug(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
    console.log(meal);
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`)
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Could not save image");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(`
            INSERT INTO meals
            (   title,
                slug,
                creator,
                creator_email,
                summary,
                instructions,
                image)
            VALUES(
                @title, 
                @slug,
                @creator,
                @creator_email,
                @summary,
                @instructions,
                @image)
        `).run(meal);
}
