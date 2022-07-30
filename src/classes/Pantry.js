class Pantry {
  constructor(user) {
    this.ingredientsOwned = user.pantry;
    this.ingredientsToBuy = [];
  }
  checkForIngredients(id, recipeData) {
    console.log("id", id);
    console.log("this.ingredientsOwned", this.ingredientsOwned);
    console.log("recipeData", recipeData);
    const currentRecipe = recipeData.find(
      (recipe) => recipe.id === id
    ).ingredients;
    currentRecipe.forEach((ingredient) => {
      if (ingredient.id !== this.ingredientsOwned.ingredient) {
        this.ingredientsToBuy.push(ingredient.id);
      }
    });
    console.log("this.ingredientsToBuy", this.ingredientsToBuy);
    //console.log("newRecipe", newRecipe.ingredients);
    return this.ingredientsToBuy;
  }
}

export default Pantry;
