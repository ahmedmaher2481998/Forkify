import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import * as model from './model.js';
import pagniationview from './views/pagniationview.js';
import RecipeView from './views/recipeview.js';
import ResultView from './views/resultsview.js';
import searchview from './views/searchview.js';

const recipeContainer = document.querySelector('.recipe');
if (module.hot) {
  module.hot.accept;
}
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
    // console.log('before', model.state.recipe.ingredients);
    // // test
    // controlServings();
    // console.log(model.state.recipe.ingredients);
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

  ResultView.render(model.getSearchResultPage());
  pagniationview.render(model.state.search);
};

let paginationControler = p => {
  ResultView.render(model.getSearchResultPage(p));
  pagniationview.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the servings in the state
  model.updateServings(newServings);
  // Update the recipe View
  RecipeView.render(model.state.recipe);
};

let init = function () {
  // publisher subscriber for view recipe
  RecipeView.addHandlerRender(controlRecipes);

  // publisher subscriber for view search results
  searchview.addSearchHandler(searchControler);

  // publisher subscriber for view paginesation buttons
  pagniationview.addClickHandler(paginationControler);

  // publisher subscriber for view Servings btns
  RecipeView.addServingsHandler(controlServings);
};
init();
