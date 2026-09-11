import { RANDOM_EVENTS } from '../data/events';

export class EventSystem {
  constructor(onTriggerEvent) {
    this.events = [...RANDOM_EVENTS];
    this.usedEvents = [];
    this.onTriggerEvent = onTriggerEvent;
    this.lastTriggerHour = 6;
  }

  checkTrigger(currentHour, chance = 0.35) {
    // trigger roughly every 2-3 hours
    if (currentHour - this.lastTriggerHour >= 2 && Math.random() < chance) {
      this.triggerRandomEvent(currentHour);
    }
  }

  triggerRandomEvent(currentHour) {
    const available = this.events.filter(e => !this.usedEvents.includes(e.id));
    const pool = available.length > 0 ? available : this.events;
    const picked = pool[Math.floor(Math.random() * pool.length)];

    this.usedEvents.push(picked.id);
    this.lastTriggerHour = currentHour;

    if (this.onTriggerEvent) {
      this.onTriggerEvent(picked);
    }
  }

  reset() {
    this.usedEvents = [];
    this.lastTriggerHour = 6;
  }
}
