import { HtmlHelper } from '../js/htmlhelper.js';
import { Const } from '../js/const.js';
import { Gem } from '../js/gem.js';

export class Board {
  constructor(size = Const.DEFAULT_SIZE) {
    this._size = size;
    this._gems = [];
    this._element = this.create();
  }

  get size() {
    return this._size;
  }

  get gems() {
    return this._gems;
  }

  get element() {
    return this._element;
  }

  create() {
    const helper = new HtmlHelper();
    const element = helper.createElement({ attr: { class: 'game-fields' } });

    return element;
  }

  init(drop_handler) {
    this._gems = [];
    let counter = 0;
    for (let i = 0; i < this._size; i++) {
      const row = [];
      for (let column = 0; column < this._size; column++) {
        row.push(new Gem(++counter, true));
      }
      this.gems.push(row);
    }
    this.gems[this._size - 1][this._size - 1].element.classList.add('empty');
    this.gems[this._size - 1][this._size - 1].setDraggable(false);
    this.gems[this._size - 1][this._size - 1].setDroppable(drop_handler);

    return this;
  }

  shuffle() {
    let counter = 100 * this.size ** 2;
    let lastMove = null;
    let directions = [Const.DIRECTION.TOP, Const.DIRECTION.RIGHT, Const.DIRECTION.BOTTOM, Const.DIRECTION.LEFT];
    while (counter--) {
      const allowed = [...directions];
      const empty = this.getGemInfo(this.size ** 2);
      if (lastMove) {
        allowed.splice(allowed.indexOf(lastMove), 1);
      }
      if (empty.row === 0 && allowed.includes(Const.DIRECTION.TOP)) {
        allowed.splice(allowed.indexOf(Const.DIRECTION.TOP), 1);
      }
      if (empty.row === this.gems.length - 1 && allowed.includes(Const.DIRECTION.BOTTOM)) {
        allowed.splice(allowed.indexOf(Const.DIRECTION.BOTTOM), 1);
      }
      if (empty.column === this.gems[0].length - 1 && allowed.includes(Const.DIRECTION.RIGHT)) {
        allowed.splice(allowed.indexOf(Const.DIRECTION.RIGHT), 1);
      }
      if (empty.column === 0 && allowed.includes(Const.DIRECTION.LEFT)) {
        allowed.splice(allowed.indexOf(Const.DIRECTION.LEFT), 1);
      }
      const direction = this.getRandom(0, allowed.length - 1);
      this.moveGemByDirection(allowed[direction], empty);
      lastMove = direction;
    }
  }

  moveGemByDirection(direction, cellPos) {
    let { ...newPos } = { ...cellPos };
    switch (direction) {
      case Const.DIRECTION.TOP:
        --newPos.row;
        break;
      case Const.DIRECTION.BOTTOM:
        ++newPos.row;
        break;
      case Const.DIRECTION.RIGHT:
        ++newPos.column;
        break;
      default:
        --newPos.column;
    }
    [this.gems[cellPos.row][cellPos.column], this.gems[newPos.row][newPos.column]] =
      [this.gems[newPos.row][newPos.column], this.gems[cellPos.row][cellPos.column]];
  }

  place() {
    this.element.innerHTML = '';
    for (let row = 0; row < this._size; row++) {
      for (let column = 0; column < this._size; column++) {
        const gem = this.gems[row][column];
        if (gem) {
          gem.setPosition(row, column, this.size);
          this.element.append(gem.element);
        }
      }
    }
    return this;
  }

  getPositionInArray(index) {
    const row = Math.floor(index / this.size);
    const column = index % this.size;

    return { row, column };
  }


  getRandom(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  }

  moveGem(number) {
    let gemInfo = this.getGemInfo(number);
    let emptyGem = this.getGemInfo(this.size ** 2);
    if (emptyGem.row === gemInfo.row &&
      Math.abs(emptyGem.column - gemInfo.column) === 1 ||
      emptyGem.column === gemInfo.column &&
      Math.abs(emptyGem.row - gemInfo.row) === 1) {
      [this.gems[emptyGem.row][emptyGem.column], this.gems[gemInfo.row][gemInfo.column]] =
        [this.gems[gemInfo.row][gemInfo.column], this.gems[emptyGem.row][emptyGem.column]];
      this.gems[emptyGem.row][emptyGem.column].setPosition(emptyGem.row, emptyGem.column, this.size);
      this.gems[gemInfo.row][gemInfo.column].setPosition(gemInfo.row, gemInfo.column, this.size);

      return true;
    }
    return false;
  }

  getGemInfo(number) {
    for (let row = 0; row < this.gems.length; row++) {
      for (let column = 0; column < this.gems[0].length; column++) {
        const gem = this.gems[row][column];
        if (+gem.element.dataset.gem === +number) {
          return {gem, row, column };
        }
      }
    }
  }

  isWin() {
    return this.gems.flat().every((gem, i, arr) => (i !== arr.length - 1) ?
      +gem.element.dataset.gem === +arr[i + 1].element.dataset.gem - 1 :
      true
    );
  }
}