function isTrue(val) {
  return val === 'on' || val === 'true';
}

class Settings {

  constructor(formData) {
    this.date = new Date(formData.get('date'));
    this.message = formData.get('message');
    this.seconds = isTrue(formData.get('seconds'));
    this.minutes = isTrue(formData.get('minutes'));
    this.hours = isTrue(formData.get('hours'));
    this.days = isTrue(formData.get('days'));
    this.months = isTrue(formData.get('months'));
    this.years = isTrue(formData.get('years'));
  }

  static DEFAULT = {
    date: new Date('2008/02/24'),
    message: 'The Last Time Spurs Won A Trophy',
    seconds: true,
    minutes: true,
    hours: true,
    days: true,
    months: true,
    years: true,
  };

}

export default Settings;