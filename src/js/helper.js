import { reject } from 'core-js/stable';
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
      console.log(s);
    }, s * 1000);
  });
};
export const getJson = async function (url) {
  try {
    // let rowData = await fetch(`${API_URL}${id}`);
    let rowData = await Promise.race([fetch(url), timeout2(TIMEOUT_SEC)]);
    rowData = await rowData.json();
    // erro handiling
    if (rowData.status === 'fail')
      throw new Error(`${rowData.message} ${rowData.status}`);
    return rowData;
  } catch (err) {
    throw err;
  }
};
