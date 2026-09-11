// Smart AI Conversational Engine for College NPCs
// Features multi-layer semantic parsing, dynamic entity extraction,
// natural English & Manglish handling, 9 distinct character personalities,
// live browser Puter AI, and optional Google Gemini API.

export const CHARACTER_PERSONAS = {
  rahul: {
    id: 'rahul',
    name: 'Rahul',
    role: 'Backbench Partner',
    avatar: '👦',
    color: '#ef4444',
    badgeColor: 'bg-red-950 text-red-300 border-red-500/40',
    bubbleBg: 'bg-red-900/90 border-red-400 text-white',
    tone: 'Chill, broke backbencher, tea lover, master of 1-night study',
    voicePitch: 330
  },
  sneha: {
    id: 'sneha',
    name: 'Sneha',
    role: 'Class CR',
    avatar: '👧',
    color: '#eab308',
    badgeColor: 'bg-amber-950 text-amber-300 border-amber-500/40',
    bubbleBg: 'bg-amber-900/90 border-amber-400 text-white',
    tone: 'Responsible, deadline-conscious, warns about HOD, secret bunk sympathizer',
    voicePitch: 580
  },
  kevin: {
    id: 'kevin',
    name: 'Kevin',
    role: 'Hostel Roommate',
    avatar: '🎧',
    color: '#10b981',
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-500/40',
    bubbleBg: 'bg-emerald-900/90 border-emerald-400 text-white',
    tone: 'Hardcore gamer, nocturnal, survives on kettle Maggi, sleep-deprived',
    voicePitch: 240
  },
  chechi: {
    id: 'chechi',
    name: 'Canteen Chechi',
    role: 'Snack Queen',
    avatar: '👩‍🍳',
    color: '#f97316',
    badgeColor: 'bg-orange-950 text-orange-300 border-orange-500/40',
    bubbleBg: 'bg-orange-900/90 border-orange-400 text-white',
    tone: 'Warm, maternal, serves piping hot snacks, warns against ₹5 GPay',
    voicePitch: 420
  },
  prof: {
    id: 'prof',
    name: 'Prof. Kurian',
    role: 'Strict HOD',
    avatar: '👨‍🏫',
    color: '#a855f7',
    badgeColor: 'bg-purple-950 text-purple-300 border-purple-500/40',
    bubbleBg: 'bg-purple-900/90 border-purple-400 text-white',
    tone: 'Demands silence, checks lab records, threatens internal marks',
    voicePitch: 180
  },
  ashwin: {
    id: 'ashwin',
    name: 'Ashwin',
    role: 'Placement Senior',
    avatar: '🎓',
    color: '#06b6d4',
    badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-500/40',
    bubbleBg: 'bg-cyan-900/90 border-cyan-400 text-white',
    tone: 'Cool final-year mentor, cracked FAANG offer, knows all campus hacks',
    voicePitch: 280
  },
  ananya: {
    id: 'ananya',
    name: 'Ananya',
    role: 'Coding Prodigy',
    avatar: '💻',
    color: '#ec4899',
    badgeColor: 'bg-pink-950 text-pink-300 border-pink-500/40',
    bubbleBg: 'bg-pink-900/90 border-pink-400 text-white',
    tone: 'LeetCode grinder, hackathon winner, always debugging in Lab 101',
    voicePitch: 520
  },
  guard: {
    id: 'guard',
    name: 'Appukuttan',
    role: 'Campus Guard',
    avatar: '👮',
    color: '#3b82f6',
    badgeColor: 'bg-blue-950 text-blue-300 border-blue-500/40',
    bubbleBg: 'bg-blue-900/90 border-blue-400 text-white',
    tone: 'Gatekeeper, checks ID cards, blows whistle at 8:55 AM sharp',
    voicePitch: 160
  },
  bruno: {
    id: 'bruno',
    name: 'Bruno',
    role: 'Campus Mascot',
    avatar: '🐕',
    color: '#eab308',
    badgeColor: 'bg-yellow-950 text-yellow-300 border-yellow-500/40',
    bubbleBg: 'bg-yellow-900/90 border-yellow-400 text-white',
    tone: 'Loyal college doggo, loves biscuits, gives attendance blessings',
    voicePitch: 220
  }
};

export const QUICK_PROMPT_QUESTIONS = [
  "What's your schedule today?",
  "How are you doing bro?",
  "Let's have a pizza?",
  "Should we mass bunk today?",
  "What is fresh in the canteen?",
  "Are we playing Valorant tonight?"
];

export const POPULAR_AI_QUESTIONS = QUICK_PROMPT_QUESTIONS;

export const AI_CAMPUS_DILEMMAS = [
  "🚨 AI Dilemma: HOD just called a surprise test for next hour! What's the plan?",
  "💡 AI Dilemma: It's raining heavily outside and 3rd hour is free. Bunk or stay?",
  "☕ AI Dilemma: Only 2 egg puffs left in canteen counter and seniors are coming!",
  "🎮 AI Dilemma: Hostel WiFi was just upgraded to 200 Mbps! Valorant all-nighter?"
];

export const AI_QUESTION_CATEGORIES = {
  academics: {
    name: '🎓 Academics',
    questions: QUICK_PROMPT_QUESTIONS
  }
};

export const aiService = {
  // 1. Google Gemini API (if user entered their key)
  callGeminiAPI: async (questionText, targetCharId = 'rahul', npc = {}, apiKey = '') => {
    if (!apiKey || !apiKey.trim()) return null;

    const persona = CHARACTER_PERSONAS[targetCharId] || CHARACTER_PERSONAS.rahul;
    const systemPrompt = `You are ${persona.name}, role "${persona.role}" in an Indian engineering college simulator called NPCify.
Personality: ${persona.tone}.
Player's name: ${npc.name || 'Friend'}.
Instructions:
- Respond in 1 to 2 punchy sentences maximum.
- Directly, humorously, and realistically answer what the user asked in casual college style.
- If asked in English, reply in natural college English banter.
- If asked in Malayalam/Manglish, reply in relatable Manglish.
- Stay strictly in character!`;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\nUser: ${questionText}\n${persona.name}:` }] }]
        })
      });

      if (!res.ok) return null;
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (text) {
        return {
          charId: persona.id,
          character: persona.name,
          role: persona.role,
          avatar: persona.avatar,
          emote: persona.avatar,
          color: persona.color,
          reply: text.replace(/^"|"$/g, '').trim()
        };
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to local NLP:', e);
    }
    return null;
  },

  // 2. Deep Semantic, Intent & Entity Extraction Engine (Instant, 100% Offline, Zero Popups)
  generateCharacterResponse: (questionText, targetCharId = 'rahul', npc = {}) => {
    const raw = questionText ? questionText.trim() : '';
    const q = raw.toLowerCase();
    const cleanQ = q.replace(/[?!.,'"]/g, '').trim();
    const charId = targetCharId === 'auto' ? 'rahul' : targetCharId;
    const persona = CHARACTER_PERSONAS[charId] || CHARACTER_PERSONAS.rahul;

    // Detect if user typed in Malayalam / Manglish
    const isMalayalam = /sugh|sugam|eda|mwon|kazhich|vishakk|padich|chaya|entha|evide|aano|undo|illa|cheyyam|povaam|mone|maduth|nokk|venda|aada/i.test(q);

    // =========================================================================
    // INTENT 1: VEHICLES, BIKE & RIDES ("CAN I BORROW YOUR BIKE") - Priority over borrow
    // =========================================================================
    if (q.includes('bike') || q.includes('car') || q.includes('scooter') || q.includes('bullet') || q.includes('ride') || q.includes('lift') || q.includes('bus') || q.includes('vehicle')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '🛵',
          color: '#ef4444',
          reply: "Bro my bike is running on reserve petrol since last Tuesday! If you put ₹100 petrol into the tank, you can take it anywhere."
        };
      }
      if (charId === 'guard') {
        return {
          charId: 'guard',
          character: 'Appukuttan',
          role: 'Campus Guard',
          avatar: '👮',
          emote: '🪖',
          color: '#3b82f6',
          reply: "No helmet, no bike entry into college campus! And park only in the designated student parking shed near gate 2!"
        };
      }
      if (charId === 'kevin') {
        return {
          charId: 'kevin',
          character: 'Kevin',
          role: 'Hostel Gamer',
          avatar: '🎧',
          emote: '🚲',
          color: '#10b981',
          reply: "My cycle has had a flat tyre parked behind Hostel 4B since 1st semester. I just walk or take a lift from roommates."
        };
      }
      if (charId === 'sneha') {
        return {
          charId: 'sneha',
          character: 'Sneha',
          role: 'Class CR',
          avatar: '👧',
          emote: '🚌',
          color: '#eab308',
          reply: "I take the 8:45 AM college bus every single day! Always on time, unlike the backbenchers on bikes!"
        };
      }
    }

    // =========================================================================
    // INTENT 2: FOOD & DRINK (Pizza, Burger, Biryani, Canteen, Hungry, Starving)
    // =========================================================================
    const specificFoods = ['pizza', 'burger', 'shawarma', 'biryani', 'mandi', 'porotta', 'maggi', 'sandwich', 'ice cream', 'coffee', 'chai', 'tea', 'samosa', 'puff', 'cake', 'noodles', 'dosa', 'meals'];
    const detectedSpecificFood = specificFoods.find(f => q.includes(f));
    const isGeneralHunger = q.includes('hungry') || q.includes('starving') || q.includes('eat') || q.includes('food') || q.includes('breakfast') || q.includes('lunch') || q.includes('dinner') || q.includes('canteen') || q.includes('fresh') || q.includes('menu') || q.includes('snack');

    if (detectedSpecificFood || isGeneralHunger || /let'?s\s+(have|eat|grab|order|get)/i.test(q) || /craving/i.test(q)) {
      const foodItem = detectedSpecificFood || 'canteen snacks';
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '☕',
          color: '#ef4444',
          reply: detectedSpecificFood
            ? (isMalayalam
                ? `Bro ${detectedSpecificFood}-inu aarkka cash ullathu?! Nee treat tharuanenkil njan ready, allenkil canteen tea & puff kazhikkaam!`
                : `Bro who has money for ${detectedSpecificFood}?! Unless you're treating me, my bank account only supports canteen chai and samosa!`)
            : `Piping hot egg puffs and crispy parippuvada just came out of the canteen kitchen! Let's grab chai before the rush starts!`
        };
      }
      if (charId === 'chechi') {
        return {
          charId: 'chechi',
          character: 'Canteen Chechi',
          role: 'Snack Queen',
          avatar: '👩‍🍳',
          emote: '🍴',
          color: '#f97316',
          reply: detectedSpecificFood
            ? `Mone, no outside ${detectedSpecificFood} in college canteen! But I have fresh piping hot parippuvada, egg puffs, and special elaichi tea ready!`
            : `Mone, come inside! Fresh batch of parippuvada just came out of the hot oil. How many do you want?`
        };
      }
      if (charId === 'kevin') {
        return {
          charId: 'kevin',
          character: 'Kevin',
          role: 'Hostel Gamer',
          avatar: '🎧',
          emote: '🛵',
          color: '#10b981',
          reply: detectedSpecificFood
            ? `Bro order ${detectedSpecificFood} on Swiggy to hostel back gate! I'll split delivery charges if you let me have some.`
            : `I'm living on kettle Maggi and hostel canteen chai bro. Let's order something good tonight!`
        };
      }
      if (charId === 'sneha') {
        return {
          charId: 'sneha',
          character: 'Sneha',
          role: 'Class CR',
          avatar: '👧',
          emote: '⏰',
          color: '#eab308',
          reply: `We have lecture in 10 minutes! Waiting around for food will make us late, and Prof. Kurian locks the classroom door at 9:00 AM!`
        };
      }
      if (charId === 'ashwin') {
        return {
          charId: 'ashwin',
          character: 'Ashwin',
          role: 'Placement Senior',
          avatar: '🎓',
          emote: '😎',
          color: '#06b6d4',
          reply: `Great choice! There's a famous spot right outside the campus back gate that serves amazing food. Let's go after 4:00 PM!`
        };
      }
      if (charId === 'bruno') {
        return {
          charId: 'bruno',
          character: 'Bruno',
          role: 'Campus Mascot',
          avatar: '🐕',
          emote: '😋',
          color: '#eab308',
          reply: `*Drools instantly at the mention of food* Woof! (Please tell me there's leftover crust or biscuits for good boys!)`
        };
      }
      if (charId === 'prof') {
        return {
          charId: 'prof',
          character: 'Prof. Kurian',
          role: 'Strict HOD',
          avatar: '👨‍🏫',
          emote: '⚡',
          color: '#a855f7',
          reply: `Food is strictly prohibited inside the department block! Finish your snacks in the canteen before entering the lab!`
        };
      }
    }

    // =========================================================================
    // INTENT 2: OUTINGS & BUNK PLANS ("LET'S GO TO X", "HANG OUT", "BUNK")
    // =========================================================================
    const placeKeywords = ['movie', 'beach', 'mall', 'cafe', 'theater', 'hostel', 'park', 'turf', 'room', 'trip', 'drive'];
    const detectedPlace = placeKeywords.find(p => q.includes(p));

    if (detectedPlace || /let'?s\s+go/i.test(q) || /hangout/i.test(q) || /escape/i.test(q)) {
      const place = detectedPlace || 'outside';
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '🏃‍♂️',
          color: '#ef4444',
          reply: `Bro I'm 100% down for the ${place}! If we slip past the gate after 2nd period attendance, Appukuttan won't even notice.`
        };
      }
      if (charId === 'sneha') {
        return {
          charId: 'sneha',
          character: 'Sneha',
          role: 'Class CR',
          avatar: '👧',
          emote: '⚠️',
          color: '#eab308',
          reply: `Going to the ${place} during college hours?! Do you know tutor calls parents if attendance falls below 75%?!`
        };
      }
      if (charId === 'guard') {
        return {
          charId: 'guard',
          character: 'Appukuttan',
          role: 'Campus Guard',
          avatar: '👮',
          emote: '🛑',
          color: '#3b82f6',
          reply: `Nobody leaves campus for the ${place} before 4:00 PM! Show signed gate pass from HOD first, otherwise back to class!`
        };
      }
      if (charId === 'ashwin') {
        return {
          charId: 'ashwin',
          character: 'Ashwin',
          role: 'Placement Senior',
          avatar: '🎓',
          emote: '🚗',
          color: '#06b6d4',
          reply: `Haha classic college plan! We used to bunk to the ${place} all the time in 2nd year. Just make sure your proxy is sorted!`
        };
      }
    }

    // =========================================================================
    // INTENT 3: GAMING & SPORTS (Valorant, BGMI, Cricket, Football)
    // =========================================================================
    if (q.includes('play') || q.includes('cricket') || q.includes('football') || q.includes('valorant') || q.includes('bgmi') || q.includes('game') || q.includes('fifa')) {
      const sport = q.includes('cricket') ? 'cricket' : q.includes('football') ? 'football' : q.includes('valorant') ? 'Valorant' : 'games';
      if (charId === 'kevin') {
        return {
          charId: 'kevin',
          character: 'Kevin',
          role: 'Hostel Gamer',
          avatar: '🎧',
          emote: '🎮',
          color: '#10b981',
          reply: `100% down for ${sport}! Hop on Discord at 10 PM tonight, we're doing a full 5-stack competitive grind in room 4B!`
        };
      }
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '⚽',
          color: '#ef4444',
          reply: `Count me in for ${sport}! Let's hit the turf right after the final bell rings at 4 PM.`
        };
      }
      if (charId === 'ashwin') {
        return {
          charId: 'ashwin',
          character: 'Ashwin',
          role: 'Placement Senior',
          avatar: '🎓',
          emote: '🏆',
          color: '#06b6d4',
          reply: `Seniors vs Juniors match at the turf this evening! Winner gets free canteen samosas from the losing team!`
        };
      }
    }

    // =========================================================================
    // INTENT 4: IDENTITY & NAME ("WHAT'S YOUR NAME", "WHO ARE YOU")
    // =========================================================================
    if (q.includes('your name') || q.includes('who are you') || q.includes('who r u') || q.includes('introduce') || q.includes('tell me about you')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '😎',
          color: '#ef4444',
          reply: "I'm Rahul! Your official backbench co-pilot, professional proxy supplier, and canteen tea connoisseur."
        };
      }
      if (charId === 'sneha') {
        return {
          charId: 'sneha',
          character: 'Sneha',
          role: 'Class CR',
          avatar: '👧',
          emote: '📋',
          color: '#eab308',
          reply: "I'm Sneha, your Class Representative (CR)! Basically the only reason our batch doesn't get debarred every month."
        };
      }
      if (charId === 'kevin') {
        return {
          charId: 'kevin',
          character: 'Kevin',
          role: 'Hostel Gamer',
          avatar: '🎧',
          emote: '🎮',
          color: '#10b981',
          reply: "Kevin here, resident room 4B gamer, Discord night-crawler, and eternal sleepy student."
        };
      }
      if (charId === 'chechi') {
        return {
          charId: 'chechi',
          character: 'Canteen Chechi',
          role: 'Snack Queen',
          avatar: '👩‍🍳',
          emote: '🍳',
          color: '#f97316',
          reply: "I am your Canteen Chechi! Keeping 2,000 engineering students alive with piping hot tea and parippuvada since 2012!"
        };
      }
      if (charId === 'prof') {
        return {
          charId: 'prof',
          character: 'Prof. Kurian',
          role: 'Strict HOD',
          avatar: '👨‍🏫',
          emote: '⚡',
          color: '#a855f7',
          reply: "I am Professor Kurian, Head of the Department. And you should be paying attention instead of chatting!"
        };
      }
      if (charId === 'ashwin') {
        return {
          charId: 'ashwin',
          character: 'Ashwin',
          role: 'Placement Senior',
          avatar: '🎓',
          emote: '🕶️',
          color: '#06b6d4',
          reply: "I'm Ashwin, final-year senior! Placed at TCS with an 8 LPA offer, now just chilling and giving survival tips to juniors."
        };
      }
      if (charId === 'ananya') {
        return {
          charId: 'ananya',
          character: 'Ananya',
          role: 'Coding Prodigy',
          avatar: '💻',
          emote: '🚀',
          color: '#ec4899',
          reply: "Hey! I'm Ananya, 2nd year CS. When I'm not grinding LeetCode in Lab 101, I build web apps and play guitar."
        };
      }
      if (charId === 'guard') {
        return {
          charId: 'guard',
          character: 'Appukuttan',
          role: 'Campus Guard',
          avatar: '👮',
          emote: '🪪',
          color: '#3b82f6',
          reply: "Appukuttan! Chief campus security. 18 years of guarding this gate against bunking students!"
        };
      }
      if (charId === 'bruno') {
        return {
          charId: 'bruno',
          character: 'Bruno',
          role: 'Campus Mascot',
          avatar: '🐕',
          emote: '🐾',
          color: '#eab308',
          reply: "*Wags tail vigorously* Woof! (I'm Bruno, unofficial campus mascot and chief biscuit inspector!)"
        };
      }
    }

    // =========================================================================
    // INTENT 5: SCHEDULE & PLANS ("WHAT'S YOUR SCHEDULE", "WHAT ARE YOU DOING")
    // =========================================================================
    if (q.includes('schedule') || q.includes('routine') || q.includes('plan') || q.includes('today') || q.includes('doing') || q.includes('innathe')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '☕',
          color: '#ef4444',
          reply: isMalayalam
            ? "Nothing broo chilling! 1st hour sleep, interval-il canteen tea, lunch-inu mass bunk, evening chaya. Pure NPC routine!"
            : "Nothing broo chilling! Just attending 1st hour, interval canteen for tea, bunking lunch, then evening chill. Exactly how an NPC lives!"
        };
      }
      if (charId === 'sneha') {
        return {
          charId: 'sneha',
          character: 'Sneha',
          role: 'Class CR',
          avatar: '👧',
          emote: '📋',
          color: '#eab308',
          reply: "8:45 AM bus arrival, 4 hours of lectures, collecting lab observation notebooks, then library study till 5 PM!"
        };
      }
      if (charId === 'kevin') {
        return {
          charId: 'kevin',
          character: 'Kevin',
          role: 'Hostel Gamer',
          avatar: '🎧',
          emote: '🎮',
          color: '#10b981',
          reply: "Wake up at 12, kettle Maggi at 1, grind Valorant comp matches till 4 AM. Peak hostel routine."
        };
      }
      if (charId === 'ashwin') {
        return {
          charId: 'ashwin',
          character: 'Ashwin',
          role: 'Placement Senior',
          avatar: '🎓',
          emote: '💼',
          color: '#06b6d4',
          reply: "Reviewing junior resumes, meeting project guide at 2, then playing football at the turf around 4:30 PM."
        };
      }
      if (charId === 'ananya') {
        return {
          charId: 'ananya',
          character: 'Ananya',
          role: 'Coding Prodigy',
          avatar: '💻',
          emote: '🔬',
          color: '#ec4899',
          reply: "Morning algorithms lecture, 3 hours of coding in Lab 101, then hackathon brainstorm with my team."
        };
      }
      if (charId === 'chechi') {
        return {
          charId: 'chechi',
          character: 'Canteen Chechi',
          role: 'Snack Queen',
          avatar: '👩‍🍳',
          emote: '🍳',
          color: '#f97316',
          reply: "Frying 200 parippuvadas, brewing continuous ginger tea, and reminding students not to leave plates on tables!"
        };
      }
      if (charId === 'guard') {
        return {
          charId: 'guard',
          character: 'Appukuttan',
          role: 'Campus Guard',
          avatar: '👮',
          emote: '🛑',
          color: '#3b82f6',
          reply: "Gate lock at 8:55 AM, intercepting latecomers, checking day-scholar vehicle stickers, gate unlock at 4:00 PM!"
        };
      }
      if (charId === 'bruno') {
        return {
          charId: 'bruno',
          character: 'Bruno',
          role: 'Campus Mascot',
          avatar: '🐕',
          emote: '💤',
          color: '#eab308',
          reply: "*Stretches lazy paws* Nap under mango tree, beg biscuit from canteen at 11 AM, chase campus cat at 3 PM!"
        };
      }
      if (charId === 'prof') {
        return {
          charId: 'prof',
          character: 'Prof. Kurian',
          role: 'Strict HOD',
          avatar: '👨‍🏫',
          emote: '📚',
          color: '#a855f7',
          reply: "Evaluating 60 mid-term exam papers, surprise lab inspection at 2 PM, and finalizing debarred list!"
        };
      }
    }

    // =========================================================================
    // INTENT 6: ASSIGNMENTS, RECORDS & LABWORK ("DID YOU DO ASSIGNMENT")
    // =========================================================================
    if (q.includes('assignment') || q.includes('homework') || q.includes('record') || q.includes('observation') || q.includes('submission') || q.includes('copy') || q.includes('notes') || q.includes('xerox')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '📝',
          color: '#ef4444',
          reply: "Bro whose record are you copying?! Pass it over when you're done, I still have 12 circuit diagrams left to draw in pencil!"
        };
      }
      if (charId === 'sneha') {
        return {
          charId: 'sneha',
          character: 'Sneha',
          role: 'Class CR',
          avatar: '👧',
          emote: '🚨',
          color: '#eab308',
          reply: "Submission is tomorrow 9:00 AM sharp! HOD clearly said anyone submitting after the deadline gets zero internal marks!"
        };
      }
      if (charId === 'kevin') {
        return {
          charId: 'kevin',
          character: 'Kevin',
          role: 'Hostel Gamer',
          avatar: '🎧',
          emote: '😴',
          color: '#10b981',
          reply: "I haven't even bought the record notebook yet bro... will photocopy someone's PDF at the campus xerox shop at 8:30 AM."
        };
      }
      if (charId === 'ananya') {
        return {
          charId: 'ananya',
          character: 'Ananya',
          role: 'Coding Prodigy',
          avatar: '💻',
          emote: '📂',
          color: '#ec4899',
          reply: "I pushed the lab code and output graphs to our batch Google Drive folder yesterday! Feel free to refer to it."
        };
      }
      if (charId === 'prof') {
        return {
          charId: 'prof',
          character: 'Prof. Kurian',
          role: 'Strict HOD',
          avatar: '👨‍🏫',
          emote: '⚡',
          color: '#a855f7',
          reply: "Every single graph must be hand-drawn with scale and units! Copied observations will result in lab repeat!"
        };
      }
    }

    // =========================================================================
    // INTENT 7: MONEY, GPAY & LENDING ("CAN YOU GIVE 500 RS", "BORROW MONEY")
    // =========================================================================
    if (q.includes('500') || q.includes('100') || q.includes('money') || q.includes('cash') || q.includes('gpay') || q.includes('paytm') || q.includes('lend') || q.includes('borrow') || q.includes('broke') || q.includes('treat')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '💸',
          color: '#ef4444',
          reply: "Bro look at my Google Pay balance: ₹14.32! You're asking the most broke guy on this campus. If anything, you should treat me to chai!"
        };
      }
      if (charId === 'kevin') {
        return {
          charId: 'kevin',
          character: 'Kevin',
          role: 'Hostel Gamer',
          avatar: '🎧',
          emote: '💳',
          color: '#10b981',
          reply: "I spent my monthly pocket money on Steam summer sale and 2 AM Swiggy delivery. I am clinically broke man."
        };
      }
      if (charId === 'chechi') {
        return {
          charId: 'chechi',
          character: 'Canteen Chechi',
          role: 'Snack Queen',
          avatar: '👩‍🍳',
          emote: '📖',
          color: '#f97316',
          reply: "Don't do ₹5 GPay transactions here mone, bank server is down! Write your name in the credit notebook and settle on Friday!"
        };
      }
      if (charId === 'ashwin') {
        return {
          charId: 'ashwin',
          character: 'Ashwin',
          role: 'Placement Senior',
          avatar: '🎓',
          emote: '🍔',
          color: '#06b6d4',
          reply: "Haha juniors always asking seniors for treats! Clear all your internals without backlogs, and I'll treat you to shawarma."
        };
      }
    }

    // =========================================================================
    // INTENT 8: CRUSH & LOVE & RELATIONSHIPS ("WHO IS YOUR CRUSH", "I LOVE YOU")
    // =========================================================================
    if (q.includes('crush') || q.includes('love') || q.includes('dating') || q.includes('girlfriend') || q.includes('boyfriend') || q.includes('propose') || q.includes('single') || q.includes('marry')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '🤫',
          color: '#ef4444',
          reply: "Bro shhh! Keep it down! Don't look now, but she's sitting two benches ahead near the window... act completely natural!"
        };
      }
      if (charId === 'sneha') {
        return {
          charId: 'sneha',
          character: 'Sneha',
          role: 'Class CR',
          avatar: '👧',
          emote: '📚',
          color: '#eab308',
          reply: "Focus on passing engineering mathematics first! Love stories won't help you clear university semester exams!"
        };
      }
      if (charId === 'kevin') {
        return {
          charId: 'kevin',
          character: 'Kevin',
          role: 'Hostel Gamer',
          avatar: '🎧',
          emote: '🎮',
          color: '#10b981',
          reply: "My only true love is 240 FPS and 5ms ping on a fiber optic line. Romance has too many bugs and zero patch updates."
        };
      }
      if (charId === 'ashwin') {
        return {
          charId: 'ashwin',
          character: 'Ashwin',
          role: 'Placement Senior',
          avatar: '🎓',
          emote: '💔',
          color: '#06b6d4',
          reply: "Campus romances are great until final-year placements hit and one of you gets posted in Bangalore and one in Hyderabad!"
        };
      }
    }

    // =========================================================================
    // INTENT 9: HOBBIES & ANIME & MUSIC ("DO YOU LIKE ANIME", "YOUR HOBBY")
    // =========================================================================
    if (q.includes('hobby') || q.includes('anime') || q.includes('music') || q.includes('song') || q.includes('guitar') || q.includes('series') || q.includes('netflix') || q.includes('movie')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '🎧',
          color: '#ef4444',
          reply: "My hobbies are sleeping through 8:30 AM lectures, binge-watching Jujutsu Kaisen until 3 AM, and finding excuses to visit the canteen!"
        };
      }
      if (charId === 'kevin') {
        return {
          charId: 'kevin',
          character: 'Kevin',
          role: 'Hostel Gamer',
          avatar: '🎧',
          emote: '⚡',
          color: '#10b981',
          reply: "Attack on Titan, Solo Leveling, and mechanical keyboard ASMR! If you watch anime, we're instantly best friends."
        };
      }
      if (charId === 'ananya') {
        return {
          charId: 'ananya',
          character: 'Ananya',
          role: 'Coding Prodigy',
          avatar: '💻',
          emote: '🎸',
          color: '#ec4899',
          reply: "I play acoustic guitar under the mango tree during free hours, and I listen to lofi beats while debugging React components!"
        };
      }
    }

    // =========================================================================
    // INTENT 10: ROBOT / AI / MATRIX / SIMULATION ("ARE YOU A ROBOT", "WHO MADE YOU")
    // =========================================================================
    if (q.includes('robot') || q.includes('are you ai') || q.includes('who made you') || q.includes('are you real') || q.includes('simulation') || q.includes('matrix') || q.includes('npc') || q.includes('bot')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '🤖',
          color: '#ef4444',
          reply: "Robot?! Bro if I were an AI, do you think I'd voluntarily choose to suffer in an engineering college?! I'm as broke and sleepy as you!"
        };
      }
      if (charId === 'kevin') {
        return {
          charId: 'kevin',
          character: 'Kevin',
          role: 'Hostel Gamer',
          avatar: '🎧',
          emote: '👾',
          color: '#10b981',
          reply: "Bro we are all NPCs in the grand simulation of higher education. Some of us just have cooler side quests."
        };
      }
      if (charId === 'ananya') {
        return {
          charId: 'ananya',
          character: 'Ananya',
          role: 'Coding Prodigy',
          avatar: '💻',
          emote: '⚡',
          color: '#ec4899',
          reply: "Technically I'm rendered with React components and vector CSS, but emotionally I'm 100% surviving engineering!"
        };
      }
      if (charId === 'prof') {
        return {
          charId: 'prof',
          character: 'Prof. Kurian',
          role: 'Strict HOD',
          avatar: '👨‍🏫',
          emote: '📖',
          color: '#a855f7',
          reply: "If you are interested in Artificial Intelligence, make sure your final year seminar paper has zero plagiarism!"
        };
      }
    }

    // =========================================================================
    // INTENT 11: CURRENT LOCATION & WHY STANDING HERE ("WHY ARE YOU HERE")
    // =========================================================================
    if (q.includes('standing here') || q.includes('why are you here') || q.includes('where are you') || q.includes('where are u') || q.includes('what are you doing here')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '👀',
          color: '#ef4444',
          reply: "Hiding behind the pillar! If Prof. Kurian spots me in the corridor, he'll ask why I'm not in the fluid mechanics lab."
        };
      }
      if (charId === 'guard') {
        return {
          charId: 'guard',
          character: 'Appukuttan',
          role: 'Campus Guard',
          avatar: '👮',
          emote: '🛑',
          color: '#3b82f6',
          reply: "I am stationed right here at the main gate to prevent students from escaping before 4:00 PM without an authorized gate pass!"
        };
      }
      if (charId === 'chechi') {
        return {
          charId: 'chechi',
          character: 'Canteen Chechi',
          role: 'Snack Queen',
          avatar: '👩‍🍳',
          emote: '☕',
          color: '#f97316',
          reply: "Standing behind this canteen counter since 7:30 AM making sure you hungry students don't faint during lectures!"
        };
      }
      if (charId === 'sneha') {
        return {
          charId: 'sneha',
          character: 'Sneha',
          role: 'Class CR',
          avatar: '👧',
          emote: '📋',
          color: '#eab308',
          reply: "Waiting for the department office to give me the updated attendance shortage list. Someone has to do the work!"
        };
      }
    }

    // =========================================================================
    // INTENT 12: TEACHERS, FACULTY & HOD ("WHAT DO YOU THINK OF HOD")
    // =========================================================================
    if (q.includes('hod') || q.includes('prof') || q.includes('kurian') || q.includes('teacher') || q.includes('faculty') || q.includes('staff') || q.includes('strict')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '🤐',
          color: '#ef4444',
          reply: "Prof. Kurian has eyes in the back of his head bro! If he catches you looking at your phone under the bench, say goodbye to internal marks!"
        };
      }
      if (charId === 'prof') {
        return {
          charId: 'prof',
          character: 'Prof. Kurian',
          role: 'Strict HOD',
          avatar: '👨‍🏫',
          emote: '⚡',
          color: '#a855f7',
          reply: "I have 25 years of teaching experience, and I can spot a student sleeping with open eyes from 50 feet away!"
        };
      }
      if (charId === 'sneha') {
        return {
          charId: 'sneha',
          character: 'Sneha',
          role: 'Class CR',
          avatar: '👧',
          emote: '⚖️',
          color: '#eab308',
          reply: "He seems very strict, but if you submit all assignments on time and don't shout in the corridors, he gives good internals."
        };
      }
      if (charId === 'ashwin') {
        return {
          charId: 'ashwin',
          character: 'Ashwin',
          role: 'Placement Senior',
          avatar: '🎓',
          emote: '💡',
          color: '#06b6d4',
          reply: "Pro tip from a senior: Just nod seriously during his lectures and ask one intelligent question. He'll love you forever."
        };
      }
    }

    // =========================================================================
    // INTENT 13: EXAMS, STUDIES & PASSING ("HOW TO PASS EXAMS", "STUDY")
    // =========================================================================
    if (q.includes('exam') || q.includes('study') || q.includes('pass') || q.includes('supply') || q.includes('backlog') || q.includes('internal') || q.includes('kt') || q.includes('cgpa') || q.includes('marks')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '📺',
          color: '#ef4444',
          reply: "Step 1: Panic. Step 2: Open YouTube at 11 PM before the exam. Step 3: Watch 'Entire Syllabus in 45 Minutes' at 2x speed. Works every time!"
        };
      }
      if (charId === 'sneha') {
        return {
          charId: 'sneha',
          character: 'Sneha',
          role: 'Class CR',
          avatar: '👧',
          emote: '📖',
          color: '#eab308',
          reply: "Start studying standard textbooks instead of reading 1-shot summaries 2 hours before the exam! The question paper is tough this year."
        };
      }
      if (charId === 'ashwin') {
        return {
          charId: 'ashwin',
          character: 'Ashwin',
          role: 'Placement Senior',
          avatar: '🎓',
          emote: '📑',
          color: '#06b6d4',
          reply: "Solve the previous 5 years' university question papers! At least 70% of the concepts repeat every single year without fail."
        };
      }
      if (charId === 'ananya') {
        return {
          charId: 'ananya',
          character: 'Ananya',
          role: 'Coding Prodigy',
          avatar: '💻',
          emote: '💡',
          color: '#ec4899',
          reply: "Understand the core algorithms first rather than memorizing syntax. If you get the logic right, passing is effortless!"
        };
      }
    }

    // =========================================================================
    // INTENT 14: VEHICLES, BIKE & RIDES ("CAN I BORROW YOUR BIKE")
    // =========================================================================
    if (q.includes('bike') || q.includes('car') || q.includes('scooter') || q.includes('bullet') || q.includes('ride') || q.includes('lift') || q.includes('bus') || q.includes('vehicle')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '🛵',
          color: '#ef4444',
          reply: "Bro my bike is running on reserve petrol since last Tuesday! If you put ₹100 petrol into the tank, you can take it anywhere."
        };
      }
      if (charId === 'guard') {
        return {
          charId: 'guard',
          character: 'Appukuttan',
          role: 'Campus Guard',
          avatar: '👮',
          emote: '🪖',
          color: '#3b82f6',
          reply: "No helmet, no bike entry into college campus! And park only in the designated student parking shed near gate 2!"
        };
      }
      if (charId === 'kevin') {
        return {
          charId: 'kevin',
          character: 'Kevin',
          role: 'Hostel Gamer',
          avatar: '🎧',
          emote: '🚲',
          color: '#10b981',
          reply: "My cycle has had a flat tyre parked behind Hostel 4B since 1st semester. I just walk or take a lift from roommates."
        };
      }
    }

    // =========================================================================
    // INTENT 15: PROXY & ATTENDANCE ("CAN YOU GIVE PROXY", "ATTENDANCE")
    // =========================================================================
    if (q.includes('proxy') || q.includes('attendance') || q.includes('bunk') || q.includes('shortage') || q.includes('75%')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '🗣️',
          color: '#ef4444',
          reply: "Yeah sure bro, I'll shout 'Present Sir' in 2 different vocal pitches during roll call. Just make sure you return the favor tomorrow!"
        };
      }
      if (charId === 'sneha') {
        return {
          charId: 'sneha',
          character: 'Sneha',
          role: 'Class CR',
          avatar: '👧',
          emote: '📝',
          color: '#eab308',
          reply: "Do not ask me for proxy! I'm the CR, if Prof. Kurian catches a proxy on my attendance sheet, my internal marks will suffer!"
        };
      }
      if (charId === 'guard') {
        return {
          charId: 'guard',
          character: 'Appukuttan',
          role: 'Campus Guard',
          avatar: '👮',
          emote: '🛑',
          color: '#3b82f6',
          reply: "Attendance is taken at 9:00 AM! If you are standing outside this gate right now, you are already marked absent!"
        };
      }
    }

    // =========================================================================
    // INTENT 16: GREETINGS & WELL-WISHES ("HOW ARE YOU", "GOOD MORNING")
    // =========================================================================
    if (q.includes('good morning') || q.includes('good night') || q.includes('how are you') || q.includes('whats up') || q.includes('hello') || q.includes('hey') || q.includes('hi ') || cleanQ === 'hi') {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '👋',
          color: '#ef4444',
          reply: isMalayalam
            ? "Sugamaanu bro! Just surviving college. Chaya kudikkan ponno?"
            : "I'm doing good bro! Just chilling, surviving college. What about you, all good?"
        };
      }
      if (charId === 'sneha') {
        return {
          charId: 'sneha',
          character: 'Sneha',
          role: 'Class CR',
          avatar: '👧',
          emote: '✨',
          color: '#eab308',
          reply: "Good morning! Please make sure your lab record is signed before 1st period starts!"
        };
      }
      if (charId === 'kevin') {
        return {
          charId: 'kevin',
          character: 'Kevin',
          role: 'Hostel Gamer',
          avatar: '🎧',
          emote: '🥱',
          color: '#10b981',
          reply: "Morning? Bro my eyes are barely open, I played Valorant till 4 AM. Need strong canteen coffee right now."
        };
      }
      if (charId === 'chechi') {
        return {
          charId: 'chechi',
          character: 'Canteen Chechi',
          role: 'Snack Queen',
          avatar: '👩‍🍳',
          emote: '☕',
          color: '#f97316',
          reply: "Namaskaram mone! Had breakfast yet? Fresh tea is boiling right now, come grab a cup!"
        };
      }
      if (charId === 'bruno') {
        return {
          charId: 'bruno',
          character: 'Bruno',
          role: 'Campus Mascot',
          avatar: '🐕',
          emote: '🐶',
          color: '#eab308',
          reply: "*Wags tail enthusiastically and leans in for head pats!* Woof!"
        };
      }
    }

    // =========================================================================
    // INTENT 17: FEELINGS & BOREDOM ("I FEEL BORED", "TIRED", "SLEEPY")
    // =========================================================================
    if (q.includes('bored') || q.includes('tired') || q.includes('sleepy') || q.includes('sad') || q.includes('stress') || q.includes('headache')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '🥱',
          color: '#ef4444',
          reply: "Same here bro, this lecture is so boring! Let's sneak off to the canteen or take a quick nap behind the last bench."
        };
      }
      if (charId === 'kevin') {
        return {
          charId: 'kevin',
          character: 'Kevin',
          role: 'Hostel Gamer',
          avatar: '🎧',
          emote: '💤',
          color: '#10b981',
          reply: "College is 90% boredom and 10% exam panic bro. Pop on your earphones and put a podcast on low volume."
        };
      }
      if (charId === 'chechi') {
        return {
          charId: 'chechi',
          character: 'Canteen Chechi',
          role: 'Snack Queen',
          avatar: '👩‍🍳',
          emote: '☕',
          color: '#f97316',
          reply: "Whenever you feel tired mone, have a hot cup of ginger tea and hot parippuvada, all tiredness will vanish!"
        };
      }
    }

    // =========================================================================
    // INTENT 18: TIME & BELLS ("WHAT IS THE TIME")
    // =========================================================================
    if (q.includes('time') || q.includes('bell') || q.includes('period') || q.includes('clock')) {
      return {
        charId: persona.id,
        character: persona.name,
        role: persona.role,
        avatar: persona.avatar,
        emote: '⏰',
        color: persona.color,
        reply: "It's around 10:45 AM! Interval bell should ring any second now, get ready to sprint to the canteen!"
      };
    }

    // =========================================================================
    // INTENT 19: JOKES & HUMOR ("TELL ME A JOKE")
    // =========================================================================
    if (q.includes('joke') || q.includes('funny') || q.includes('laugh')) {
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '😂',
          color: '#ef4444',
          reply: "Our batch's attendance percentage is the biggest joke on this entire campus bro!"
        };
      }
      if (charId === 'kevin') {
        return {
          charId: 'kevin',
          character: 'Kevin',
          role: 'Hostel Gamer',
          avatar: '🎧',
          emote: '💀',
          color: '#10b981',
          reply: "Why did the engineering student cross the road? Because the attendance wasn't being marked on the other side!"
        };
      }
      if (charId === 'ashwin') {
        return {
          charId: 'ashwin',
          character: 'Ashwin',
          role: 'Placement Senior',
          avatar: '🎓',
          emote: '🤣',
          color: '#06b6d4',
          reply: "The biggest joke in engineering: 'Bro we will start studying seriously from Monday!'"
        };
      }
    }

    // =========================================================================
    // INTENT 20: PLACEMENTS & CAREERS ("PLACEMENT", "INTERNSHIP", "JOB")
    // =========================================================================
    if (q.includes('placement') || q.includes('job') || q.includes('package') || q.includes('internship') || q.includes('salary') || q.includes('resume') || q.includes('tcs') || q.includes('coding')) {
      if (charId === 'ashwin') {
        return {
          charId: 'ashwin',
          character: 'Ashwin',
          role: 'Placement Senior',
          avatar: '🎓',
          emote: '💼',
          color: '#06b6d4',
          reply: "Grind Data Structures & Algorithms, build 2 solid GitHub projects, and speak confidently in HR interviews. You'll easily crack 8+ LPA!"
        };
      }
      if (charId === 'ananya') {
        return {
          charId: 'ananya',
          character: 'Ananya',
          role: 'Coding Prodigy',
          avatar: '💻',
          emote: '🚀',
          color: '#ec4899',
          reply: "Start practicing LeetCode medium problems early! Also participate in college hackathons, it gives your resume huge weight."
        };
      }
      if (charId === 'rahul') {
        return {
          charId: 'rahul',
          character: 'Rahul',
          role: 'Backbench Partner',
          avatar: '👦',
          emote: '☕',
          color: '#ef4444',
          reply: "Bro I'm just hoping mass recruiters don't look at my 2nd semester mathematics marks! As long as they offer tea in the office, I'm happy."
        };
      }
    }

    // =========================================================================
    // INTENT 21: DYNAMIC SYNTACTIC ECHO ENGINE (Context-Aware for ANY Arbitrary Question)
    // =========================================================================
    // Extracts the user's specific subject topic so EVERY answer directly quotes/engages with it!
    const subjectQuery = q
      .replace(/^(who|what|why|when|where|how|can|could|do|does|did|is|are|will|would|tell me|explain)\s+(?:is|are|the|a|an|about|we|you|i)?\s*/i, '')
      .replace(/[?!.,'"]/g, '')
      .trim();

    const topic = subjectQuery && subjectQuery.length > 2 ? subjectQuery.slice(0, 35) : 'that';

    if (charId === 'rahul') {
      return {
        charId: 'rahul',
        character: 'Rahul',
        role: 'Backbench Partner',
        avatar: '👦',
        emote: '🤔',
        color: '#ef4444',
        reply: `Bro honestly regarding "${topic}", my brain is already running at 100% capacity just trying to survive engineering! Let's get canteen chai and discuss.`
      };
    }

    if (charId === 'sneha') {
      return {
        charId: 'sneha',
        character: 'Sneha',
        role: 'Class CR',
        avatar: '👧',
        emote: '📝',
        color: '#eab308',
        reply: `Is "${topic}" going to be on the syllabus for our semester exams?! If not, we should really focus on completing today's lab work!`
      };
    }

    if (charId === 'kevin') {
      return {
        charId: 'kevin',
        character: 'Kevin',
        role: 'Hostel Gamer',
        avatar: '🎧',
        emote: '🎮',
        color: '#10b981',
        reply: `Bro asking about "${topic}" sounds like a deep lore side quest you unlock at 3 AM on Reddit. I'm just here trying to rank up!`
      };
    }

    if (charId === 'ashwin') {
      return {
        charId: 'ashwin',
        character: 'Ashwin',
        role: 'Placement Senior',
        avatar: '🎓',
        emote: '🕶️',
        color: '#06b6d4',
        reply: `Haha, regarding "${topic}", don't overcomplicate college life man! Focus on the fundamentals and enjoy your campus years.`
      };
    }

    if (charId === 'ananya') {
      return {
        charId: 'ananya',
        character: 'Ananya',
        role: 'Coding Prodigy',
        avatar: '💻',
        emote: '✨',
        color: '#ec4899',
        reply: `Interesting thought about "${topic}"! Come by Computer Lab 101 later if you want to brainstorm or research it.`
      };
    }

    if (charId === 'chechi') {
      return {
        charId: 'chechi',
        character: 'Canteen Chechi',
        role: 'Snack Queen',
        avatar: '👩‍🍳',
        emote: '☕',
        color: '#f97316',
        reply: `Aiyyo mone, I don't know about "${topic}", but I know you haven't eaten properly! Drink this hot elaichi tea first!`
      };
    }

    if (charId === 'guard') {
      return {
        charId: 'guard',
        character: 'Appukuttan',
        role: 'Campus Guard',
        avatar: '👮',
        emote: '🪪',
        color: '#3b82f6',
        reply: `Questions about "${topic}" are fine, but keep college discipline and ensure your ID card is worn around your neck!`
      };
    }

    if (charId === 'bruno') {
      return {
        charId: 'bruno',
        character: 'Bruno',
        role: 'Campus Mascot',
        avatar: '🐕',
        emote: '🐾',
        color: '#eab308',
        reply: `*Sniffs thoughtfully at the thought of "${topic}", lets out a friendly woof and wags tail!*`
      };
    }

    return {
      charId: 'prof',
      character: 'Prof. Kurian',
      role: 'Strict HOD',
      avatar: '👨‍🏫',
      emote: '⚡',
      color: '#a855f7',
      reply: `Discussions about "${topic}" should be conducted during free library hours, not whispered during my lecture!`
    };
  },

  // Multi-character group response generator
  generateGroupResponses: (questionText, targetCharId = 'auto', npc = {}) => {
    if (targetCharId !== 'auto') {
      const single = aiService.generateCharacterResponse(questionText, targetCharId, npc);
      return [single];
    }

    return [
      aiService.generateCharacterResponse(questionText, 'rahul', npc),
      aiService.generateCharacterResponse(questionText, 'sneha', npc),
      aiService.generateCharacterResponse(questionText, 'kevin', npc)
    ];
  }
};
