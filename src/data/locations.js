export const CAMPUS_LOCATIONS = [
  {
    id: 'library',
    name: 'Library',
    tagline: 'Quiet sanctuary with 18°C AC where students go exclusively to sleep.',
    x: 160,
    y: 110,
    icon: '📚',
    color: '#3b82f6',
    ambientSound: 'whispers, page turns, AC hum'
  },
  {
    id: 'classroom',
    name: 'Classroom',
    tagline: '85% attendance requirement zone. Back bench is completely booked.',
    x: 400,
    y: 100,
    icon: '🏫',
    color: '#8b5cf6',
    ambientSound: 'projector hum, chalk clatter, teacher lecturing'
  },
  {
    id: 'canteen',
    name: 'Canteen',
    tagline: 'The true center of student gravity. Tea, samosas, and infinite procrastination.',
    x: 640,
    y: 120,
    icon: '🍴',
    color: '#f97316',
    ambientSound: 'plate clinking, chatter, chai kettle whistling'
  },
  {
    id: 'bus_stop',
    name: 'Bus Stop',
    tagline: 'Where dreams of arriving on time go to die while waiting for the 8:45 bus.',
    x: 140,
    y: 330,
    icon: '🚌',
    color: '#eab308',
    ambientSound: 'diesel engine rumbling, honking, crowd chatter'
  },
  {
    id: 'hostel',
    name: 'Hostel',
    tagline: 'Spawn point. 4 alarms set, 0 alarms respected.',
    x: 390,
    y: 340,
    icon: '🛏️',
    color: '#06b6d4',
    ambientSound: 'corridor footsteps, phone notification pings'
  },
  {
    id: 'gaming_room',
    name: 'Gaming Room',
    tagline: 'RGB lights, loud mechanical key switches, and 2 AM valorant screams.',
    x: 640,
    y: 330,
    icon: '🎮',
    color: '#ec4899',
    ambientSound: 'mouse clicks, discord call pings, keyboard clatter'
  }
];

export const DAILY_TIMELINE = [
  { time: '08:32', icon: '🛏️', text: 'Spawned at Hostel', note: 'Pressed snooze 4 times' },
  { time: '08:55', icon: '🚶', text: 'Heading to Bus Stop', note: 'Walking at 1.2 km/h' },
  { time: '09:15', icon: '🏫', text: 'Reached College', note: 'Checked attendance status' },
  { time: '09:30', icon: '🏫', text: 'Entered Classroom', note: 'Secured back bench corner' },
  { time: '10:15', icon: '⚡', text: 'Energy dropping...', note: 'Staring blankly at whiteboard' },
  { time: '11:20', icon: '🍴', text: 'Path deviation detected', destination: 'Canteen', note: 'Food first... Everything else later.' }
];
