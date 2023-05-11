import { HtmlHelper } from '../js/htmlhelper.js';

export class Navbar {
  constructor() {
    this._helper = new HtmlHelper();
    this._buttons = {};
    this._elem = this.create();
  }

  get buttons() {
    return this._buttons;
  }

  get element() {
    return this._elem;
  }

  create() {
    const parent = this._helper.createElement({attr: {class: 'navbar'}});

    this.buttons['start'] = this.createButton('#start', 'button', 'Shuffle and start');
    this.buttons['stop'] = this.createButton('#stop', 'button', 'Stop');
    this.buttons['save'] = this.createButton('#save', 'button', 'Save');
    this.buttons['results'] = this.createButton('#results', 'button', 'Results');

    for (const key in this.buttons) {
      if (Object.hasOwnProperty.call(this.buttons, key)) {
        parent.append(this.buttons[key]);
      }
    }

    return parent;
  }

  createButton(link, linkClass, text) {
    return this._helper.createElement({tag: 'a', text: text, attr: {href: link, class: linkClass}});
  }
}