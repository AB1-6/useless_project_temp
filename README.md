<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# NPCify 🤖🎯

> **The Anti-Main-Character Life Simulator.** Purge your protagonist syndrome, stick to a 3-step patrol loop, and survive the chaos of visiting main characters.

---

## Basic Details
### Team Name: The Background Extras

### Team Members
- Team Lead: NPC Lead - Developer & Irrelevance Engineer
- Member 2: Town Guard #4 - Arrow to the Knee Specialist
- Member 3: Cabbage Merchant - Ceramic Loss Analyst

### Project Description
NPCify is a satirical interactive web application that converts high-stress human existence into the blissfully monotonous routine of a video game NPC. Players can customize their avatar, set an infinite repetitive catchphrase, patrol predefined coordinates, experience unprovoked pottery vandalism from speeding heroes, and get graded on an authentic "Hall of Irrelevance" leaderboard.

### The Problem (that doesn't exist)
Millions of individuals wake up every day under the crushing delusion that they are the "Main Character" of reality. They expect dramatic orchestral swells while making toast, cinematic slow-motion when catching the subway, and an overarching destiny that justifies their procrastination. This causes rampant protagonist fatigue, overthinking, and unnecessary side-quests.

### The Solution (that nobody asked for)
NPCify completely deprograms protagonist syndrome. By locking your routine to a rigid A-to-B patrol path, restricting your dialogue tree to one unskippable sentence, and attributing all existential trauma to "Must have been the wind", NPCify offers radical peace through total irrelevance.

---

## Technical Details
### Technologies/Components Used
For Software:
- **Languages:** JavaScript (ESNext), HTML5, CSS3
- **Frameworks:** React 18, Vite 5
- **Styling:** Tailwind CSS v4, Vanilla CSS Design System, Glassmorphism, Retro Scanline CRT Overlays
- **Audio:** Custom Web Audio API Synthesizer (Chiptunes, pottery shatter white-noise, wind filters, quest chimes)
- **Icons & Effects:** Lucide React, Canvas Confetti
- **State & Storage:** Custom React Hook Store with LocalStorage Persistence

---

## Architectural Structure
```
npc-simulator/
│
├── src/
│   ├── components/
│   │   ├── NPC/
│   │   │   ├── NPCCharacter.jsx   # Vector pixel avatar renderer & animation state machine
│   │   │   ├── NPCProfile.jsx     # Dossier & dialogue tree review
│   │   │   ├── NPCStats.jsx       # Monotony, Obliviousness, Script Adherence meters
│   │   │   └── NPCDialogue.jsx    # Speech bubble & prompt box
│   │   ├── World/
│   │   │   ├── WorldMap.jsx       # World selection & topological waypoint preview
│   │   │   ├── Location.jsx       # Landmark node details
│   │   │   ├── Path.jsx           # Patrol route SVG connector
│   │   │   └── NPCMovement.jsx    # Interpolated waypoint translation engine
│   │   ├── Simulation/
│   │   │   ├── SimulationEngine.jsx # Live 2D canvas, hero sprinters, pottery collisions
│   │   │   ├── DecisionEngine.jsx # Manual override ability triggers
│   │   │   ├── RandomEvent.jsx    # Satirical crisis dilemma modal
│   │   │   └── EventLog.jsx       # Live NPC observability feed
│   │   └── UI/
│   │       ├── Navbar.jsx         # Breadcrumb navigation & sound toggle
│   │       ├── GlassCard.jsx      # Backdrop-blur frosted panel
│   │       ├── StatBar.jsx        # RPG progress bar with glowing fills
│   │       ├── Modal.jsx          # Accessible dialog overlay
│   │       └── Button.jsx         # Retro & cyber glowing buttons with sound effects
│   ├── pages/
│   │   ├── Landing.jsx            # Premise, lineup, and entry CTA
│   │   ├── CreateNPC.jsx          # Live avatar creator, archetypes, & glitch traits
│   │   ├── NPCProfile.jsx         # Character inspection dossier
│   │   ├── World.jsx              # Environment biome selector
│   │   ├── Simulation.jsx         # Live NPC day simulation (06:00 to 22:00)
│   │   ├── DailyReport.jsx        # End-of-day scorecard & S-Tier grade
│   │   └── Leaderboard.jsx        # Hall of Irrelevance standings
│   ├── engine/
│   │   ├── npcBehavior.js         # Behavior state machine (IDLE, PATROL, T_POSE, SWEEP)
│   │   ├── decisionLogic.js       # Routine scheduling & hero response evaluator
│   │   ├── needsSystem.js         # NPC existential psychometrics
│   │   ├── eventSystem.js         # Weighted random incident generator
│   │   └── simulationClock.js     # Virtual day cycle clock & speed multiplier
│   ├── data/
│   │   ├── locations.js           # 4 world topologies & coordinates
│   │   ├── events.js              # 20+ satirical crisis dilemmas
│   │   ├── dialogues.js           # Procedural barks and voice lines
│   │   └── npcDefaults.js         # Starter archetypes & glitch catalog
│   ├── services/
│   │   ├── aiService.js           # Procedural score & reaction generator
│   │   └── soundService.js        # Web Audio API 8-bit sound effects
│   ├── store/
│   │   └── npcStore.js            # Reactive state hook & LocalStorage synchronization
│   ├── App.jsx                    # Root view controller
│   └── main.jsx                   # Vite entrypoint
│
├── public/
│   ├── sprites/                   # Sprite assets
│   ├── maps/                      # Map topologies
│   └── sounds/                    # Audio assets
│
└── README.md
```

---

## Implementation
### Installation
```bash
# Clone the repository
git clone https://github.com/AB1-6/useless_project_temp.git
cd NPCify

# Install dependencies
npm install
```

### Run
```bash
# Start local development server
npm run dev

# Build production bundle
npm run build
```

---

## User Flow
```
┌─────────────────┐
│   LANDING PAGE  │  Satirical manifesto, character lineup, and entry CTA
└────────┬────────┘
         ↓
┌─────────────────┐
│  CREATE YOUR NPC│  Customizer: Archetypes, skin/hair/outfit palette, glitch traits
└────────┬────────┘
         ↓
┌─────────────────┐
│   NPC PROFILE   │  Dossier inspection: Routine, dialogue tree, psychometrics
└────────┬────────┘
         ↓
┌─────────────────┐
│   YOUR WORLD    │  Biome selection: Riverbrook, Neo-Slums, Cubicle Farm, Crosswalk
└────────┬────────┘
         ↓
┌─────────────────┐
│ START SIMULATION│  CRT Boot Sequence: "Purging Main Character Ego..."
└────────┬────────┘
         ↓
┌─────────────────┐
│  LIVE NPC DAY   │  Live 2D interactive canvas: Patrol loops, speeding heroes, pot smashing
└────────┬────────┘
         ↓
┌─────────────────┐
│ RANDOM EVENTS   │  Dilemmas: Pot smashing, crouched pickpockets, levitation bugs
└────────┬────────┘
         ↓
┌─────────────────┐
│ DAILY NPC REPORT│  End-of-day scorecard, S-Tier grade calculation, and unlockable badges
└────────┬────────┘
         ↓
┌─────────────────┐
│   LEADERBOARD   │  Hall of Irrelevance: Global rankings for the least useful NPCs
└─────────────────┘
```

---

## Team Contributions
- **NPC Lead**: Architecture, React Component System, Simulation Engine, Web Audio API synthesis
- **Town Guard #4**: Voice lines, "Must have been the wind" rationalization engine
- **Cabbage Merchant**: Pottery destruction mechanics and economics

---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)
