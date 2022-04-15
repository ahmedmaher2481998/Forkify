import { async } from 'regenerator-runtime';
import { API_URL, REC_PER_PAGE } from './config';
import { getJson, sendJson } from './helper';
export let state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
  },
  bookmark: [],
};
export async function loadRecipe(id) {
  try {
    rowData = await getJson(`${API_URL}${id}`);
    let { data } = rowData;
    // console.log(data);
    state.recipe = { ...data.recipe };
    if (state.bookmark.some(e => e.id === id)) {
      state.recipe.Bookmarked = true;
    } else {
      state.recipe.Bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
}
export const loadSearchResult = async query => {
  try {
    state.search.query = query;
    let data = await getJson(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => rec);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export let getSearchResultPage = (page = 1) => {
  state.search.page = page;
  let start = (page - 1) * REC_PER_PAGE;
  let end = page * REC_PER_PAGE;
  return state.search.results.slice(start, end);
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      ingredient.quantity * (newServings / state.recipe.servings);
  });
  state.recipe.servings = newServings;
};

const storeBookmarks = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmark));
};
export const getBookmarks = function () {
  state.bookmark = JSON.parse(localStorage.getItem('bookmark'));
  if (!state.bookmark) state.bookmark = [];
};

export let addBookmark = recipe => {
  // if (state.bookmark.includes(recipe)) console.log('exists');
  if (recipe.id === state.recipe.id) {
    recipe.Bookmarked = true;
    if (recipe.Bookmarked) {
      state.bookmark.push(recipe);
    } else if (!recipe.Bookmarked) {
    }
  }
  storeBookmarks();
};
//upload user own recipe
export const uploadRecipr = async function (newRecipe) {
  try {
    let ingrediants = Object.entries(newRecipe).filter(ing => {
      return ing[0].startsWith('ingredient') && ing[1] !== '';
    });

    // newRecipe.forEach(ele => {
    //   if (ing[0].startsWith('ingredient')) {
    //     console.log(ing[0]);
    //     delete newRecipe[ing[0]];
    //   }
    // });
    // must be quntity , unit , dec
    ingrediants = ingrediants.map(ing => {
      //formating ingredants
      let ingArry = ing[1].replaceAll(' ', '').split(',');
      if (ingArry.length !== 3) throw new Error('Wrong Ingrediant format !!');
      let [quantity, unit, description] = ingArry;
      return { quantity: quantity ? +quantity : null, unit, description };
    });

    //setting the ingrediants array equal to the ingridants proprty
    newRecipe.ingrediants = ingrediants;

    //removing ingrediants-number fields from the new recipe object
    Object.entries(newRecipe).map(elem => {
      if (elem[0].startsWith('ingredient')) {
        delete newRecipe[elem[0]];
      }
    });
    //testing the right output
    console.log('this is engrediatn a ', ingrediants, newRecipe);
    sendJson(`${API_UR}`);
    const recipe = {};
  } catch (error) {
    throw error;
  }
};

export let removeBookmark = id => {
  let index = state.bookmark.findIndex(e => e.id === id);
  state.bookmark.splice(index, 1);
  state.recipe.Bookmarked = false;
  storeBookmarks();
};

let clearBookmark = function () {
  localStorage.clear('bookmark');
  console.log('bookmarks cleared from local storage ');
};
// clearBookmark();
