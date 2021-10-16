import Clock from "./clock.js";
import Settings from "./Settings.js";

class State {

  clock = new Clock(Settings.DEFAULT);

  constructor() {
    this.updateSettings = this.updateSettings.bind(this);
  }

  loadSettings() {
    const url = new URL(window.location.href);
    const storedSettings = localStorage.getItem('settings');

    if (url.searchParams.has('date') && url.searchParams.has('message')) {
      return this.clock.updateConfig(new Settings(url.searchParams));
    }
    
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      settings.date = new Date(settings.date);
      return this.clock.updateConfig(settings);
    }

    this.clock.updateConfig(Settings.DEFAULT);
  }

  saveSettings(settings) {
    const url = new URL(window.location.origin + window.location.pathname);
    Object.keys(settings).forEach(key => {
      url.searchParams.append(key, settings[key]);
    });

    localStorage.setItem('settings', JSON.stringify(settings));
    window.history.replaceState(null, 'Timer', url.toString());
  }

  updateSettings(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const formData = new FormData(event.target);
    const settings = new Settings(formData);

    this.saveSettings(settings);
    this.clock.updateConfig(settings);

    return false;
  }

}

// Initialise State
const stateObject = new State();
stateObject.loadSettings();

// Get elements
const settings = document.querySelector('.settings');
settings.addEventListener('submit', stateObject.updateSettings);