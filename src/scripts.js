import "./styles.css";
import apiCalls from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
// import RecipeRepository from "../src/classes/RecipeRepository";
import recipeData from "./data/recipes";
import usersData from "./data/users";
import ingredientsData from "./data/ingredients";
console.log(recipeData);
console.log(usersData);
console.log(ingredientsData);
//import "../data/ingredients.js";

//Click on the allRecipes button
// Create a list of recipe names
// Click on a recipe
// Display title, directions, ingredients needed and total cost, picture
//allRecipes is the main recipe button on the main page
//recipeByIngredient is available when we click on the pantry button
// saveRecipe will be on the main page and will take you to saved recipes
// currentRecipe will be whatever recipe is chosen and will open the entire recipe availabe on all pages except the main page
// tide to the input box

let allRecipeBtn = document.querySelector("#all-recipe-button");
let allRecipesView = document.querySelector(".filter-panel");
let homeBtn = document.querySelector("#home-button");
let homeView = document.querySelector(".home-view");
let savedRecipeBtn = document.querySelector("#saved-button");
let savedRecipesView = document.querySelector(".saved-recipes");
let pantryBtn = document.querySelector("#pantry-button");

allRecipeBtn.addEventListener("click", showAllRecipes);
homeBtn.addEventListener("click", showHomeScreen);
savedRecipeBtn.addEventListener("click", showSavedRecipes);
pantryBtn.addEventListener("click", showPantry)



console.log("Hello world");

function showAllRecipes() {
  const hideElements = [homeView, allRecipeBtn, savedRecipesView];
  const showElements = [allRecipesView, homeBtn, savedRecipeBtn];
  hideElements.forEach(element => element.classList.add("hidden"));
  showElements.forEach(element => element.classList.remove("hidden"));
}

function showHomeScreen() {
  const hideElements = [allRecipesView, savedRecipesView, homeBtn];
  const showElements = [homeView, allRecipeBtn, savedRecipeBtn];
  hideElements.forEach(element => element.classList.add("hidden"));
  showElements.forEach(element => element.classList.remove("hidden"));
}

function showSavedRecipes() {
  const hideElements = [homeView, allRecipesView, savedRecipeBtn];
  const showElements = [savedRecipesView, homeBtn, allRecipeBtn];
  hideElements.forEach(element => element.classList.add("hidden"));
  showElements.forEach(element => element.classList.remove("hidden"));
}

function showPantry() {
    window.alert("This page is under construction!");
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