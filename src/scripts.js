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
      ingredientsData = data[2].ingredientsData;
      usersData = data[0].usersData;
      recipeData = data[1].recipeData;
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
const savedRecipeBtn = document.querySelector("#saved-button");
const savedRecipesView = document.querySelector(".saved-recipes");
const pantryBtn = document.querySelector("#pantry-button");
const recipeTiles = document.querySelector(".recipe-tile-grid"); //changed to grid from recip-tile
const individualRecipeTile = document.querySelector(".recipe-tile");
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

// HELPER FUNCTIONS
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// VIEW/HIDE FUNCTION
function view(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

// HOME SCREEN
function showHomeScreen() {
  hide(filterPanel);
  hide(savedRecipesView);
  hide(homeBtn);
  view(homeView);
  view(allRecipeBtn);
  view(savedRecipeBtn);
}
showHomeScreen();

// SHOW RECIPIES
function showAllRecipes() {
  hide(homeView);
  hide(allRecipeBtn);
  hide(savedRecipesView);
  hide(recipePage);
  view(homeBtn);
  view(filterPanel);
  view(savedRecipeBtn);
  removeAllChildNodes(recipeTiles);
  addRecipeTiles(recipeRepo);
}

//GET A RANDOM USER FUNCTION
function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

//SAVED RECIPE SCREEN
function showSavedRecipes(event) {
  hide(homeView);
  hide(savedRecipeBtn);
  view(savedRecipesView);
  view(homeBtn);
  view(filterPanel);
  view(allRecipeBtn);
  recipeTiles.innerHTML = "";
  user.toCook.forEach((recipeId) => {
    const matchedRecipe = recipeRepo.recipes.find((recipe) => {
      return recipe.id === recipeId;
    });
    if (matchedRecipe) {
      recipeTiles.innerHTML += `<input type="image" src="${matchedRecipe.image}" id="${matchedRecipe.id}"/><h3>"${matchedRecipe.name}"</h3>`;
    }
  });
  //viewRecipeDetails(event);
}

function handleFavorite(event) {
  const favID = Number.parseInt(event.target.id.slice(4));
  console.log(typeof favID);
  user.saveRecipe(favID);
}

// SHOW PANTRY ITEMS
function showPantry() {
  window.alert("This page is under construction!");
}

//ADD A RECIPE CARD GRID
function addRecipeTiles(repo) {
  repo.recipes.forEach((recipe) => {
    recipeTiles.innerHTML += `<section class="recipe-title"><input type="image" class="individual-recipe-tile" src="${recipe.image}" id="${recipe.id}"/><h3>"${recipe.name}"</h3></section><div class="heart" id="fav-${recipe.id}">Fave</div>`;
  });
  const recipeTitles = document.querySelectorAll(".recipe-title");
  recipeTitles.forEach((recipeTitle) => {
    recipeTitle.addEventListener("click", viewRecipeDetails);
  });
  const favoriteHearts = document.querySelectorAll(".heart");
  favoriteHearts.forEach((favoriteHeart) => {
    favoriteHeart.addEventListener("click", handleFavorite);
  });
}

// Function for show recipe details page
function viewRecipeDetailsPage() {
  hide(homeView);
  hide(filterPanel);
  hide(savedRecipesView);
  view(homeBtn);
  view(allRecipeBtn);
  view(savedRecipeBtn);
  view(recipePage);
}

// VIEW RECIPE CARD FOR SHOW RECIPE
function viewRecipeDetails(event) {
  const targetRecipeId = parseInt(event.target.id);

  recipeData.forEach((recipe) => {
    if (recipe.id === targetRecipeId) {
      const recipeInfo = recipeRepo.getById(targetRecipeId);
      const currentRecipe = new Recipe(recipeInfo);

      recipePage.innerHTML = `<h2 class="recipePageName" id="${recipe.id}">${
        recipe.name
      }</h2>
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
      <h4>${currentRecipe.getCost(ingredientsData)}</h4>`;
    }
    viewRecipeDetailsPage();
  });
  //recipePage.innerHTML += `<button class="save-this-recipe">Save this recipe!</button>`;
  //showSavedRecipes();
  //viewRecipeDetailsPage();
}

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

// DISPLAY FILTERED ITEMS
function displayFiltered(repo) {
  returnFiltered(repo);
  if (checked.length === 0) {
    return showAllRecipes();
  } else {
    var filteredRepo = repo.filtered.pop();
    var filteredRecipes = filteredRepo.forEach((recipe) => {
      recipeTiles.innerHTML += ` <input type="image" src="${recipe.image}" id="${recipe.id}"/><h3>"${recipe.name}"</h3>`;
    });
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
