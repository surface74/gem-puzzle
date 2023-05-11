import { HtmlHelper } from '../js/htmlhelper.js';

export class Statistics {
  constructor() {
    this._element = this.create();
  }

  get element() {
    return this._element;
  }
  get passedTime() {
    return this._passedTime.textContent;
  }
  set passedTime(value) {
    this._passedTime.textContent = value;
  }
  get moves() {
    return this._moves.textContent;
  }

  set moves(value) {
    this._moves.textContent = value;
  }

  create() {
    const helper = new HtmlHelper();

    const parent = helper.createElement({ attr: { class: 'statistics' } });
    const moves = helper.createElement({ attr: { class: 'statistics__moves' } });

    this._moves = helper.createElement({ tag: 'span', text: '0', attr: { class: 'value value-moves' } });

    moves.append(helper.createElement({ tag: 'span', text: 'Moves:', attr: { class: 'label' } }));
    moves.append(this._moves);
    parent.append(moves);

    
    
    const times = helper.createElement({ attr: { class: 'statistics__time' } });
    times.append(helper.createElement({ tag: 'span', text: 'Time:', attr: { class: 'label' } }));
    this._passedTime = helper.createElement({ tag: 'span', text: '00:00:00', attr: { class: 'value value-time' } });
    times.append(this._passedTime);
    parent.append(times);

    return parent;
  }

}