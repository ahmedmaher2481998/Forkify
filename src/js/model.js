import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJson } from './helper';
export let state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
