import { expect } from "chai";
import Pantry from "../src/classes/Pantry";
import User from "../src/classes/User-class";
import Recipe from "../src/classes/Recipe";
import RecipeRepository from "../src/classes/RecipeRepository";

describe("Pantry", () => {
  let dummyUser;

  let recipe1;
  let recipeData;
  let newRecipe;
  let recipeRepository;
  let ingredientsDataSet;
  let pantry1;
  let currentUser;

  beforeEach(() => {
    dummyUser = {
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
    };

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
        {
          id: 19335,
          quantity: {
            amount: 0.5,
            unit: "c",
          },
        },
        {
          id: 19206,
          quantity: {
            amount: 3,
            unit: "Tbsp",
          },
        },
        {
          id: 19334,
          quantity: {
            amount: 0.5,
            unit: "c",
          },
        },
        {
          id: 2047,
          quantity: {
            amount: 0.5,
            unit: "tsp",
          },
        },
        {
          id: 1012047,
          quantity: {
            amount: 24,
            unit: "servings",
          },
        },
        {
          id: 10019903,
          quantity: {
            amount: 2,
            unit: "c",
          },
        },
        {
          id: 1145,
          quantity: {
            amount: 0.5,
            unit: "c",
          },
        },
        {
          id: 2050,
          quantity: {
            amount: 0.5,
            unit: "tsp",
          },
        },
      ],
    };

    recipeData = [recipe1];
    newRecipe = new Recipe(recipe1);
    recipeRepository = new RecipeRepository(recipeData);
    currentUser = new User(dummyUser);

    ingredientsDataSet = [
      {
        id: 11297,
        name: "flat leaf parsley leaves",
        estimatedCostInCents: 1030,
      },
      {
        id: 1082047,
        name: "kosher salt",
        estimatedCostInCents: 972,
      },
      {
        id: 20081,
        name: "wheat flour",
        estimatedCostInCents: 142,
      },
      {
        id: 18372,
        name: "bicarbonate of soda",
        estimatedCostInCents: 582,
      },
      {
        id: 1123,
        name: "eggs",
        estimatedCostInCents: 472,
      },
      {
        id: 19335,
        name: "sucrose",
        estimatedCostInCents: 902,
      },
    ];
    pantry1 = new Pantry(currentUser);
  });

  it("should be a function", () => {
    expect(Pantry).to.be.a("function");
  });

  it("should instantiate a new instance of Pantry", () => {
    expect(pantry1).to.be.an.instanceOf(Pantry);
  });

  it("should populate ingredients owned", () => {
    expect(pantry1.ingredientsOwned).to.deep.equal(currentUser.pantry);
  });

  it("should be able to check for ingredients", () => {
    expect(pantry1.checkForIngredients(recipe1.ingredients)).to.be.deep.equal([
      18372, 1123, 19335, 19206, 19334, 2047, 1012047, 10019903, 1145, 2050,
    ]);
  });
});
