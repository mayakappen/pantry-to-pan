class Recipe {
  constructor(recipeInfo) {
    // this.recipeNameInfo = recipeInfo.newIngredients;
    this.id = recipeInfo.id;
    this.image = recipeInfo.image;
    this.ingredients = recipeInfo.ingredients;
    this.instructions = recipeInfo.instructions;
    this.name = recipeInfo.name;
    this.tags = recipeInfo.tags;
    this.ingredientsNeeded = [];
  }

  getIngredients(ingredientDetails) {
    const mergedIngredients = this.ingredients.reduce((acc, measurement) => {
      let name = ingredientDetails.find(
        (ingredient) => measurement.id === ingredient.id
      );
      let measurementInfo = `  ${measurement.quantity.amount} ${measurement.quantity.unit} ${name.name}`;
      acc.push(measurementInfo);
      return acc;
    }, []);
    mergedIngredients.forEach((ingredient) => {
      this.ingredientsNeeded.push(ingredient);
    });
    return mergedIngredients;
  }

  getInstructions() {
    return this.instructions;
  }

  getCost(ingredientDetails) {
    let totalCost = 0;
    let figureTotalCost = this.ingredients.map((ingredient) => {
      ingredientDetails.map((item) => {
        if (ingredient.id === item.id) {
          totalCost += ingredient.quantity.amount * item.estimatedCostInCents;
        }
      });
    });
    return `$${(totalCost / 100).toFixed(2)}`;
  }
}

export default Recipe;
