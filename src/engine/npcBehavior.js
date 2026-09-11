export const NPC_STATES = {
  IDLE: 'IDLE',
  PATROL: 'PATROL',
  SWEEPING: 'SWEEPING',
  T_POSE: 'T_POSE',
  MUST_BE_WIND: 'MUST_BE_WIND',
  DIALOGUE: 'DIALOGUE',
  GLITCH: 'GLITCH'
};

export class NPCBehavior {
  constructor(npcConfig) {
    this.config = npcConfig;
    this.state = NPC_STATES.IDLE;
    this.speechBubble = null;
    this.bubbleTimer = null;
    this.actionText = 'Staring into distance';
  }

  setState(newState, actionText = '') {
    this.state = newState;
    if (actionText) this.actionText = actionText;
  }

  say(text, durationMs = 3000) {
    this.speechBubble = text;
    clearTimeout(this.bubbleTimer);
    this.bubbleTimer = setTimeout(() => {
      this.speechBubble = null;
    }, durationMs);
  }

  clearSpeech() {
    this.speechBubble = null;
    clearTimeout(this.bubbleTimer);
  }
}
