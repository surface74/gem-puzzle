import { HtmlHelper } from '../js/htmlhelper.js';

export class Popup {
  constructor(message, topOffset) {
    const helper = new HtmlHelper();

    this._elem = helper.createElement({attr: {class: 'popup-win'}});
    const title = helper.createElement({tag: 'h2', text: message, attr: {class: 'popup-title'}});
    title.style.paddingTop = topOffset + "px";
    this._elem.append(title);
    this._elem.addEventListener('click', () => { this._elem.replaceWith(''); });
  }

  get element() {
    return this._elem;
  }
}