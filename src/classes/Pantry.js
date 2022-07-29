class Pantry {
    constructor(user) {
        this.ingredientsOwned = user.pantry;
        console.log('this.ingredientsOwned: ', this.ingredientsOwned)
        this.ingredientsToBuy = [];
        this.ingredientsToCook = [];
    }
checkForIngredients(id, recipeData) {
    const currentRecipe = recipeData.find(recipe => recipe.id === id).ingredients;
    console.log('currentRecipe: ', currentRecipe)
    currentRecipe.forEach((ingredient) => {
        if (ingredient.id !== this.ingredientsOwned.ingredient) {
            this.ingredientsToBuy.push(ingredient.id)
        }
    })
    console.log('ingredientsToBuy: ', this.ingredientsToBuy)
    return this.ingredientsToBuy
}
} 


export default Pantry;