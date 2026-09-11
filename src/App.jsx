import React from 'react';
import { useNPCStore } from './store/npcStore';
import Navbar from './components/UI/Navbar';
import Landing from './pages/Landing';
import CreateNPC from './pages/CreateNPC';
import AvatarEditor from './pages/AvatarEditor';
import NPCProfilePage from './pages/NPCProfile';
import WorldPage from './pages/World';
import DaySchedule from './pages/DaySchedule';
import SimulationPage from './pages/Simulation';
import DailyReport from './pages/DailyReport';
import ResultPage from './pages/Result';

export default function App() {
  const {
    currentPage,
    setCurrentPage,
    npc,
    updateNpcField,
    selectedLocation,
    setSelectedLocation,
    simulationMetrics,
    soundMuted,
    setSoundMuted
  } = useNPCStore();

  const handleRestart = () => {
    setCurrentPage('idea');
  };

  const handleNewCharacter = () => {
    setCurrentPage('tellUs');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        soundMuted={soundMuted}
        setSoundMuted={setSoundMuted}
        onReset={handleRestart}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Panel 1: The Idea */}
        {currentPage === 'idea' && (
          <Landing onStart={() => setCurrentPage('tellUs')} />
        )}

        {/* Panel 2: Tell Us About Yourself */}
        {currentPage === 'tellUs' && (
          <CreateNPC
            npc={npc}
            updateNpcField={updateNpcField}
            onProceed={() => setCurrentPage('avatar')}
          />
        )}

        {/* Dedicated Avatar Editor Step (Boy/Girl, Hairstyle, Colors, Accessories) */}
        {currentPage === 'avatar' && (
          <AvatarEditor
            npc={npc}
            updateNpcField={updateNpcField}
            onProceed={() => setCurrentPage('profile')}
            onBack={() => setCurrentPage('tellUs')}
          />
        )}

        {/* Panel 3: Your NPC Profile */}
        {currentPage === 'profile' && (
          <NPCProfilePage
            npc={npc}
            onProceed={() => setCurrentPage('world')}
            onEdit={() => setCurrentPage('avatar')}
          />
        )}

        {/* Panel 4: Your World */}
        {currentPage === 'world' && (
          <WorldPage
            npc={npc}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            onProceed={() => setCurrentPage('timeline')}
            onBack={() => setCurrentPage('profile')}
          />
        )}

        {/* Panel 5: A Day in the Life */}
        {currentPage === 'timeline' && (
          <DaySchedule
            npc={npc}
            onProceed={() => setCurrentPage('simulation')}
            onBack={() => setCurrentPage('world')}
          />
        )}

        {/* Panel 6 & 7: Life in the Simulation + Random Event */}
        {currentPage === 'simulation' && (
          <SimulationPage
            npc={npc}
            onCompleteSimulation={() => setCurrentPage('report')}
            onBack={() => setCurrentPage('timeline')}
          />
        )}

        {/* Panel 8: NPC Behavior Analysis */}
        {currentPage === 'report' && (
          <DailyReport
            npc={npc}
            simulationMetrics={simulationMetrics}
            onProceed={() => setCurrentPage('result')}
            onBack={() => setCurrentPage('simulation')}
          />
        )}

        {/* Panel 9: The Result */}
        {currentPage === 'result' && (
          <ResultPage
            npc={npc}
            onRestart={handleRestart}
            onNewCharacter={handleNewCharacter}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-[#070b14] py-5 px-4 text-center text-xs text-slate-500 space-y-1">
        <p>
          NPC SIMULATOR • Turn Yourself Into a Background Character
        </p>
        <p className="font-handwritten text-yellow-300/80 text-base">
          Same life... Different perspective.
        </p>
      </footer>
    </div>
  );
}
