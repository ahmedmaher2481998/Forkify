import { async } from 'regenerator-runtime';
import { API_URL, REC_PER_PAGE } from './config';
import { getJson } from './helper';
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
    console.log('loadSearchResult');
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

export let addBookmark = recipe => {
  // if (state.bookmark.includes(recipe)) console.log('exists');
  if (recipe.id === state.recipe.id) {
    recipe.Bookmarked = true;
    if (recipe.Bookmarked) {
      state.bookmark.push(recipe);
    } else if (!recipe.Bookmarked) {
    }
  }
};

export let removeBookmark = id => {
  let index = state.bookmark.findIndex(e => e.id === id);
  state.bookmark.splice(index, 1);
  state.recipe.Bookmarked = false;
};
