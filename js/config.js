import { Const } from '../js/const.js';
import { HtmlHelper } from '../js/htmlhelper.js';

export class Config {
  constructor() {
    this._sizes = {};
    this._element = this.create();
  }

  get element() {
    return this._element;
  }

  get sizes() {
    return this._sizes;
  }

  get isSound() {
    return this._soundSwitch.checked;
  }

  create() {
    const helper = new HtmlHelper();

    const parent = helper.createElement({ attr: { class: 'config' } });
    const current = helper.createElement({ attr: { class: 'current-size' } });

    current.append(helper.createElement({ tag: 'span', text: 'Frame size:', attr: { class: 'label' } }));
    current.append(helper.createElement({
      tag: 'span',
      text: `${Const.DEFAULT_SIZE}x${Const.DEFAULT_SIZE}`,
      attr: { class: 'value value-size' }
    }));

    const changeSize = helper.createElement({ attr: { class: 'change-size' } });
    changeSize.append(helper.createElement({ tag: 'span', text: 'Other sizes:', attr: { class: 'label' } }));

    for (let i = 3; i < 9; i++) {
      this.sizes[i] = helper.createElement({
        tag: 'a',
        text: `${i}x${i}`,
        attr: { href: '#', class: 'size-link', 'data-size': `${i}` }
      });
      changeSize.append(this.sizes[i]);
    }

    const sound = helper.createElement({ attr: { class: 'sound' } });

    const soundSwitch = helper.createElement({
      tag: 'input',
      attr: { type: 'checkbox', id: 'sound', class: 'sound-switch', checked: 'true' }
    });

    this._soundSwitch = soundSwitch;
    sound.append(soundSwitch);
    sound.append(helper.createElement({ 
      tag: 'label',
      text: 'sound on/off',
      attr: { for: 'sound' }
    }));

    parent.append(current);
    parent.append(changeSize);
    parent.append(sound);

    return parent;
  }
}