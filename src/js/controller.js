const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
let showRecipe = async function () {
  try {
    const res = await fetch("https://forkify-api.herokuapp.com/api/get?rId=47746")
    let data = await res.json();
    console.log(data);
    // error handiling failed request
    if (data.error) throw new Error(`${data.error}`)
    let { recipe } = data;

    console.log(recipe);
  } catch (err) {
    alert(err)
  }
}
showRecipe();
