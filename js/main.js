"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Maayan Grolman
 */
// Element från DOM
const formEl = document.querySelector("#searchform");
const searchFieldInputEl = document.querySelector("#search");
const errorEl = document.querySelector("#error");

// Eventlyssnare
formEl.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validateForm()) {
    fetchRecipe();
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

// Funktion för att visa felmeddelanden
function displayError() {
  console.log("Visar felmeddelanden");

  const paragraphEl = document.createElement("p");
  paragraphEl.textContent = error;
  errorEl.appendChild(paragraphEl);
}

// Funktion för hämtning av API
async function fetchRecipe() {
  console.log("Hämtar recept");

  await fetch("https://dummyjson.com/recipes?limit=1&select=name,image")
    .then((res) => res.json())
    .then(console.log);
}
