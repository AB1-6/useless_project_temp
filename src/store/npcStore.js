import { useState, useEffect } from 'react';
import { DEFAULT_STUDENT, HOBBIES } from '../data/npcDefaults';
import { CAMPUS_LOCATIONS } from '../data/locations';
import { CAMPUS_EVENTS } from '../data/events';

const LOCAL_STORAGE_KEY = 'college_npc_simulator_state';

export function useNPCStore() {
  const [currentPage, setCurrentPage] = useState('idea'); // 'idea', 'tellUs', 'profile', 'world', 'timeline', 'simulation', 'report', 'result'
  const [npc, setNpc] = useState(DEFAULT_STUDENT);
  const [selectedLocation, setSelectedLocation] = useState(CAMPUS_LOCATIONS[2]); // Canteen
  const [simulationMetrics, setSimulationMetrics] = useState({
    distanceTravelled: '4.7 km',
    classesAttended: '4/5',
    canteenVisits: 3,
    studyTime: '17 min',
    gamingTime: '2h 41m',
    assignmentsCompleted: 0,
    mostRepeatedDialogue: 'Tomorrow cheyyam bro.',
    mostVisitedLocation: 'Canteen',
    npcScore: 87,
    finalStatus: 'COMMON NPC'
  });
  const [activeEvent, setActiveEvent] = useState(null);
  const [soundMuted, setSoundMuted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.npc) setNpc(parsed.npc);
        if (parsed.simulationMetrics) setSimulationMetrics(parsed.simulationMetrics);
      }
    } catch (e) {}
  }, []);

  // Save to localStorage
  const persistState = (newNpc, newMetrics) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        npc: newNpc || npc,
        simulationMetrics: newMetrics || simulationMetrics
      }));
    } catch (e) {}
  };

  // Recalculate stats when hobby or study habit changes
  const updateNpcField = (field, val) => {
    setNpc(prev => {
      const updated = { ...prev, [field]: val };
      // Dynamic stat calculation based on hobby and habits
      if (field === 'hobby') {
        const hObj = HOBBIES.find(h => h.label === val || h.id === val);
        if (hObj?.statBoost) {
          updated.stats = { ...prev.stats, ...hObj.statBoost };
        }
      }
      if (field === 'commonPhrase') {
        setSimulationMetrics(m => ({ ...m, mostRepeatedDialogue: `"${val}"` }));
      }
      persistState(updated, simulationMetrics);
      return updated;
    });
  };

  const triggerSurpriseEvent = () => {
    setActiveEvent(CAMPUS_EVENTS[0]); // Surprise Assignment
  };

  const resolveEvent = (option) => {
    setActiveEvent(null);
    if (option.statChanges?.canteenVisits) {
      setSimulationMetrics(m => ({ ...m, canteenVisits: m.canteenVisits + 1 }));
    }
  };

  return {
    currentPage,
    setCurrentPage,
    npc,
    setNpc,
    updateNpcField,
    selectedLocation,
    setSelectedLocation,
    simulationMetrics,
    setSimulationMetrics,
    activeEvent,
    setActiveEvent,
    triggerSurpriseEvent,
    resolveEvent,
    soundMuted,
    setSoundMuted
  };
}
