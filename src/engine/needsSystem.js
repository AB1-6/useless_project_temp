export class NeedsSystem {
  constructor(initialStats) {
    this.stats = {
      monotony: initialStats?.monotony ?? 90,
      obliviousness: initialStats?.obliviousness ?? 85,
      scriptAdherence: initialStats?.scriptAdherence ?? 95,
      patience: initialStats?.patience ?? 90,
      protagonistFear: initialStats?.protagonistFear ?? 40
    };
  }

  tick() {
    // Natural decay and fluctuations
    // Monotony slowly replenishes when repeating routine
    this.stats.monotony = Math.min(100, this.stats.monotony + 0.2);
    // Patience gently wears down
    this.stats.patience = Math.max(10, this.stats.patience - 0.1);
    return { ...this.stats };
  }

  applyChanges(changes) {
    if (!changes) return { ...this.stats };
    Object.entries(changes).forEach(([key, val]) => {
      if (this.stats[key] !== undefined) {
        this.stats[key] = Math.max(0, Math.min(100, this.stats[key] + val));
      }
    });
    return { ...this.stats };
  }

  getHealthSummary() {
    if (this.stats.monotony > 80 && this.stats.scriptAdherence > 80) {
      return { status: 'Optimal NPC State', color: 'emerald', message: 'Perfect monotonous loop.' };
    }
    if (this.stats.obliviousness < 40) {
      return { status: 'Protagonist Alert!', color: 'rose', message: 'Dangerously self-aware!' };
    }
    return { status: 'Acceptably Background', color: 'amber', message: 'Minor protagonist interference detected.' };
  }
}
