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
  }
}
