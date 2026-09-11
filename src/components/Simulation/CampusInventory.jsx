import React, { useState } from 'react';
import { X, Gift, Sparkles, Check, Heart, Trophy, Zap, AlertCircle } from 'lucide-react';
import { soundService } from '../../services/soundService';

export const CAMPUS_ITEMS = [
  {
    id: 'chai',
    name: 'Cutting Chai',
    icon: '☕',
    category: 'Canteen',
    buff: '+20 Backbench Energy',
    desc: 'Boiling hot ginger-elaichi tea from canteen counter. Fuel for engineering survivors.',
    preferredBy: 'rahul',
    reaction: {
      rahul: "Bro you are an absolute legend! I will write your entire fluid mechanics lab record for this cutting chai!",
      sneha: "Thanks, but please don't spill tea near my class attendance register!",
      kevin: "Needed this bro, my Discord raid starts in 10 minutes and my eyes were closing."
    }
  },
  {
    id: 'puff',
    name: 'Hot Egg Puff',
    icon: '🥪',
    category: 'Canteen',
    buff: '+25 Hunger Shield',
    desc: 'Crispy flaky crust with spicy onion masala. Only 2 left before seniors arrive!',
    preferredBy: 'kevin',
    reaction: {
      kevin: "Bro you just saved my life! Surviving on hostel kettle Maggi was destroying my soul.",
      rahul: "Give me half bro! Unless you want me to fail the afternoon mass bunk vote.",
      sneha: "Eat quietly! If Professor Kurian smells food inside classroom 302, the whole row gets marked absent."
    }
  },
  {
    id: 'lab_record',
    name: 'Signed Lab Record',
    icon: '📋',
    category: 'Academics',
    buff: '+30 CR Favor',
    desc: 'All 14 circuit diagrams drawn with scale, pencil, and faculty signature stamp.',
    preferredBy: 'sneha',
    reaction: {
      sneha: "Wait... you actually drew every single graph and submitted before 9:00 AM?! I'm giving you 10/10 internal attendance marks!",
      rahul: "Bro pass it over here immediately! Let me xerox the observation table before 3rd hour!",
      kevin: "Is this that physical paper thing you guys write? I haven't seen paper since 2021."
    }
  },
  {
    id: 'gate_pass',
    name: 'Forged Gate Pass',
    icon: '🪪',
    category: 'Survival',
    buff: '+100 Campus Escape',
    desc: 'Has an official-looking department seal and vague signature. Guard Appukuttan usually lets you through.',
    preferredBy: 'rahul',
    reaction: {
      rahul: "YESSS! The golden ticket! Let's sneak past the gate right now and hit the beach for the 2 PM movie!",
      sneha: "Where did you get this?! That's not tutor's real signature! Put that away before HOD catches us!",
      kevin: "I'll use this to run to the courier pickup point behind gate 2 for my mechanical keyboard keycaps."
    }
  },
  {
    id: 'mousepad',
    name: 'RGB Gaming Mousepad',
    icon: '🎮',
    category: 'Hostel',
    buff: '+40 Gamer Ping',
    desc: 'Stitched edges, smooth microfiber glide, 7-color neon RGB trim powered by USB.',
    preferredBy: 'kevin',
    reaction: {
      kevin: "NO WAY! My mouse was literally sliding on cardboard! My Headshot % in Valorant just doubled bro! You're officially invited to room 4B LAN party!",
      rahul: "Does this thing run faster WiFi? Because my phone has been on 2G edge network since morning.",
      sneha: "Can you guys focus on solving engineering calculus instead of gaming mousepads for one day?!"
    }
  },
  {
    id: 'exam_blueprint',
    name: "HOD's Exam Blueprint",
    icon: '📜',
    category: 'Legendary Heist Loot',
    buff: '+50 Squad Legend',
    desc: 'Confidential question paper blueprint stolen from HOD cabin safe in Midnight Heist! Batch legends forever.',
    preferredBy: 'rahul',
    reaction: {
      rahul: "Bhai... BHAI! We are passing Semester 5! Let's frame this next to the canteen chai counter!",
      sneha: "NO WAY! You actually pulled it off?! The curve is officially destroyed in our favor! You are an absolute legend!",
      kevin: "YOOOO! The master key to our GPA! Bro, I am literally putting your name in the engineering hall of fame!"
    }
  }
];

export default function CampusInventory({
  isOpen = true,
  onClose,
  inventory = ['chai', 'puff', 'lab_record'],
  onGiftItem,
  friendshipRep = { rahul: 25, sneha: 30, kevin: 20 },
  remotePlayers = [],
  onGiftPlayer
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [giftTarget, setGiftTarget] = useState('rahul');
  const [giftFeedback, setGiftFeedback] = useState(null);

  if (isOpen === false) return null;

  const currentItems = CAMPUS_ITEMS.filter(item => inventory.includes(item.id));

  const handleGift = (item, targetCharId) => {
    soundService.playSelect();
    const replyText = item.reaction[targetCharId] || "Thanks bro!";
    const isPreferred = item.preferredBy === targetCharId;
    const bonus = isPreferred ? 15 : 5;

    setGiftFeedback({
      character: targetCharId === 'rahul' ? 'Rahul' : targetCharId === 'sneha' ? 'Sneha' : 'Kevin',
      reply: replyText,
      bonus,
      isPreferred
    });

    onGiftItem?.(item.id, targetCharId, bonus, replyText);
    soundService.playLevelUp();

    setTimeout(() => {
      setGiftFeedback(null);
      setSelectedItem(null);
    }, 3800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0d1322] border-2 border-cyan-500/40 rounded-3xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.35)] flex flex-col gap-4 text-white select-none">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl p-2 rounded-2xl bg-cyan-950 border border-cyan-500/40">🎒</span>
            <div>
              <h2 className="text-base font-black tracking-wide text-cyan-300 uppercase font-mono">
                College Backpack & Gifting
              </h2>
              <p className="text-xs text-slate-400">
                Items collected on campus • Gift to friends for reputation bonuses!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rep Status Pill Bar */}
        <div className="grid grid-cols-3 gap-2 bg-[#090d17] p-2.5 rounded-2xl border border-white/5 text-xs font-mono">
          <div className="flex items-center justify-between px-2 py-1 bg-red-950/60 rounded-xl border border-red-500/30">
            <span className="text-red-300 font-bold">👦 Rahul</span>
            <span className="text-amber-400 font-black">{friendshipRep.rahul || 25} Chill</span>
          </div>
          <div className="flex items-center justify-between px-2 py-1 bg-amber-950/60 rounded-xl border border-amber-500/30">
            <span className="text-amber-300 font-bold">👧 Sneha</span>
            <span className="text-amber-400 font-black">{friendshipRep.sneha || 30} Favor</span>
          </div>
          <div className="flex items-center justify-between px-2 py-1 bg-emerald-950/60 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-300 font-bold">🎧 Kevin</span>
            <span className="text-amber-400 font-black">{friendshipRep.kevin || 20} Cred</span>
          </div>
        </div>

        {/* Gift Animation Overlay */}
        {giftFeedback && (
          <div className="bg-gradient-to-r from-cyan-950 to-blue-950 border-2 border-cyan-400 p-4 rounded-2xl animate-pop text-center space-y-2 shadow-2xl">
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-amber-300 font-mono">
              <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
              <span>GIFT ACCEPTED! +{giftFeedback.bonus} Friendship Rep!</span>
              {giftFeedback.isPreferred && <span className="text-xs bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-black">FAVORITE!</span>}
            </div>
            <p className="text-xs italic text-slate-100 font-medium">"{giftFeedback.reply}"</p>
          </div>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
          {currentItems.length === 0 ? (
            <div className="col-span-2 text-center py-8 text-slate-500 text-xs font-mono">
              Backpack is empty! Explore the campus to find snacks and college items!
            </div>
          ) : (
            currentItems.map(item => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-102'
                      : 'bg-[#111726] border-white/10 hover:border-white/25 hover:bg-[#151c2e]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl p-1.5 rounded-xl bg-slate-900 border border-white/10">{item.icon}</span>
                      <div>
                        <div className="font-bold text-xs text-white">{item.name}</div>
                        <div className="text-[10px] text-cyan-400 font-mono">{item.buff}</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">{item.desc}</p>
                </div>
              );
            })
          )}
        </div>

        {/* Gift Action Tray (when item selected) */}
        {selectedItem && !giftFeedback && (
          <div className="bg-[#121a2c] p-3 rounded-2xl border border-cyan-500/30 flex flex-wrap items-center justify-between gap-2 animate-fade-in">
            <div className="text-xs font-mono text-slate-300">
              Gift <strong className="text-cyan-300">{selectedItem.name}</strong> to:
            </div>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'rahul', label: '👦 Rahul', color: 'hover:bg-red-600' },
                { id: 'sneha', label: '👧 Sneha', color: 'hover:bg-amber-600' },
                { id: 'kevin', label: '🎧 Kevin', color: 'hover:bg-emerald-600' }
              ].map(friend => (
                <button
                  key={friend.id}
                  onClick={() => handleGift(selectedItem, friend.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 border border-white/10 text-white ${friend.color} transition-all cursor-pointer flex items-center gap-1`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>{friend.label}</span>
                </button>
              ))}

              {/* Remote Live Students in Room */}
              {remotePlayers.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    onGiftPlayer?.(selectedItem, p.id, p.name);
                    onClose?.();
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-purple-200 transition-all cursor-pointer flex items-center gap-1 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                  title={`Gift to ${p.name || 'Friend'}`}
                >
                  <Gift className="w-3.5 h-3.5 text-purple-300" />
                  <span>{p.name || 'Friend'} (Live)</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
