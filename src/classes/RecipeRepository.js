
class RecipeRepository {
  constructor(cookbook) {
    this.recipes = cookbook;
    this.filter = [];
    // One class to get you started!
  }
  filterTag(tag) {
    const recipes = this.recipes.filter((recipe) => {
      return recipe.tags.includes(tag);
    });
    this.filter.push(recipes)
    return this.filter;
  }
  filterName(name) {
    const recipe = this.recipes.find((value) => {
      return value.name.includes(name);
    });
    return recipe;
  }
}

export default RecipeRepository;
