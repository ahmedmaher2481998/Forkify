import View from './view.js';
import icons from 'url:../../../src/img/icons.svg';
import { controlerAddRecipe } from '../controller';
class AddRecipeView extends View {
  //selecting needed elements
  _parentElement = document.querySelector('.upload');
  _errmsg = `There No Search Results For this world , make sure you types it right `;
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _msg = 'Recipe is added sucessfully :)';
  //calling funictions
  constructor() {
    super();
    this._addHandlerOpenWindow();
    this._addHandlerCloseWindow();
  }

  //open/close window
  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  //getting data from form amd passing tho handler funiction
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      let data = [...new FormData(this._parentElement)];
      data = Object.fromEntries(data);
      handler(data);
    });
  }
  //open the window on clicking
  _addHandlerOpenWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  //closing window on clicking
  _addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
}

export default new AddRecipeView();
