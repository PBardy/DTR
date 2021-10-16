// Time Constants
const MILLISECONDS_IN_A_YEAR = 31536000000;
const MILLISECONDS_IN_A_MONTH = 2629800000;
const MILLISECONDS_IN_A_DAY = 86400000;
const MILLISECONDS_IN_A_HOUR = 3600000;
const MILLISECONDS_IN_A_MINUTE = 60000;
const MILLISECONDS_IN_A_SECOND = 1000;

const dateLng = 'en-UK';
const dateFormat = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

class Clock {

  ui = {};

  fps = 1;
  fpsInterval = 1000 / 1;
  lastTick = 0;
  animationRef = null;

  paused = false;
  stopped = false;

  constructor(settings) {
    this.settings = settings;

    this.init();
  }

  init() {
    this.ui.seconds = document.querySelector('.seconds');
    this.ui.minutes = document.querySelector('.minutes');
    this.ui.hours = document.querySelector('.hours');
    this.ui.days = document.querySelector('.days');
    this.ui.months = document.querySelector('.months');
    this.ui.years = document.querySelector('.years');
    this.ui.date = document.querySelector('.date');
    this.ui.message = document.querySelector('.message');

    this.updateUI();
  }

  updateUI() {
    this.ui.seconds.closest('.time-card').style.display = this.settings.seconds ? '' : 'none';
    this.ui.minutes.closest('.time-card').style.display = this.settings.minutes ? '' : 'none';
    this.ui.hours.closest('.time-card').style.display = this.settings.hours ? '' : 'none';
    this.ui.days.closest('.time-card').style.display = this.settings.days ? '' : 'none';
    this.ui.months.closest('.time-card').style.display = this.settings.months ? '' : 'none';
    this.ui.years.closest('.time-card').style.display = this.settings.years ? '' : 'none';
  }

  updateConfig(settings) {
    this.settings = settings;
    this.ui.date.textContent = settings.date.toLocaleString(dateLng, dateFormat);
    this.ui.message.textContent = settings.message;

    this.updateUI();
    this.start();
  }

  pause() {
    this.paused = true;
  }

  unpause() {
    this.paused = false;
  }

  stop() {
    this.paused = false;
    this.stopped = true;

    cancelAnimationFrame(this.animationRef);
  }

  start() {
    this.reset();
    this.stopped = false;
    this.animationRef = this.tick(0);
  }

  reset() {
    this.stop();
    this.lastTick = 0;
  }

  padStart(string, minLength, padder = '0') {
    const length = string.toString().length;
    return length < minLength ? padder.repeat(minLength - length) + string : string;
  }

  calcTimeFrame(dt, msInTimeFrame) {
    const diff = dt / msInTimeFrame;
    return diff - (diff - Math.floor(diff));
  }

  updateYears(dt) {
    if (!this.settings.years) return dt;

    const years = this.calcTimeFrame(dt, MILLISECONDS_IN_A_YEAR);
    this.ui.years.textContent = this.padStart(years, 2);
    
    return dt - (years * MILLISECONDS_IN_A_YEAR);
  }

  updateMonths(dt) {
    if (!this.settings.months) return dt;
    
    const months = this.calcTimeFrame(dt, MILLISECONDS_IN_A_MONTH);
    this.ui.months.textContent = this.padStart(months, 2);

    return dt - (months * MILLISECONDS_IN_A_MONTH);
  }

  updateDays(dt) {
    if (!this.settings.days) return dt;
    
    const days = this.calcTimeFrame(dt, MILLISECONDS_IN_A_DAY);
    this.ui.days.textContent = this.padStart(days, 2);

    return dt - (days * MILLISECONDS_IN_A_DAY);
  }

  updateHours(dt) {
    if (!this.settings.hours) return dt;
    
    const hours = this.calcTimeFrame(dt, MILLISECONDS_IN_A_HOUR);
    this.ui.hours.textContent = this.padStart(hours, 2);

    return dt - (hours * MILLISECONDS_IN_A_HOUR);
  }

  updateMinutes(dt) {
    if (!this.settings.minutes) return dt;
    
    const minutes = this.calcTimeFrame(dt, MILLISECONDS_IN_A_MINUTE);
    this.ui.minutes.textContent = this.padStart(minutes, 2);
    
    return dt - (minutes * MILLISECONDS_IN_A_MINUTE);
  }

  updateSeconds(dt) {
    if (!this.settings.seconds) return dt;
    
    const seconds = this.calcTimeFrame(dt, MILLISECONDS_IN_A_SECOND);
    this.ui.seconds.textContent = this.padStart(seconds, 2);

    return dt - (seconds * MILLISECONDS_IN_A_SECOND);
  }

  tick(delta) {
    if (this.stopped) return;
    this.animationRef = requestAnimationFrame(this.tick.bind(this));
    if (this.paused) return;
    if (delta - this.lastTick <= this.fpsInterval) return;

    this.lastTick = delta;

    // code below here runs at 60 fps
    let dt = Math.abs(this.settings.date - new Date());
    dt = this.updateYears(dt);
    dt = this.updateMonths(dt);
    dt = this.updateDays(dt);
    dt = this.updateHours(dt);
    dt = this.updateMinutes(dt);
    dt = this.updateSeconds(dt);
  }

}

export default Clock;