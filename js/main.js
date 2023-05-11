import { Layout } from '../js/layout.js';
import { Navbar } from '../js/navbar.js';
import { Board } from '../js/board.js';
import { Statistics } from '../js/statistics.js';
import { Config } from '../js/config.js';
import { Const } from '../js/const.js';
import { Timer } from '../js/timer.js';
import { Popup } from '../js/popup.js';

let puzzleSize = Const.DEFAULT_SIZE;

let layout = new Layout();
document.body.append(layout.element);

const navbar = new Navbar();
layout.main.append(navbar.element);

const statistics = new Statistics();
layout.main.append(statistics.element);

let board = new Board(puzzleSize);
board.init(drop_handler);
board.place();

layout.main.append(board.element);

const config = new Config();
layout.main.append(config.element);

const countTime = () => {
  statistics.passedTime = timer.toString();
};

const timer = new Timer(countTime, 1000);

const audio = new Audio('./assets/audio/move-gem.mp3');
const audioError = new Audio('./assets/audio/error.mp3');

const clickStart_handler = () => {
  timer.reset();
  navbar.buttons['stop'].classList.remove('button_disabled');
  board = new Board(puzzleSize);
  board.init(drop_handler);
  board.shuffle();
  board.place();
  document.querySelector('.game-fields').replaceWith(board.element);
  board.element.addEventListener('click', clickGem_handler);
  statistics.moves = 0;
  statistics.passedTime = '00:00:00';
  timer.start();
};

const clickStop_handler = () => {
  board.element.removeEventListener('click', clickGem_handler);
  timer.stop();
  navbar.buttons['stop'].classList.add('button_disabled');
};

const clickChangeSize_handler = e => {
  const target = e.target;
  if (target.classList.contains('size-link')) {
    puzzleSize = target.dataset.size;
    document.querySelector('.value-size').textContent = `${puzzleSize}x${puzzleSize}`;

    timer.reset();
    navbar.buttons['stop'].classList.add('button_disabled');
    board = new Board(puzzleSize);
    board.init(drop_handler);
    board.place();
    document.querySelector('.game-fields').replaceWith(board.element);
    statistics.moves = 0;
    statistics.passedTime = '00:00:00';
  }
};

const win_handler = e => {
  board.element.removeEventListener('click', clickGem_handler);
  timer.stop();
  navbar.buttons['stop'].classList.add('button_disabled');

  const offset = document.querySelector('.content').offsetHeight / 2;
  const message = `Hooray! You solved the puzzle in ${statistics.passedTime} and ${statistics.moves} moves!`;
  const popup = new Popup(message, offset);
  document.body.append(popup.element);
};

const clickGem_handler = e => {
  const target = e.target;
  if (target.classList.contains('gem')) {
    tryMoveGem(+target.dataset.gem);
  }
};

function drop_handler(e) {
  e.preventDefault();
  tryMoveGem(+e.dataTransfer.getData('text/html'));
  board.getGemInfo(e.target.dataset.gem).gem.recoverState();
}

const tryMoveGem = number => {
  if (board.moveGem(number)) {
    if (config.isSound) {
      audio.play();
    }
    const moveCounter = document.querySelector('.value-moves');
    moveCounter.textContent = +moveCounter.textContent + 1;
    if (board.isWin()) {
      const winEvent = new Event('win', { bubbles: true });
      document.body.dispatchEvent(winEvent);
    }
    return true;
  }
  if (config.isSound) {
    audioError.play();
  }
  return false;

};

navbar.buttons['start'].addEventListener('click', clickStart_handler);
navbar.buttons['stop'].addEventListener('click', clickStop_handler);
navbar.buttons['stop'].classList.add('button_disabled');
navbar.buttons['save'].classList.add('button_disabled');
navbar.buttons['results'].classList.add('button_disabled');
config.element.addEventListener('click', clickChangeSize_handler);
document.body.addEventListener('win', win_handler);
