class Pantry {
    constructor(user) {
        this.ingredientsOwned = user.pantry;
        this.ingredientsToBuy = [];
    }
checkForIngredients(id, recipeData) {
    const currentRecipe = recipeData.find(recipe => recipe.id === id).ingredients;
    currentRecipe.forEach((ingredient) => {
        if (ingredient.id !== this.ingredientsOwned.ingredient) {
            this.ingredientsToBuy.push(ingredient.id)
        }
    })
    return this.ingredientsToBuy
    }
} 


export default Pantry;