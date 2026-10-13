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
  }
});
