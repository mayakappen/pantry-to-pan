// Your fetch requests will live here!
const usersAPIData = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users').then(response => response.json()).catch(error => console.log(error));

const ingredientsAPIData = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients').then(response => response.json()).catch(error => console.log(error));

const recipeAPIData = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes').then(response => response.json()).catch(error => console.log(error));

export {
    usersAPIData,
    ingredientsAPIData,
    recipeAPIData,
}


console.log('I will be a fetch request!')