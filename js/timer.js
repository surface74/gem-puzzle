export class Timer {
  constructor(func, interval = 1000) {
    this._intervalID = null;
    this._startTime = null;
    this._passedTime = 0;
    this._interval = interval;
    this._func = func;
  }

  get passedTime() {
    return Date.now() - this._startTime;
  }

  reset() {
    if (this._intervalID) {
      clearInterval(this._intervalID);
      this._intervalID = 0;
      this._startTime = null;
      this._passedTime = 0;
    }
  }

  start() {
    this._startTime = Date.now();
    this._intervalID = setInterval(this._func, this._interval);
  }

  stop() {
    if (this._intervalID) {
      clearInterval(this._intervalID);
      this._passedTime = Date.now() - this._startTime;
    }
  }

  toString() {
    const seconds = Math.trunc((Date.now() - this._startTime) * 0.001);
    const hh = Math.trunc(seconds / 3600);
    const mm = Math.trunc((seconds - hh * 3600) / 60);
    const ss = seconds % 60;
    return `${(hh < 10) ? '0' + hh : hh}:
     ${(mm < 10) ? '0' + mm : mm}:
     ${(ss < 10) ? '0' + ss : ss}`;
  }
}