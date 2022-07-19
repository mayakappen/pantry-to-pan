class Recipe {
  constructor(recipeInfo) {
    this.id = recipeInfo.id;
    this.image = recipeInfo.image;
    this.ingredients = recipeInfo.ingredients;
    this.instructions = recipeInfo.instructions;
    this.name = recipeInfo.name;
    this.tags = recipeInfo.tags;
    this.ingredientsNeeded = [];
  }

  getIngredients(ingredients) {
    const ingredientIds = this.ingredients.map((ingredient) => {
      return ingredient.id;
    });
    const filteredIngredients = ingredients.filter((ingredient) => {
      if (ingredientIds.includes(ingredient.id)) {
        return ingredient;
      }
    });
    filteredIngredients.forEach((ingredient) => {
      this.ingredientsNeeded.push(ingredient);
    });
    const ingredientNames = this.ingredientsNeeded.map(
      (ingredient) => ingredient.name
    );
    return ingredientNames;
  }

  getInstructions() {
    return this.instructions;
  }

  getCost() {
    let totalCost = 0;
    let figureTotalCost = this.ingredients.forEach((ingredient) => {
      this.ingredientsNeeded.forEach((item) => {
        if (ingredient.id === item.id) {
          totalCost += ingredient.quantity.amount * item.estimatedCostInCents;
        }
      });
    });
    return `$${(totalCost / 100).toFixed(2)}`;
  }
}

export default Recipe;
