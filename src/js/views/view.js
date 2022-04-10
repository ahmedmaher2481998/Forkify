import icons from 'url:../../../src/img/icons.svg';

export default class View {
  _data;
  _errmsg = 'This recipe is not found ,Please try another one !!';
  _msg;

  //rendering data to the usable format
  render(data) {
    this._data = data;
    this._clear();
    let markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //   render a spinner to the parentElement
  renderSpinner() {
    let markup = `<div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  //   clears the parentElement
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // erro handling
  renderError(msg = this._errmsg) {
    let markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${msg}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
