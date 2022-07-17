import "./styles.css";
import apiCalls from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import RecipeRepository from "../src/classes/RecipeRepository";
import recipeData from "./data/recipes";
import usersData from "./data/users";
import ingredientsData from "./data/ingredients";
import Recipe from "../src/classes/Recipe";
//import "../data/ingredients.js";

// 👇🏽 Global variables 👇🏽
let recipeRepo = new RecipeRepository(recipeData)


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

let allRecipeBtn = document.querySelector("#all-recipe-button");
let allRecipesView = document.querySelector(".filter-panel");
let homeBtn = document.querySelector("#home-button");
let homeView = document.querySelector(".home-view");
let savedRecipeBtn = document.querySelector("#saved-button");
let savedRecipesView = document.querySelector(".saved-recipes");
let pantryBtn = document.querySelector("#pantry-button");

const breakfastCategory = document.getElementById('breakfast');//ln 24-breakfast panel on home
const lunchCategory = document.getElementById('lunch');
const dinnerCategory = document.getElementById('dinner');

// 👇🏽 Event Handlers & Functions 👇🏽
// console.log("Hello world");
// window.addEventListener("load", homeView);
// button => button.addEventListener('click', event => this.method1(event, button))

// breakfastCategory.addEventListener("click", recipeByCategory('breakfast'));
// lunchCategory.addEventListener("click", recipeByCategory('lunch'));
// dinnerCategory.addEventListener("click", recipeByCategory('dinner'));
allRecipeBtn.addEventListener("click", showAllRecipes);
homeBtn.addEventListener("click", showHomeScreen);
savedRecipeBtn.addEventListener("click", showSavedRecipes);
pantryBtn.addEventListener("click", showPantry);



// 👇🏽 Filter recipes by tag
function recipeByCategory(tag) {
    //if receipeData.tag includes desired tag, then push recipe to recipeRepo.filtered (empty array in recipeRepository)

    recipeRepo.filterTag(tag)
    return recipeRepo.filtered
};


breakfastCategory.addEventListener("click", recipeByCategory('breakfast'));
lunchCategory.addEventListener("click", recipeByCategory('lunch'));
dinnerCategory.addEventListener("click", recipeByCategory('dinner'));
allRecipeBtn.addEventListener("click", showAllRecipes);
homeBtn.addEventListener("click", showHomeScreen);
savedRecipeBtn.addEventListener("click", showSavedRecipes);
pantryBtn.addEventListener("click", showPantry);


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
    homeView.innerHTML = `<button class="home-category-panel" id="breakfast">
        <h2>Breakfast</h2>
        <input type="image" alt="breakfastPic" src="${recipeByCategory('breakfast')[0][0].image}" id="breakfastImage" />
      </button>
      <section class="home-category-panel" id="lunch" id="lunchImage">
        <h2>Lunch</h2>
        <input type="image" alt="lunchPic" src="${recipeByCategory('lunch')[0][0].image}" id="lunchImage"/>
      </section>
      <section class="home-category-panel" id="dinner">
        <h2>Dinner</h2>
        <input type="image" alt="dinnerPic" src="${recipeByCategory('dinner')[0][1].image}" id="dinnerImage"/>
      </section>`
}

showHomeScreen();
recipeByCategory();
// console.log('recipeByCategory(): ', recipeByCategory('dinner'))

function showSavedRecipes() {
  const hideElements = [homeView, allRecipesView, savedRecipeBtn];
  const showElements = [savedRecipesView, homeBtn, allRecipeBtn];
  hideElements.forEach(element => element.classList.add("hidden"));
  showElements.forEach(element => element.classList.remove("hidden"));
}

function showPantry() {
    window.alert("This page is under construction!");
}

let recipeCard = new Recipe(recipeData[0]);
console.log(recipeCard);
//event listener
let recipeTile = document.querySelector(".recipe-tile");
function addRecipeCard(recipeCard) {
    let newRecipeCard = recipeData.map(singleRecipe => {return `<section class="recipe-tile">
          <h3>${singleRecipe.name}</h3>
          <img src="${singleRecipe.image}"></img></src>
        </section>;
        savedRecipeGrid.innerHTML += newRecipeCard;
        return newRecipeCard;`})
    return newRecipeCard;
}
    
    
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