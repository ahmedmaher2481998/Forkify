import { REC_PER_PAGE } from '../config';
import View from './view';
import icons from '../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addClickHandler(handler) {
    this._parentElement.addEventListener('click', e => {
      let btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(parseInt(btn.dataset.goto));
    });
  }

  _generateMarkup() {
    const NumberOfPages = Math.ceil(this._data.results.length / REC_PER_PAGE);
    let page = this._data.page;
    // cases
    // page 1 and theres more
    console.log(NumberOfPages);
    if (page === 1 && NumberOfPages > 1) {
      return this._generateMarkupButton('next');
    }
    // last page
    else if (page === NumberOfPages && NumberOfPages > 1) {
      return this._generateMarkupButton('pre');
    }
    // other pages
    else if (page < NumberOfPages && page > 1) {
      return this._generateMarkupButton('both');
    }
    // page 1 and  no more
    else {
      return this._generateMarkupButton();
    }
  }
  _generateMarkupButton(type = '') {
    let page = this._data.page;
    let pre = `
            <button data-goto='${
              page - 1
            }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
            </button>
            `;
    let next = `
            <button  data-goto='${
              page + 1
            }' class="btn--inline pagination__btn--next">
                <span>Page ${page + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
                </button> 
        
                `;
    if (type === 'next') {
      return next;
    } else if (type === 'pre') {
      return pre;
    } else if (type === 'both') {
      return `${pre}${next}`;
    } else {
      return '';
    }
  }
}
export default new PaginationView();
