import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import * as model from './model.js';
import AddRecipeView from './views/addRecipeView';
import pagniationview from './views/pagniationview.js';
import RecipeView from './views/recipeview.js';
import ResultView from './views/resultsview.js';
import searchview from './views/searchview.js';
import BookmarkView from './views/bookmarkview.js';
import { WINDOW_CLOSE } from './config.js';
// import addRecipeView from './views/addRecipeView';
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
    // update result view to mark the selected recipe

    ResultView.update(model.getSearchResultPage());
    // loading recipe

    await model.loadRecipe(id);

    // rendering the recipe
    RecipeView.render(model.state.recipe);

    BookmarkView.update(model.state.bookmark);
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
  // model.state.search.page = 1;
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

  RecipeView.update(model.state.recipe);
};

//add book mark conyroler
let contolerBookmark = () => {
  //add/remove bookmarks
  if (!model.state.recipe.Bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }
  //update recipe view
  RecipeView.update(model.state.recipe);

  //render bookmark
  BookmarkView.render(model.state.bookmark);
};

//controler for add recipe by user
let controlerAddRecipe = async function (newRecipe) {
  try {
    AddRecipeView.renderSpinner();
    //uploading the recipe
    await model.uploadRecipr(newRecipe);
    //render spinner + render recipe and put it as bookmarked
    RecipeView.render(model.state.recipe);
    //show msg
    AddRecipeView.rendermessage();
    //close window
    setTimeout(() => {
      AddRecipeView.toggleWindow();
    }, WINDOW_CLOSE * 1000);
  } catch (error) {
    console.error(error);
    AddRecipeView.renderError(error.message);
  }
};
let init = function () {
  //retrive bookmarks from local storage ;
  model.getBookmarks();
  BookmarkView.render(model.state.bookmark);
  // publisher subscriber for view recipe
  RecipeView.addHandlerRender(controlRecipes);

  // publisher subscriber for view search results
  searchview.addSearchHandler(searchControler);

  // publisher subscriber for view paginesation buttons
  pagniationview.addClickHandler(paginationControler);

  // publisher subscriber for view Servings btns
  RecipeView.addServingsHandler(controlServings);

  // publisher subscriber for Bookmark
  RecipeView.addBookmarkHandler(contolerBookmark);

  // publisher subscriber for Addrecipe
  AddRecipeView.addHandlerUpload(controlerAddRecipe);
};
init();
