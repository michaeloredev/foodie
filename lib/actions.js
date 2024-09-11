"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meal";
import { revalidatePath } from "next/cache";

function isInvalidTest(text) {
  return text.trim() === "" || !text;
}

export async function shareMeal(preState, formData) {
  const meal = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };

  //you should provide server side validation here
  if (
    isInvalidTest(meal.creator) ||
    isInvalidTest(meal.title) ||
    isInvalidTest(meal.summary) ||
    isInvalidTest(meal.instructions) ||
    !meal.creator_email.includes("@") ||
    !meal.image || meal.image.size === 0
  ) {
    return{
      message: "Invalid input.",
    }
  }

  await saveMeal(meal);
  //revalidatePath(); --- will revalidate the cache for the meals page
  //By default it will just revalidate the cache for the current page, 'layout' takes care of nested pages
  revalidatePath("/meals", 'layout');
  redirect("/meals");
}
