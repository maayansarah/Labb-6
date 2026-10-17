"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Maayan Grolman
 */

// Element från DOM
const formEl = document.querySelector("#searchform");
const searchFieldInputEl = document.querySelector("#search");
const errorEl = document.querySelector("#error");
const messageSectionEl = document.querySelector("#message");
const recipeSectionEl = document.querySelector("#recipe");

// Eventlyssnare
formEl.addEventListener("submit", async function (event) {
  event.preventDefault();
  if (validateForm()) {
    const searchFieldInputValue = searchFieldInputEl.value.trim();
    const recipes = await fetchRecipes(searchFieldInputValue);
    displayRecipe(recipes);
  }
});

// Felmeddelanden
let error = "";

// Funktion för validering
function validateForm() {
  console.log("Validerar formulär");
  errorEl.innerHTML = "";

  const searchFieldInputValue = searchFieldInputEl.value.trim();
  if (searchFieldInputValue === "") {
    console.log("Sökord saknas");
    error = `Du måste skriva ett sökord`;
    displayError();
    return false;
  }

  return true;
}

// Funktion för att visa felmeddelande
function displayError() {
  console.log("Visar felmeddelanden");

  const paragraphEl = document.createElement("p");
  paragraphEl.textContent = error;
  errorEl.appendChild(paragraphEl);
}

// Funktion för hämtning av API
async function fetchRecipes(searchValue) {
  console.log("Hämtar recept");
  messageSectionEl.innerHTML = "";
  recipeSectionEl.innerHTML = "";
  try {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${searchValue}`,
    );

    const data = await response.json();
    console.log(data);

    return data.recipes;
  } catch (error) {
    console.log(error);

    const messageEl = document.createElement("p");
    messageEl.innerHTML = "Något gick fel. Försök igen";
    messageSectionEl.appendChild(messageEl);
  }
}

// Funktion för att visa recept
async function displayRecipe(recipes) {
  console.log(recipes);

  // Om något gick fel vid hämtning så kommer ingen array med recept finnas
  if (!recipes) {
    return;
  }

  if (recipes.length === 0) {
    const messageEl = document.createElement("p");
    messageEl.innerHTML = "Inget recept hittades";
    messageSectionEl.appendChild(messageEl);
  } else {
    // Visa det första receptet
    const recipe = recipes[0];

    const articleEl = document.createElement("article");
    const imgEl = document.createElement("img");
    const divEl = document.createElement("div");
    divEl.className = "recipe-info";

    // namn på recept
    const nameEl = document.createElement("h3");
    nameEl.textContent = `${recipe.name}`;
    articleEl.appendChild(nameEl);

    // bild
    imgEl.src = recipe.image;
    imgEl.alt = recipe.name;
    articleEl.appendChild(imgEl);

    // info
    const servingsEl = document.createElement("p");
    servingsEl.textContent = `Servings: ${recipe.servings}`;
    divEl.appendChild(servingsEl);

    const prepTimeMinutesEl = document.createElement("p");
    prepTimeMinutesEl.textContent = `Prep time: ${recipe.prepTimeMinutes} minutes`;
    divEl.appendChild(prepTimeMinutesEl);

    const cookTimeMinutesEl = document.createElement("p");
    cookTimeMinutesEl.textContent = `Cook time: ${recipe.cookTimeMinutes} minutes`;
    divEl.appendChild(cookTimeMinutesEl);

    const difficultyEl = document.createElement("p");
    difficultyEl.textContent = `Difficulty: ${recipe.difficulty}`;
    divEl.appendChild(difficultyEl);

    articleEl.appendChild(divEl);

    // ingredienser
    const ingredientsHeadEl = document.createElement("h4");
    ingredientsHeadEl.textContent = `Ingredients: `;
    articleEl.appendChild(ingredientsHeadEl);

    const ulEl = document.createElement("ul");
    recipe.ingredients.forEach((step) => {
      const liEl = document.createElement("li");
      liEl.textContent = step;
      ulEl.appendChild(liEl);

      articleEl.appendChild(ulEl);
    });

    // intruktioner
    const instructionsHeadEl = document.createElement("h4");
    instructionsHeadEl.textContent = `Instructions: `;
    articleEl.appendChild(instructionsHeadEl);

    const olEl = document.createElement("ol");
    recipe.instructions.forEach((step) => {
      const liEl = document.createElement("li");
      liEl.textContent = step;
      olEl.appendChild(liEl);

      articleEl.appendChild(olEl);
    });

    recipeSectionEl.appendChild(articleEl);
  }
}
