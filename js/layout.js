import { HtmlHelper } from '../js/htmlhelper.js';

export class Layout {
  constructor() {
    this._element = this.create();
  }

  get element() {
    return this._element;
  }

  get main() {
    return this._main;
  }

  create() {
    const helper = new HtmlHelper();
    const content = helper.createElement({ attr: { class: 'content wrapper' } });
    this._main = document.createElement('main');
    content.append(this._main);

    return content;
  }
}