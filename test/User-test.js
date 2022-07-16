import { expect } from "chai";
import User from "../src/classes/User-class";
//import Recipe from "../src/classes/Recipe";
// import RecipeRepository from '../src/classes/RecipeRepository';
//import { recipeData } from "../data/recipes.js";
//import { userData } from "../data/users.js";

describe("User", () => {
  let user1;
  let user2;
  let recipe1;
  // let recipeRepository = new RecipeRepository(recipeData)
  beforeEach(() => {
    user1 = new User({
      name: "Saige O'Kon",
      id: 1,
      pantry: [
        {
          ingredient: 11297,
          amount: 4,
        },
        {
          ingredient: 1082047,
          amount: 10,
        },
        {
          ingredient: 20081,
          amount: 5,
        },
      ],
    });
    //why do we have an array of objects? instead of one object as the argument
    user2 = new User({
      name: "Ephraim Goyette",
      id: 2,
      pantry: [
        {
          ingredient: 6150,
          amount: 3,
        },
        {
          ingredient: 1032009,
          amount: 7,
        },
        {
          ingredient: 1082047,
          amount: 8,
        },
      ],
    });
    recipe1 = {
      id: 595736,
      image: "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      ingredients: [
        {
          id: 20081,
          quantity: {
            amount: 1.5,
            unit: "c",
          },
        },
        {
          id: 18372,
          quantity: {
            amount: 0.5,
            unit: "tsp",
          },
        },
        {
          id: 1123,
          quantity: {
            amount: 1,
            unit: "large",
          },
        },
      ],
      instructions: [
        {
          instruction:
            "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
          number: 1,
        },
        {
          instruction: "Add egg and vanilla and mix until combined.",
          number: 2,
        },
        {
          instruction:
            "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
          number: 3,
        },
      ],
      name: "Loaded Chocolate Chip Pudding Cookie Cups",
      tags: ["antipasti", "starter", "snack"],
    };
  });

  it("should be a function", () => {
    expect(User).to.be.a("function");
  });

  it("should be an instance of", () => {
    expect(user1).to.be.an.instanceOf(User);
  });

  it("should be an object", () => {
    expect(user1).to.be.an("object");
  });

  it("should have a name", () => {
    expect(user1.name).to.equal("Saige O'Kon");
  });

  it("should have an id", () => {
    expect(user1.id).to.equal(1);
  });

  it("should have a pantry array", () => {
    expect(user1.pantry).to.be.an("array");
  });

  it("should have an object in pantry", () => {
    expect(user1.pantry[0]).to.be.an("object");
  });

  it("should have ingredient numbers", () => {
    expect(user1.pantry[1].ingredient).to.equal(1082047);
  });

  it("should have ingredient amounts", () => {
    expect(user1.pantry[0].amount).to.equal(4);
    expect(user2.pantry[0].amount).to.equal(3);
  });

  // it("should pull a recipe from the recipe scripts", () => {
  //   console.log(recipeData);
  //   expect(recipeToCook()).to.be.equal(recipeData[0].id);
  // });

  it("should add a recipe to an array", () => {
    expect(user1.toCook.length).to.equal(0);
    //need to call as a method
    //method takes the "recipe" object  as a parameter
    //converts to Recipe class and pushes to this.toCook array
    user1.recipeToCook(recipe1);
    expect(user1.toCook[0]).to.equal(recipe1);

    expect(user1.toCook.length).to.equal(1);
  });

  it("should contain an object in the array of recipes", () => {
    user1.recipeToCook(recipe1);
    expect(user1.toCook[0]).to.be.an("object");
  });

  it("should delete an object from the array of recipes", () => {
    user1.recipeToCook(recipe1);
    expect(user1.toCook.length).to.equal(1);
    expect(user1.toCook[0].name).to.equal(
      "Loaded Chocolate Chip Pudding Cookie Cups"
    );

    user1.removeRecipeToCook(recipe1);
    expect(user1.toCook.length).to.equal(0);
  });
});
