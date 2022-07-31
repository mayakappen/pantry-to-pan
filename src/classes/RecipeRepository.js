class RecipeRepository {
  constructor(cookbook) {
    this.recipes = cookbook;
  }
  filterTag(tag) {
    this.filtered = [];
    const recipes = this.recipes.recipeData.filter((recipe) => {
      return recipe.tags.includes(tag);
    });
    this.filtered.push(recipes);
    return this.filtered;
  }
  filterName(name) {
    let upper = name.toUpperCase();
    let results = this.recipes.recipeData.map((recipe) =>
      recipe.name.toUpperCase()
    );
    let result = results.findIndex((element) => {
      if (element === upper) {
        return true;
      }
      return false;
    });
    return this.recipes[result];
  }

  getById(id) {
    const recipe = this.recipes.recipeData.find((recipe) => {
      return recipe.id === id;
    });
    return recipe;
  }
}

export default RecipeRepository;
