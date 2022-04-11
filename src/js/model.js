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
};
export async function loadRecipe(id) {
  try {
    rowData = await getJson(`${API_URL}${id}`);
    let { data } = rowData;
    // console.log(data);
    state.recipe = { ...data.recipe };
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

export let getSearchResultPage = (page = state.search.page) => {
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
