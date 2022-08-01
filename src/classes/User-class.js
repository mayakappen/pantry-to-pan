// export { recipeData } from "../data/recipes.js";
// export { userData } from "../data/users.js";

class User {
  constructor(newUser) {
    this.name = newUser.name;
    this.id = newUser.id;
    this.pantry = newUser.pantry;
    this.toCook = [];
  }
  saveRecipe(recipeId) {
    if (!this.toCook.includes(recipeId)) {
      this.toCook.push(recipeId);
    }
    return this.toCook;
  }
  deleteRecipe(recipeId) {
    this.toCook = this.toCook.filter((id) => id !== recipeId);
  }
}

export default User;
