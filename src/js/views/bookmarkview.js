import View from './view.js';
import icons from 'url:../../../src/img/icons.svg';
import Preview from './previewview.js';

class BookmarkView extends Preview {
  _parentElement = document.querySelector('.bookmarks__list');
  _errmsg = `There No Bokkmarks yet, wonder around a little to find what you like`;
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
}

export default new BookmarkView();
