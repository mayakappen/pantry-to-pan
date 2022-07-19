// export { recipeData } from "../data/recipes.js";
// export { userData } from "../data/users.js";

class User {
  constructor(newUser) {
    this.name = newUser.name
    this.id = newUser.id
    this.pantry = newUser.pantry
    this.toCook = []
  }
  recipeToCook(recipe) {
    this.toCook.push(recipe)
    return this.toCook
  }
  removeRecipeToCook(recipe) {
    return this.toCook.find(recipe)
  }
  
}

export default User;
