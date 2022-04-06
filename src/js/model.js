import { async } from 'regenerator-runtime';

export let state = {
  recipe: {},
};
export async function loadRecipe(id) {
  try {
    let rowData = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    rowData = await rowData.json();
    // erro handiling
    if (rowData.status === 'fail')
      throw new Error(`${rowData.message} ${rowData.status}`);
    let { data } = rowData;
    state.recipe = { ...data.recipe };
    // console.log('state : ', state);
  } catch (err) {
    alert(err);
  }
}
