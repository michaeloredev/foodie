import classes from "./page.module.css";
import ImagePicker from "@/components/meals/image-picker";
import { shareMeal } from "@/lib/actions";

export default function ShareMealPage() {

  // async function shareMeal(formData) {
  //   // This creates a server action, which is garunteed to be executed on the server.  'async' is required for this to work.
  //   // formData should be passed to handle submitted data
  //   // !! THIS ONLY WORKS IN A NON 'use client' PAGE !!
  //   "use server";

  //   const meal = {
  //     creator: formData.get("name"),
  //     creator_email: formData.get("email"),
  //     title: formData.get("title"),
  //     summary: formData.get("summary"),
  //     instructions: formData.get("instructions"),
  //     image: formData.get("image"),
  //   };

  //   console.log(meal);
  // }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        {/* This action will be executed on the server, this is noted above*/}
        <form className={classes.form} action={shareMeal}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your Image" name="image" />
          <p className={classes.actions}>
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}
