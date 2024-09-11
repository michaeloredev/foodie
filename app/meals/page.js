import React, { Suspense } from "react";

import classes from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import { getAllMeals } from "@/lib/meal";

async function Meals(){
  const meals = await getAllMeals();
  return <MealsGrid meals={meals} />
}

export default function MealsPage() {

  return (
    <>
      <header className={classes.header}>
        <h1>
          Deliscious Meals Created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your fav recipe and start cooking. GO GO Food Time!</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your fav recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>...Fetching Meals</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
