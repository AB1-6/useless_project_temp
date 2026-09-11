export class SimulationClock {
  constructor(onTick, onDayEnd) {
    this.startHour = 6;
    this.endHour = 22;
    this.currentHour = 6;
    this.currentMinute = 0;
    this.speed = 1; // 1x, 2x, 5x
    this.running = false;
    this.timer = null;
    this.onTick = onTick;
    this.onDayEnd = onDayEnd;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.tickInterval();
  }

  pause() {
    this.running = false;
    clearTimeout(this.timer);
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
  }

  reset() {
    this.pause();
    this.currentHour = 6;
    this.currentMinute = 0;
  }

  tickInterval() {
    if (!this.running) return;

    // advance by 5 minutes each tick
    this.currentMinute += 5;
    if (this.currentMinute >= 60) {
      this.currentMinute = 0;
      this.currentHour += 1;
    }

    const isDayEnd = this.currentHour >= this.endHour;

    if (this.onTick) {
      this.onTick({
        hour: this.currentHour,
        minute: this.currentMinute,
        formatted: this.getFormattedTime(),
        progressPercent: Math.min(100, Math.round(((this.currentHour - this.startHour) * 60 + this.currentMinute) / ((this.endHour - this.startHour) * 60) * 100))
      });
    }

    if (isDayEnd) {
      this.pause();
      if (this.onDayEnd) this.onDayEnd();
      return;
    }

    const intervalMs = Math.max(100, 1000 / this.speed);
    this.timer = setTimeout(() => this.tickInterval(), intervalMs);
  }

  getFormattedTime() {
    const hh = this.currentHour.toString().padStart(2, '0');
    const mm = this.currentMinute.toString().padStart(2, '0');
    const ampm = this.currentHour >= 12 ? 'PM' : 'AM';
    const displayH = this.currentHour > 12 ? this.currentHour - 12 : (this.currentHour === 0 ? 12 : this.currentHour);
    return `${displayH}:${mm} ${ampm} (${hh}:${mm})`;
  }
}
