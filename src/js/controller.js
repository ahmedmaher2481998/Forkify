import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import * as model from './model.js';
import RecipeView from './views/recipeview.js';
import ResultView from './views/resultsview.js';
import searchview from './views/searchview.js';

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
    console.error(`${err} at controller `);
    RecipeView.renderError();
  }
};
// search controler
let searchControler = async function () {
  ResultView.renderSpinner();

  let query = searchview.getQuery();

  if (!query) return;

  await model.loadSearchResult(query);

  ResultView.render(model.state.search.results);
};
let init = function () {
  // publisher subscriber for view recipe
  RecipeView.addHandlerRender(controlRecipes);
  // publisher subscriber for view search results
  searchview.addSearchHandler(searchControler);
};
init();

// test
// window.addEventListener('hashchange', () => console.log('hashchanged'));
