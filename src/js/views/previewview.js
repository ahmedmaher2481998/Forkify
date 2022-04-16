import View from './view.js';
import icons from 'url:../../../src/img/icons.svg';
export default class Preview extends View {
  _generateMarkupPreview(result) {
    let id = document.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ''
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image_url}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                </div>
                <div class="recipe__user-generated ${
                  result.key ? '' : 'hidden'
                }">
                  <svg>
                      <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
        `;
  }
}
