import Recipe from "./Recipe"

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
    return this.toCook.pop(recipe)
  }
}

export default User;
