import { HtmlHelper } from '../js/htmlhelper.js';

export class Gem {
  constructor(number, draggable = false) {
    const helper = new HtmlHelper();
    this._elem = helper.createElement({ attr: { class: 'gem', 'data-gem': number } });
    this.setDraggable(draggable);
  }

  get element() {
    return this._elem;
  }

  setPosition(row, column, part) {
    this.element.style.width = `${100 / part}%`;
    this.element.style.transform = `translate(${100 * column}%, ${100 * row}%)`;
  }

  setDraggable(draggable) {
    this.element.setAttribute('draggable', draggable);
    if (draggable) {
      this.element.addEventListener('dragstart', this.dragstart_handler);
    } else {
      this.element.removeEventListener('dragstart', this.dragstart_handler);
    }
  }

  setDroppable(dropHandler = this.drop_handler, dragoverHandler = this.dragover_handle) {
    this.element.addEventListener('drop', dropHandler);
    this.element.addEventListener('dragover', dragoverHandler);
    this.element.addEventListener('dragenter', this.dragenter_handler);
    this.element.addEventListener('dragleave', this.dragleave_handler);
  }

  dragstart_handler(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.dataset.gem);
  }

  drop_handler(e) {
    e.preventDefault();
    const gemNumber = e.dataTransfer.getData('text/html');
  }

  recoverState() {
    this.element.classList.remove('dropzone');
  }

  dragenter_handler(e) {
    e.target.classList.add('dropzone');
  }

  dragleave_handler(e) {
    e.target.classList.remove('dropzone');
  }

  dragover_handle(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }
}
