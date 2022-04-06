import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJson } from './helper';
export let state = {
  recipe: {},
};
export async function loadRecipe(id) {
  try {
    rowData = await getJson(`${API_URL}${id}`);
    let { data } = rowData;
    console.log(data);
    state.recipe = { ...data.recipe };
  } catch (err) {
    console.error(`${err}`);
  }
}
