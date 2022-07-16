import "./styles.css";
import apiCalls from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import RecipeRepository from "../src/classes/RecipeRepository";
import Recipe from "../src/classes/Recipe";
import User from "../src/classes/User-class";
//import "../data/users.js";
import recipeData from "./data/recipes";
console.log(recipeData);
//import "../data/ingredients.js";

//Click on the allRecipes button
// Create a list of recipe names
// Click on a recipe
// Display title, directions, ingredients needed and total cost, picture
const allRecipes = document.getElementById();
//allRecipes is the main recipe button on the main page
const allRecipeGrid = document.querySelector(".")
const recipeByIngredient = document.getElementById(); //recipeByIngredient is available when we click on the pantry button
const savedRecipes = document.getElementById(); // saveRecipe will be on the main page and will take you to saved recipes
const savedRecipeGrid = document.querySelector(".recipe-tile-grid")
const currentRecipe = document.getElementById(); // currentRecipe will be whatever recipe is chosen and will open the entire recipe availabe on all pages except the main page
const recipeByName = document.getElementById(); // tide to the input box
const category = document.getElementById();
const home = document.getElementById();
const pantry = document.getElementById();
const breakfastRecipe = document.getElementById();
const lunchRecipes = document.getElementById();
const dinnerRecipes = document.getElementById();

window.addEventListener("load", homeView);
allRecipes.addEventListener("click", functionAll);
breakfastRecipe.addEventListener("click", functionBreakfast);
lunchRecipes.addEventListener("click", functionLunch);
dinnerRecipes.addEventListener("click", functionDinner);
recipeByIngredient.addEventListener("click", functionrecipeByIngredient);
savedRecipes.addEventListener("click", functionSavedRecipes);
currentRecipe.addEventListener("click", functionCurrentRecipe);
recipeByName.addEventListener("click", functionRecipeByName);
recipeByCategory.addEventListener("click", functionRecipeByCategory);
category.addEventListener("click", functioncurrentRecipe);
home.addEventListener("click", functionCategory);
pantry.addEventListener("click", functionPantry);

console.log("Hello world");

function viewElement(element) {
  element.classList.remove("hidden");
}

function hideElement(element) {
  element.classList.add("hidden");
}

function homeView() {
  hideElement(filterPanel);
  hideElement(recipeTileGrid);
  hideElement(savedRecipes);
}

// As a user, I should be able to view a list of all recipes.
// click on button
// hide main page
// show list of recipes
// ----we want this to display the grid of images and recipe names

// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.
// We need to build a card/page to show this information
// Do we want it to have a name above image, above ingredients, above directions
// click recipe
// hide grid
// show recipe card
// ---- Make new card with title, image, and directions
// ---- Updates left menu to hide filters, but show ingredients needed for this recipe
// ---- do we want

// Do we want to build a pantry page that has updatable values for what the user has?
// ---- Pantry button displays message that it is under construction

// As a user, I should be able to add/remove a recipe to a list of recipes to cook
// click saved recipes
// hide main page
// show grid of saved recipes
// functionality to save or delete, similar to book covers

//Make a class for saved recipes?
//Add save recipe button to recipe card.
//Save button adds save class to recipe card.
//Removes save button and adds delete button.
//If recipe card id contains "save" push to array.
//Delete button will search saved array for recipe id and remove it.
//Update saved grid

//let recipeCard = new Recipe(recipeInfo);
//event listener
/*
let recipeTile = document.querySelector(".recipe-tile") - line 91;
function addToCook(recipe) {
    let newRecipeCard = <section class="recipe-tile">
          <h3>${recipeCard.name}</h3>
          <src="">${recipeCard.image}</src>
        </section>;
    savedRecipeGrid.innerHTML += newRecipeCard;
    return newRecipeCard;
*/