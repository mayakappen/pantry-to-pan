import "./styles.css";
import apiCalls from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";

//Click on the allRecipes button
// Create a list of recipe names
// Click on a recipe
// Display title, directions, ingredients needed and total cost, picture
const allRecipes = document.getElementById(); //allRecipes is the main recipe button on the main page
const recipeByIngredient = document.getElementById(); //recipeByIngredient is available when we click on the pantry button
const savedRecipes = document.getElementById(); // saveRecipe will be on the main page and will take you to saved recipes
const currentRecipe = document.getElementById(); // currentRecipe will be whatever recipe is chosen and will open the entire recipe availabe on all pages except the main page
const recipeByName = document.getElementById(); // tide to the input box
const category = document.getElementById();
const home = document.getElementById();
const pantry = document.getElementById();
const breakfastRecipe = document.getElementById();
const lunchRecipes = document.getElementById();
const dinnerRecipes = document.getElementById();

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
