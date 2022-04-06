import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import RecipeView from './views/recipeview.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
// https://forkify-api.herokuapp.com/v2
//https://forkify-api.herokuapp.com/api/v2/recipes/:id
// recipe object model
///////////////////////////////////////
// render recipie
let controlRecipes = async function () {
  try {
    let id = document.location.hash.slice(1);
    if (!id) return;

    // spinner till loading is done
    RecipeView.renderSpinner();

    // loading recipe
    await model.loadRecipe(id);

    // rendering the recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

/*
Object { publisher: "My Baking Addiction",
  ingredients: (7) […],
  source_url: "http://www.mybakingaddiction.com/spicy-chicken-and-pepper-jack-pizza-recipe/", 
  image_url: "http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg", 
  title: "Spicy Chicken and Pepper Jack Pizza",
  servings: 4,
  cooking_time: 45,
  id: "5ed6604591c37cdc054bc886" }
*/
