class RecipeRepository {
  constructor(cookbook) {
    this.recipes = cookbook
    this.filtered = []
    // One class to get you started!
  }
  filterTag(tag) {
    const recipes = this.recipes.filter((recipe) => {
      return recipe.tags.includes(tag);
    });
    this.filtered.push(recipes)
    console.log(this.filtered)
    console.log(recipes)
    return recipes;
  }
  filterName(name) {
    const recipe = this.recipes.find((value) => {
      return value.name.includes(name);
    });
    return recipe;
  }
}

export default RecipeRepository;
