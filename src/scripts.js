import "./styles.css";
import { usersAPIData, ingredientsAPIData, recipeAPIData } from "./apiCalls";
import "./images/turing-logo.png";
import "./images/banner-design.png";
import RecipeRepository from "../src/classes/RecipeRepository";
import Recipe from "../src/classes/Recipe";
import User from "../src/classes/User-class";

let recipeRepo;
let user;
let recipeData;
let usersData;
let ingredientsData;

// FETCH CALLS
function getPromises() {
  Promise.all([usersAPIData, recipeAPIData, ingredientsAPIData]).then(
    (data) => {
      usersData = data[0].usersData;
      recipeData = data[1].recipeData;
      ingredientsData = data[2].ingredientsData;
      user = new User(usersData[getRandomIndex(usersData)]);
      recipeRepo = new RecipeRepository(recipeData);
      showHomeScreen();
    }
  );
}

// SELECTORS
const allRecipeBtn = document.querySelector("#all-recipe-button");
const filterPanel = document.querySelector(".filter-panel");
const homeBtn = document.querySelector("#home-button");
const homeView = document.querySelector(".home-view");
const breakfastPanel = document.querySelector("#breakfast-panel");
const lunchPanel = document.querySelector("#lunch-panel");
const dinnerPanel = document.querySelector("#dinner-panel");
const savedRecipeBtn = document.querySelector("#saved-button");
const savedRecipesView = document.querySelector(".saved-recipes");
const pantryBtn = document.querySelector("#pantry-button");
const pantryView = document.querySelector(".pantry-page");
const recipeTiles = document.querySelector(".recipe-tile-grid");
// const individualRecipeTile = document.querySelector(".recipe-tile");
const recipePage = document.querySelector(".recipe-page");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const searchBar = document.querySelector("#recipe-search");
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector(".input");

// EVENT LISTENERS
window.addEventListener("load", getPromises);
allRecipeBtn.addEventListener("click", showAllRecipes);
homeBtn.addEventListener("click", showHomeScreen);
savedRecipeBtn.addEventListener("click", showSavedRecipes);
pantryBtn.addEventListener("click", showPantry);
checkboxes.forEach((box) => {
  box.checked = false;
  box.addEventListener("change", () => displayFiltered(recipeRepo));
});
searchButton.addEventListener("click", filterByName);
searchInput.addEventListener("input", getInput);
allRecipeBtn.addEventListener("click", showAllRecipes);
homeBtn.addEventListener("click", showHomeScreen);
savedRecipeBtn.addEventListener("click", showSavedRecipes);
pantryBtn.addEventListener("click", showPantry);
breakfastPanel.addEventListener("click", showBreakfast);
lunchPanel.addEventListener("click", showLunch);
dinnerPanel.addEventListener("click", showDinner);

// HELPER FUNCTIONS
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function view(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

function showRecipeDetails() {
  const recipeTitles = document.querySelectorAll(".recipe-image");
  recipeTitles.forEach((recipeTitle) => {
    recipeTitle.addEventListener("click", viewRecipeDetails);
  });
}

function favoriteButton() {
  const favoriteHearts = document.querySelectorAll(".favBtn");
  favoriteHearts.forEach((favoriteHeart) => {
    favoriteHeart.addEventListener("click", handleFavorite);
  });
}

function handleFavorite(event) {
  const favID = Number.parseInt(event.target.id.slice(4));
  user.saveRecipe(favID);
}

function removeButton() {
  const removeFavorite = document.querySelectorAll(".removeButton");
  removeFavorite.forEach((removeButton) => {
    removeButton.addEventListener("click", handleRemove);
  });
}

function handleRemove(event) {
  const favID = Number.parseInt(event.target.id.slice(4));
  user.deleteRecipe(favID);
  showSavedRecipes();
}

//GET A RANDOM USER FUNCTION
function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

// HOME SCREEN
function showHomeScreen() {
  hide(filterPanel);
  hide(savedRecipesView);
  hide(homeBtn);
  hide(recipePage);
  hide(pantryView);
  view(homeView);
  view(allRecipeBtn);
  view(savedRecipeBtn);
  view(pantryBtn);
}
showHomeScreen();

// HOMEPAGE PANEL
function showBreakfast() {
  hide(homeView);
  hide(allRecipeBtn);
  hide(savedRecipesView);
  hide(recipePage);
  hide(pantryView);
  view(homeBtn);
  view(filterPanel);
  view(savedRecipeBtn);
  view(pantryBtn);
  removeAllChildNodes(recipeTiles);

  recipeRepo.filterTag("breakfast");
  var filteredRepo = recipeRepo.filtered.pop();
  var filteredRecipes = filteredRepo.forEach((recipe) => {
    recipeTiles.innerHTML += `
      <section class="recipe-title">
      <input class="recipe-image" type="image" src="${recipe.image}" id="${recipe.id}"/>
      <h3>"${recipe.name}"</h3>
      <button class="favBtn" role="button" id="fav-${recipe.id}">Favorite</button>
      </section>`;
  });
  showRecipeDetails();
  favoriteButton();
  return filteredRecipes;
}

function showLunch() {
  hide(homeView);
  hide(allRecipeBtn);
  hide(savedRecipesView);
  hide(recipePage);
  hide(pantryView);
  view(homeBtn);
  view(filterPanel);
  view(pantryBtn);
  view(savedRecipeBtn);
  removeAllChildNodes(recipeTiles);
  recipeRepo.filterTag("lunch");
  var filteredRepo = recipeRepo.filtered.pop();
  var filteredRecipes = filteredRepo.forEach((recipe) => {
    recipeTiles.innerHTML += `
      <section class="recipe-title">
      <input class="recipe-image" type="image" src="${recipe.image}" id="${recipe.id}"/>
      <h3>"${recipe.name}"</h3>
      <button class="favBtn" role="button" id="fav-${recipe.id}">Favorite</button>
      </section>`;
  });
  showRecipeDetails();
  favoriteButton();
  return filteredRecipes;
}

function showDinner() {
  hide(homeView);
  hide(allRecipeBtn);
  hide(pantryView);
  hide(savedRecipesView);
  hide(recipePage);
  view(homeBtn);
  view(filterPanel);
  view(pantryBtn);
  view(savedRecipeBtn);
  removeAllChildNodes(recipeTiles);
  recipeRepo.filterTag("dinner");
  var filteredRepo = recipeRepo.filtered.pop();
  var filteredRecipes = filteredRepo.forEach((recipe) => {
    recipeTiles.innerHTML += `
      <section class="recipe-title">
      <input class="recipe-image" type="image" src="${recipe.image}" id="${recipe.id}"/>
      <h3>"${recipe.name}"</h3>
      <button class="favBtn" role="button" id="fav-${recipe.id}">Favorite</button>
      </section>`;
  });
  showRecipeDetails();
  favoriteButton();
  return filteredRecipes;
}

// SHOW RECIPES
function showAllRecipes() {
  hide(homeView);
  hide(allRecipeBtn);
  hide(savedRecipesView);
  hide(recipePage);
  hide(pantryView);
  view(homeBtn);
  view(filterPanel);
  view(pantryBtn);
  view(savedRecipeBtn);
  removeAllChildNodes(recipeTiles);
  addRecipeTiles(recipeRepo);
}

//SAVED RECIPE SCREEN
function showSavedRecipes() {
  hide(homeView);
  hide(savedRecipeBtn);
  hide(recipePage);
  hide(pantryView);
  view(savedRecipesView);
  view(homeBtn);
  view(filterPanel);
  view(allRecipeBtn);
  view(pantryBtn);
  recipeTiles.innerHTML = "";
  user.toCook.forEach((recipeId) => {
    const matchedRecipe = recipeRepo.recipes.find((recipe) => {
      return recipe.id === recipeId;
    });
    if (matchedRecipe) {
      recipeTiles.innerHTML += `
      <section class="recipe-title">
      <input class="recipe-image" type="image" src="${matchedRecipe.image}" id="${matchedRecipe.id}"/>
      <h3>"${matchedRecipe.name}"</h3>
      <button class="removeButton" role="button" id="fav-${matchedRecipe.id}">Remove</button>
      </section>`;
    }
    showRecipeDetails();
    removeButton();
  });
}

//PUTS RECIPE TILES ON ALLRECIPEPAGE & BUTTON FOR SAVEDRECIPEPAGE
function addRecipeTiles(repo) {
  repo.recipes.forEach((recipe) => {
    recipeTiles.innerHTML += `
    <section class="recipe-title">
    <input class="recipe-image" type="image" src="${recipe.image}" id="${recipe.id}"/>
    <h3>"${recipe.name}"</h3>
    <button class="favBtn" role="button" id="fav-${recipe.id}">Favorite</button>
    </section>`;
  });
  showRecipeDetails();
  favoriteButton();
}

// VIEW RECIPE CARD FOR SHOW RECIPE
function viewRecipeDetails(event) {
  hide(homeView);
  hide(filterPanel);
  hide(savedRecipesView);
  hide(pantryView);
  view(homeBtn);
  view(allRecipeBtn);
  view(pantryBtn);
  view(savedRecipeBtn);
  view(recipePage);

  const targetRecipeId = parseInt(event.target.id);
  recipeData.forEach((recipe) => {
    if (recipe.id === targetRecipeId) {
      const recipeInfo = recipeRepo.getById(targetRecipeId);
      const currentRecipe = new Recipe(recipeInfo);

      recipePage.innerHTML = `
      <h2 class="recipePageName" id="${recipe.id}">${recipe.name}</h2>
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
      <h4>${currentRecipe.getCost(ingredientsData)}</h4>
      <button class="favBtn" role="button" id="fav-${
        recipe.id
      }">Favorite</button>`;
    }
  });
  favoriteButton();
}

// SHOW PANTRY ITEMS
function showPantry() {
  hide(homeView);
  hide(pantryBtn);
  hide(filterPanel);
  hide(savedRecipesView);
  view(pantryView);
  view(homeBtn);
  view(allRecipeBtn);
  view(savedRecipeBtn);
  view(recipePage);
  removeAllChildNodes(recipePage);
}

//~~~~~~~~~~ FILTER FUNCTIONS ~~~~~~~~
// CHECK BOXES
let checked = [];
function grabCheckboxValues() {
  checked = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) checked.push(checkbox.id);
  });
  return checked;
}

// FILTER FUNCTION CHECKBOX
function returnFiltered(repo) {
  grabCheckboxValues();
  recipeTiles.innerHTML = ``;
  checked.forEach((value) => {
    repo.filterTag(value);
  });
  return repo.filtered;
}

//DISPLAY FILTERED ITEMS
function displayFiltered(repo) {
  returnFiltered(repo);
  if (checked.length === 0) {
    return showAllRecipes();
  } else {
    var filteredRepo = repo.filtered.pop();
    var filteredRecipes = filteredRepo.forEach((recipe) => {
      recipeTiles.innerHTML += `
      <section class="recipe-title">
      <input type="image" class="recipe-image" src="${recipe.image}" id="${recipe.id}"/>
      <h3>"${recipe.name}"</h3>
      <button class="favBtn" role="button" id="fav-${recipe.id}">Favorite</button>
      </section>`;
    });
    showRecipeDetails();
    favoriteButton();
    return filteredRecipes;
  }
}

// FILTER BY NAME
function getInput() {
  let value = searchBar.value;
  return value;
}
function filterByName() {
  let input = getInput();
  let result = recipeRepo.filterName(input);
  if (input && input.trim().length > 0 && result) {
    showAllRecipes();
    recipeTiles.innerHTML = "";
    recipeTiles.innerHTML += ` <input type="image" src="${result.image}" id="${result.id}"/><h3>"${result.name}"</h3>`;
  } else {
    alert("No results found");
  }
  return result;
}
