import View from './view.js';
import icons from 'url:../../../src/img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _errmsg = `There No Search Results For this world , make sure you types it right `;
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerOpenWindow();
  }
  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _addHandlerOpenWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
}

export default new AddRecipeView();
