// import icons
import icons from 'url:../../../src/img/icons.svg';

//impoert library to fix floats numbers in in grediants
import { Fraction } from 'fractional';
// impoerint the parent class
import View from './view';
//the main viwer class
class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errmsg = 'This recipe is not found ,Please try another one !!';
  //   handles the event using a handler fun from the controller .js
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, handler);
    });
  }

  //   generate recipie mark up
  _generateMarkup() {
    return ` 
    <figure class="recipe__fig">
            <img src="${this._data.image_url}" alt="${
      this._data.title
    }" class="recipe__img" />
            <h1 class="recipe__title">
            <span>${this._data.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cooking_time
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>
            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
          <div class="recipe__user-generated">
            <!-- <svg>
              <use href="${icons}.svg#icon-user"></use>
            </svg>-->
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients
              .map(this._generateMarkupIngerdents)
              .join('')}
        </ul>
        </div>
        <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
        </p>
        <a
            class="btn--small recipe__btn"
            href="${this._data.source_url}"
            target="_blank"
        >
            <span>Directions</span>
            <svg class="search__icon">
                <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
        </a>
        </div>
    `;
  }

  //   generate markup for ing to nest in recipe mark up
  _generateMarkupIngerdents(ing) {
    return `<li class="recipe__ingredient">
            <svg class="recipe__icon">
            <use href="${icons}.svg#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              ing.quantity ? new Fraction(ing.quantity).toString() : ''
            }</div>
            <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
            </div>
        </li>`;
  }
}
export default new RecipeView();
