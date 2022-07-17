class RecipeRepository {
  constructor(cookbook) {
    this.recipes = cookbook;
    // One class to get you started!
  }
  filterTag(tag) {
    this.filtered = [];
    const recipes = this.recipes.filter((recipe) => {
      return recipe.tags.includes(tag);
    });
    this.filtered.push(recipes);
    return this.filtered;
  }
  filterName(name) {
    const recipe = this.recipes.find((value) => {
      return value.name.includes(name);
    });
    return recipe;
  }
  getById(id) {
    const recipe = this.recipes.find((recipe) => {
      return recipe.id === id;
    });
    return recipe;
  }
}

export default RecipeRepository;
