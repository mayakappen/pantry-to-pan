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
const allRecipesView = document.querySelector(".filter-panel");
const homeBtn = document.querySelector("#home-button");
const homeView = document.querySelector(".home-view");
const savedRecipeBtn = document.querySelector("#saved-button");
const savedRecipesView = document.querySelector(".saved-recipes");
const pantryBtn = document.querySelector("#pantry-button");
const recipeTiles = document.querySelector(".recipe-tile-grid"); //changed to grid from recip-tile
//const tileImage = document.getElementById("tileImage");
const recipePage = document.querySelector(".recipe-page");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
//const tagSelectionBoxes = document.getElementById("filter-input-wrapper");
const searchBar = document.querySelector("#recipe-search");
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector(".input");

//const saveThisRecipeBtn = document.querySelector(".save-this-recipe");

// EVENT LISTENERS
window.addEventListener("load", getPromises);
allRecipeBtn.addEventListener("click", showAllRecipes);
homeBtn.addEventListener("click", showHomeScreen);
savedRecipeBtn.addEventListener("click", showSavedRecipes);
//saveThisRecipeBtn.addEventListener("click", saveThisRecipe);
pantryBtn.addEventListener("click", showPantry);
//recipeTile.addEventListener("click", viewRecipe);
checkboxes.forEach((box) => {
  box.checked = false;
  box.addEventListener("change", () => displayFiltered(recipeRepo));
});
//recipePage.addEventListener("click", (event) => {
// saveThisRecipe(event);
//});
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
  const hideElements = [allRecipesView, savedRecipesView, homeBtn];
  const showElements = [homeView, allRecipeBtn, savedRecipeBtn];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));
}
showHomeScreen();

// SHOW RECIPIES
function showAllRecipes() {
  const hideElements = [homeView, allRecipeBtn, savedRecipesView, recipePage];
  const showElements = [allRecipesView, homeBtn, savedRecipeBtn];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));
  removeAllChildNodes(recipeTiles);
  addRecipeTiles(recipeRepo);
}

//GET A RANDOM USER FUNCTION
function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

//SAVED RECIPE SCREEN
function showSavedRecipes() {
  const hideElements = [homeView, savedRecipeBtn, allRecipesView];
  const showElements = [
    allRecipesView,
    savedRecipesView,
    homeBtn,
    allRecipeBtn,
  ];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));
  recipeTiles.innerHTML = "";
  user.toCook.forEach((recipeId) => {
    const matchedRecipe = recipeRepo.recipes.find((recipe) => {
      return recipe.id === recipeId;
    });
    console.log("matched", matchedRecipe);
    if (matchedRecipe) {
      recipeTiles.innerHTML += `<input type="image" src="${matchedRecipe.image}" id="${matchedRecipe.id}"/><h3>"${matchedRecipe.name}"</h3>`;
    }
  });
}

function handleFavorite(event) {
  const favID = Number.parseInt(event.target.id.slice(4));
  console.log(typeof favID);
  user.saveRecipe(favID);
}
// ADD DELETE RECIPIES
// function saveThisRecipe(ev) {
//   console.log("currentRecipeLN117", currentRecipe);
//   user.recipeToCook(currentRecipe);
// }

// function removeThisRecipe(ev) {
//   user.removeRecipeToCook(currentRecipe);
// }

// SHOW PANTRY ITEMS
function showPantry() {
  window.alert("This page is under construction!");
}

//ADD A RECIPE CARD GRID
//maybe make this function a helper function that can be added to showAllRecipes or savedRecipes view
//because we can keep trying to interpolate this, or just invoke the function when needed
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
function viewRecipeDetailsPage(event) {
  const targetRecipeId = parseInt(event.target.id);
  if (event.target.classList.contains(targetRecipeId)) {
    hide(homeView);
    hide(allRecipesView);
    hide(savedRecipesView);
    show(homeBtn);
    show(allRecipeBtn);
    show(savedRecipeBtn);
    show(recipePage);
  }
  viewRecipeDetails();
}
// VIEW RECIPE CARD FOR SHOW RECIPE
function viewRecipeDetails() {
  // const hideElements = [homeView, allRecipesView, savedRecipesView];
  // const showElements = [homeBtn, allRecipeBtn, savedRecipeBtn, recipePage];
  // hideElements.forEach((element) => element.classList.add("hidden"));
  // showElements.forEach((element) => element.classList.remove("hidden"));
  // const targetRecipeId = parseInt(event.target.id);

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
  });
  //recipePage.innerHTML += `<button class="save-this-recipe">Save this recipe!</button>`;
  //showSavedRecipes();
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
  var filteredRepo = repo.filtered.pop();
  var filteredRecipes = filteredRepo.forEach((recipe) => {
    recipeTiles.innerHTML += ` <input type="image" src="${recipe.image}" id="${recipe.id}"/><h3>"${recipe.name}"</h3>`;
  });
  return filteredRecipes;
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
