export const DEFAULT_STUDENT = {
  name: 'Anlin',
  college: 'Sahrdaya',
  wakeTime: '8:00 AM',
  classStart: '9:00 AM',
  favoritePlace: 'Canteen',
  hobby: 'Gaming',
  sleepTime: '1:00 AM',
  studyHabit: 'Rarely',
  commonPhrase: 'Tomorrow cheyyam bro',
  level: 21,
  rarity: 'Common',
  predictability: 87,
  avatar: {
    gender: 'boy',
    hairStyle: 'messy',
    hairColor: '#090d16',
    outfitColor: '#1e3a8a',
    accessory: 'backpack'
  },
  stats: {
    social: 72,
    gaming: 91,
    study: 18,
    laziness: 84,
    sleep: 90
  }
};

export const HOBBIES = [
  { id: 'gaming', label: 'Gaming', icon: '🎮', statBoost: { gaming: 95, sleep: 70 } },
  { id: 'sleeping', label: 'Sleeping', icon: '💤', statBoost: { laziness: 95, sleep: 98 } },
  { id: 'scrolling', label: 'Doom Scrolling', icon: '📱', statBoost: { laziness: 90, study: 10 } },
  { id: 'bingeing', label: 'Binge Watching', icon: '🍿', statBoost: { laziness: 85, social: 50 } },
  { id: 'chai', label: 'Chai with Friends', icon: '☕', statBoost: { social: 92, laziness: 75 } },
  { id: 'gym', label: 'Gym / Fitness', icon: '🏋️', statBoost: { social: 60, laziness: 35 } },
  { id: 'coding', label: 'Unfinished Projects', icon: '💻', statBoost: { study: 45, sleep: 40 } },
  { id: 'daydreaming', label: 'Daydreaming', icon: '💭', statBoost: { laziness: 88, study: 15 } }
];

export const STUDY_HABITS = [
  'Rarely',
  'Night before exam',
  'During lecture only',
  'Never opened textbook',
  '5 minutes before viva',
  'Top 1% nerd'
];

export const FAVORITE_PLACES = [
  'Canteen',
  'Hostel Room',
  'Gaming Room',
  'Library Corner (for AC)',
  'Bus Stop Bench',
  'Classroom Backbench'
];

export const COMMON_PHRASES = [
  'Tomorrow cheyyam bro',
  'Attendance kittiyaal mathi',
  'Scene aano bro?',
  'Food kazhikkan pokaam',
  'Bro just 5 mins, irangiyathullu',
  'Internal mark scene aavum',
  'Let\'s circle back and take this offline'
];

export const COLLEGES = [
  'Sahrdaya',
  'Model Engineering College',
  'CET Trivandrum',
  'GEC Thrissur',
  'TKM College of Engg',
  'NIT Calicut',
  'Mar Athanasius (MACE)',
  'St. Joseph\'s Institute',
  'Rajagiri School of Engg'
];
