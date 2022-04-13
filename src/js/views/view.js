import icons from 'url:../../../src/img/icons.svg';

export default class View {
  _data;
  _msg;
  //rendering data to the usable format
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    if (!render) return;
    this._clear();
    let markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Update the changed parts only just like react
  update(data) {
    this._data = data;
    // virtual dom from the markup  and making a rray out of it
    let newDom = [
      ...document
        .createRange()
        .createContextualFragment(this._generateMarkup())
        .querySelectorAll('*'),
    ];
    // the exisiting dom and making a rray out of it
    let currentDom = [...this._parentElement.querySelectorAll('*')];
    // console.log(newDom, '.current', currentDom);
    newDom.forEach((node, i) => {
      let currentNode = currentDom[i];

      // update changed text only
      if (!node.isEqualNode(currentNode)) {
        if (node.firstChild?.nodeValue.trim() != '') {
          currentDom[i].textContent = node.textContent;
        }

        // update the data-goToServent attribute to make the sevent change on the acutal dom
        if (true) {
          [...node.attributes].forEach(att => {
            currentNode.setAttribute(att.name, att.value);
          });
        }
      }
    });
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
