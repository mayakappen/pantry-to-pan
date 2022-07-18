import "./styles.css";
import apiCalls from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import "./images/banner-design.png";
import RecipeRepository from "../src/classes/RecipeRepository";
import recipeData from "./data/recipes";
import usersData from "./data/users";
import ingredientsData from "./data/ingredients";
import Recipe from "../src/classes/Recipe";
//import "../data/ingredients.js";
// import {userAPIData, ingredientAPIData, recipeAPIData} from './apiCalls';

// 👇🏽 Global variables 👇🏽
let recipeRepo = new RecipeRepository(recipeData);
let userAPIData;
let ingredientAPIData;
let recipeAPIData;

// Promise.all([userAPIData, ingredientAPIData, recipeAPIData]).then(data => data.json()).catch(error => console.log(error));


// let newRecipe = new Recipe(recipeData)
// console.log(newRecipe)
// console.log(recipeRepo.filterTag('breakfast'))
//Click on the allRecipes button
// Create a list of recipe names
// Click on a recipe
// Display title, directions, ingredients needed and total cost, picture

//allRecipes is the main recipe button on the main page
//recipeByIngredient is available when we click on the pantry button
// saveRecipe will be on the main page and will take you to saved recipes
// currentRecipe will be whatever recipe is chosen and will open the entire recipe availabe on all pages except the main page
// tide to the input box

const allRecipeBtn = document.querySelector("#all-recipe-button");
const allRecipesView = document.querySelector(".filter-panel");
const homeBtn = document.querySelector("#home-button");
const homeView = document.querySelector(".home-view");
const savedRecipeBtn = document.querySelector("#saved-button");
const savedRecipesView = document.querySelector(".saved-recipes");
const pantryBtn = document.querySelector("#pantry-button");
const allRecipeGrid = document.querySelector(".recipe-tile-grid");
const recipeTile = document.querySelector(".recipe-tile");
const tileImage = document.getElementById("tileImage");
const recipePage = document.querySelector(".recipe-page");

const breakfastCategory = document.getElementById("breakfast"); //ln 24-breakfast panel on home
const lunchCategory = document.getElementById("lunch");
const dinnerCategory = document.getElementById("dinner");

// 👇🏽 Event Handlers & Functions 👇🏽
// console.log("Hello world");
// window.addEventListener("load", addRecipeCard);
// button => button.addEventListener('click', event => this.method1(event, button))

// breakfastCategory.addEventListener("click", recipeByCategory('breakfast'));
// lunchCategory.addEventListener("click", recipeByCategory('lunch'));
// dinnerCategory.addEventListener("click", recipeByCategory('dinner'));
allRecipeBtn.addEventListener("click", showAllRecipes);
homeBtn.addEventListener("click", showHomeScreen);
savedRecipeBtn.addEventListener("click", showSavedRecipes);
pantryBtn.addEventListener("click", showPantry);
recipeTile.addEventListener("click", viewRecipe);
//recipePage.addEventListener("click", viewRecipe);

// 👇🏽 Filter recipes by tag
function recipeByCategory(tag) {
  //if receipeData.tag includes desired tag, then push recipe to recipeRepo.filtered (empty array in recipeRepository)

  recipeRepo.filterTag(tag);
  return recipeRepo.filtered;
}

breakfastCategory.addEventListener("click", recipeByCategory("breakfast"));
lunchCategory.addEventListener("click", recipeByCategory("lunch"));
dinnerCategory.addEventListener("click", recipeByCategory("dinner"));
allRecipeBtn.addEventListener("click", showAllRecipes);
homeBtn.addEventListener("click", showHomeScreen);
savedRecipeBtn.addEventListener("click", showSavedRecipes);
pantryBtn.addEventListener("click", showPantry);

function showAllRecipes() {
  const hideElements = [homeView, allRecipeBtn, savedRecipesView];
  const showElements = [allRecipesView, homeBtn, savedRecipeBtn];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));
}

function showHomeScreen() {
  const hideElements = [allRecipesView, savedRecipesView, homeBtn];
  const showElements = [homeView, allRecipeBtn, savedRecipeBtn];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));
  homeView.innerHTML = `<button class="home-category-panel" id="breakfast">
        <h2>Breakfast</h2>
        <input type="image" alt="breakfastPic" src="${
          recipeByCategory("breakfast")[0][0].image
        }" id="breakfastImage" />
  </button>
      <button class="home-category-panel" id="lunch">
        <h2>Lunch</h2>
        <input type="image" alt="lunchPic" src="${
          recipeByCategory("lunch")[0][0].image
        }" id="lunchImage"/>
      </button>
      <button class="home-category-panel" id="dinner">
        <h2>Dinner</h2>
        <input type="image" alt="dinnerPic" src="${
          recipeByCategory("dinner")[0][1].image
        }" id="dinnerImage"/>
      </button>`;
}

showHomeScreen();
recipeByCategory();
// console.log('recipeByCategory(): ', recipeByCategory('dinner'))

function showSavedRecipes() {
  const hideElements = [homeView, allRecipesView, savedRecipeBtn];
  const showElements = [savedRecipesView, homeBtn, allRecipeBtn];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));
}

function showPantry() {
  window.alert("This page is under construction!");
}

let recipeCard = new Recipe(recipeData[0]);
//event listener
function addRecipeCards() {
  const allRecipies = recipeRepo.recipes.forEach((recipe) => {
    recipeTile.innerHTML += `<input type="image" src="${recipe.image}" id="${recipe.id}"/><h3>"${recipe.name}"</h3>`;
  });
  return allRecipies;
  //allRecipeGrid.innerHTML += recipeTile;
  //return newRecipeCard;
}
addRecipeCards(recipeData);

function viewRecipe(ev) {
  //console.log("recipeData", recipeData[1].id);
  // console.log("recipeRepo", recipeRepo.recipes);
  const hideElements = [homeView, allRecipesView, savedRecipesView];
  const showElements = [homeBtn, allRecipeBtn, savedRecipeBtn, recipePage];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));
  const targetRecipeId = parseInt(ev.target.id);

  recipeData.forEach((recipe) => {
    if (recipe.id === targetRecipeId) {
      const recipeInfo = recipeRepo.getById(targetRecipeId);
      const currentRecipe = new Recipe(recipeInfo);
      recipePage.innerHTML = `<h2 class="recipePageName">${recipe.name}</h2>
      <img src="${recipe.image}">
      <h4>
        <ol>
          ${recipe.instructions
            .map((instruction) => {
              return `<li>${instruction.instruction}</li>`;
            })
            .join("")}
        </ol>
      </h4>
      <h4>${currentRecipe.getIngredients(ingredientsData)}</h4>
      <h4>${currentRecipe.getCost()}</h4>`;
      console.log(recipe.ingredients[0].quantity);
    }
    //console.log(singleRecipeInstructions);
    //return singleRecipeInstructions;
    //console.log("recipedataID", recipeData.id);
  });
  //console.log("jgj", singleRecipeInstructions);
}

// function showCost() {

// }
// console.log("recipeCard", recipeCard);
// console.log(addRecipeCard(recipeData[0]));

/*

// As a user, I should be able to view a list of all recipes.
// show list of recipes
// ----we want this to display the grid of images and recipe names

// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.
// We need to build a card/page to show this information
// Do we want it to have a name above image, above ingredients, above directions
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



// addRecipeCard can be invoked by clicking breakfast, lunch, dinner, or all recipes, with b.l.d. having pre-selected filter

eventlistener on breakfast invokes addRecipeCard with filter applied.
view all recipes doesnt have a filter applied

to add to saved array, we need button to save recipe at bottom of recipe page, adds a saved class, and change add button to remove button, which will remove saved class

saved recipe grid will filter to only show recipes with saved class when we hit saved recipes button

*/
