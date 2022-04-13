import View from './view.js';
import icons from 'url:../../../src/img/icons.svg';
import Preview from './previewview.js';

class ResultsView extends Preview {
  _parentElement = document.querySelector('.results');
  _errmsg = `There No Search Results For this world , make sure you types it right `;
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
}
export default new ResultsView();
