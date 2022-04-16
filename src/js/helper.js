import { reject } from 'core-js/stable';
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
const timeout2 = function (s) {
  return new Promise((_, reject) => {
    setTimeout(function () {
      reject(new Error(`request took too long! Time Out After ${s} seconds `));
      // console.log(s);
    }, s * 1000);
  });
};

//ajax
export const AJAX = async function (url, data = undefined) {
  try {
    //organizing data
    let newRecipe;
    if (data) {
      newRecipe = {
        publisher: data.publisher,
        ingredients: data.ingredients,
        source_url: data.source_url,
        image_url: data.image_url,
        title: data.title,
        servings: +data.servings,
        cooking_time: +data.cooking_time,
      };
    }

    let fetchpro = data
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRecipe),
        })
      : fetch(url);

    // console.log(newRecipe);
    let rowData = await Promise.race([fetchpro, timeout2(TIMEOUT_SEC)]);
    rowData = await rowData.json();
    // erro handiling
    if (rowData.status === 'fail')
      throw new Error(`${rowData.message} ${rowData.status}`);
    return rowData;
  } catch (err) {
    throw err;
  }
};
/*
export const getJson = async url => {
  try {
    // let rowData = await fetch(`${API_URL}${id}`);
    let rowData = await Promise.race([, timeout2(TIMEOUT_SEC)]);
    rowData = await rowData.json();
    // erro handiling
    if (rowData.status === 'fail')
      throw new Error(`${rowData.message} ${rowData.status}`);
    return rowData;
  } catch (err) {
    throw err;
  }
};

//sending json method to the api

export const sendJson = async (url, data) => {};
*/
