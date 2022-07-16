export { recipeData } from "../data/recipes.js";
export { userData } from "../data/users.js";

class User {
  constructor(newUser) {
    this.newUser = newUser;
  }
  recipeToCook() {}
  deleteRecipeToCook() {}
}

export default User;
