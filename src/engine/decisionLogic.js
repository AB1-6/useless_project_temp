import { NPC_STATES } from './npcBehavior';
import { aiService } from '../services/aiService';

export class DecisionEngine {
  constructor(npc, routine = []) {
    this.npc = npc;
    this.routine = routine;
  }

  getCurrentRoutineTask(currentHour) {
    if (!this.routine || this.routine.length === 0) {
      return { action: 'Standing aimlessly in place', location: 'center' };
    }
    // Find closest routine item
    for (let i = this.routine.length - 1; i >= 0; i--) {
      const routineHour = parseInt(this.routine[i].time.split(':')[0], 10);
      if (currentHour >= routineHour) {
        return this.routine[i];
      }
    }
    return this.routine[0];
  }

  evaluateActionOnHeroEncounter() {
    const roll = Math.random();
    if (roll < 0.4) {
      return {
        state: NPC_STATES.MUST_BE_WIND,
        dialogue: "Must have been the wind.",
        duration: 2500
      };
    } else if (roll < 0.7) {
      return {
        state: NPC_STATES.DIALOGUE,
        dialogue: this.npc.catchphrase || "Need something?",
        duration: 3000
      };
    } else if (roll < 0.9) {
      return {
        state: NPC_STATES.SWEEPING,
        dialogue: "*Aggressively sweeps the same pebble*",
        duration: 3500
      };
    } else {
      return {
        state: NPC_STATES.T_POSE,
        dialogue: "[ERROR: PROTOCOL T-POSE ENGAGED]",
        duration: 3000
      };
    }
  }
}
