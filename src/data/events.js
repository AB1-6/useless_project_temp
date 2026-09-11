export const CAMPUS_EVENTS = [
  {
    id: 'surprise_assignment',
    badge: 'RANDOM EVENT',
    title: 'SURPRISE ASSIGNMENT!',
    description: 'Professor announced a surprise assignment. Due in 2 days.',
    effects: [
      { name: 'Stress', change: '+40', color: 'rose' },
      { name: 'Motivation', change: '-20', color: 'rose' },
      { name: 'Procrastination', change: '+35', color: 'rose' }
    ],
    annotation: 'Classic NPC response',
    options: [
      {
        text: 'Panic',
        icon: '😱',
        variant: 'danger',
        outcome: 'Heart rate spiked to 140 BPM. Still completed 0 words of the assignment.',
        statChanges: { stress: 40, motivation: -20, procrastination: 35 }
      },
      {
        text: 'Go to Canteen',
        icon: '🍴',
        variant: 'primary',
        outcome: 'Ordered one hot tea and two samosas. The assignment was successfully forgotten.',
        statChanges: { stress: -20, motivation: -10, procrastination: 50, canteenVisits: 1 }
      }
    ]
  },
  {
    id: 'attendance_shortage',
    badge: 'RANDOM EVENT',
    title: 'ATTENDANCE 74.8% CRITICAL!',
    description: 'HOD published the condonation list. You are exactly 1 lecture below cut-off.',
    effects: [
      { name: 'Stress', change: '+30', color: 'rose' },
      { name: 'Excuses Created', change: '+15', color: 'amber' }
    ],
    annotation: 'Survival instinct activated',
    options: [
      {
        text: 'Produce fake medical certificate',
        icon: '🏥',
        variant: 'danger',
        outcome: 'Doctor handwriting was so authentic even the HOD couldn\'t verify it.',
        statChanges: { stress: -10, procrastination: 20 }
      },
      {
        text: 'Go to Canteen',
        icon: '🍴',
        variant: 'primary',
        outcome: 'Canteen tea cures all bureaucratic ailments. You said "Tomorrow nokkam bro".',
        statChanges: { stress: -15, canteenVisits: 1 }
      }
    ]
  },
  {
    id: 'wifi_down',
    badge: 'RANDOM EVENT',
    title: 'CAMPUS WIFI DOWN!',
    description: 'Hostel router exploded. 0 bars of 5G inside room.',
    effects: [
      { name: 'Boredom', change: '+50', color: 'rose' },
      { name: 'Offline Sleep', change: '+2 hours', color: 'cyan' }
    ],
    annotation: 'Digital detox against your will',
    options: [
      {
        text: 'Stare at ceiling until sleep',
        icon: '💤',
        variant: 'secondary',
        outcome: 'Accidentally slept for 14 hours straight. Woke up feeling like a refreshed NPC.',
        statChanges: { sleep: 20 }
      },
      {
        text: 'Go to Canteen',
        icon: '🍴',
        variant: 'primary',
        outcome: 'Walked to canteen to leech password from the senior table.',
        statChanges: { canteenVisits: 1 }
      }
    ]
  }
];
