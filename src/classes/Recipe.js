import ingredientsData from "../data/ingredients";

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
    const ingredientDetails = this.ingredients.reduce((acc, measurement) => {
      let name = ingredientsData.find(
        (ingredient) => measurement.id === ingredient.id
      );
      let measurementInfo = `  ${measurement.quantity.amount} ${measurement.quantity.unit} ${name.name}`;
      acc.push(measurementInfo);
      return acc;
    }, []);
    console.log(ingredientDetails);
    return ingredientDetails;
  }

  getInstructions() {
    return this.instructions;
  }

  getCost() {
    const ingredientCost = this.ingredients.reduce((acc, amount) => {
      let cost = ingredientsData.find(
        (ingredient) => amount.id === ingredient.id
      );
      acc += amount.quantity.amount * cost.estimatedCostInCents;
      return acc;
    }, 0);
    return `$${(ingredientCost / 100).toFixed(2)}`;
  }
}

export default Recipe;
