import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import RecipeView from './views/recipeview.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2
//-------------------------------------
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
    console.error(`${err}**`);
    RecipeView.renderError();
  }
};
let init = function () {
  RecipeView.addHandlerRender(controlRecipes);
};
init();
