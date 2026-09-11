import React from 'react';

export default function NPCCharacter({
  state = 'IDLE',
  size = 'md',
  facing = 'right',
  avatar = {},
  className = ''
}) {
  const {
    gender = 'boy',
    hairStyle = 'messy',
    hairColor = '#090d16',
    outfitColor = '#1e3a8a',
    accessory = 'backpack'
  } = avatar;

  const sizeMap = {
    sm: 'w-16 h-24',
    md: 'w-24 h-36',
    lg: 'w-36 h-52',
    xl: 'w-48 h-68'
  };

  const isGirl = gender === 'girl';

  return (
    <div
      className={`relative select-none flex flex-col items-center justify-end ${sizeMap[size] || sizeMap.md} ${
        state === 'WALK' ? 'animate-bounce' : 'animate-float'
      } ${className}`}
      style={{
        transform: facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
      }}
    >
      <svg
        viewBox="0 0 100 140"
        className="w-full h-full drop-shadow-[0_12px_22px_rgba(0,0,0,0.7)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
      >
        {/* Ground Shadow */}
        <ellipse cx="50" cy="134" rx="26" ry="5" fill="rgba(0,0,0,0.45)" />

        {/* Back Hair Layer (Visible behind shoulders and head) */}
        {isGirl && (hairStyle === 'long' || hairStyle === 'ponytail') && (
          <g>
            {hairStyle === 'long' && (
              // Long cascading hair behind back
              <rect x="22" y="24" width="56" height="52" rx="8" fill={hairColor} />
            )}
            {hairStyle === 'ponytail' && (
              // Bouncy high ponytail sticking out high to the top-right
              <g>
                {/* Hair tie / ribbon */}
                <rect x="66" y="16" width="7" height="7" rx="2" fill="#f43f5e" />
                {/* Flowing ponytail hair */}
                <path d="M68 18 Q85 24 82 48 Q76 44 70 30 Z" fill={hairColor} />
                <rect x="70" y="20" width="14" height="26" rx="6" fill={hairColor} />
              </g>
            )}
          </g>
        )}

        {/* Boy Long Hair (Curtains/flow behind ears) */}
        {!isGirl && hairStyle === 'long' && (
          <rect x="26" y="22" width="48" height="40" rx="6" fill={hairColor} />
        )}

        {/* Backpack (if accessory is backpack) */}
        {accessory === 'backpack' && (
          <g>
            <rect x="22" y="48" width="16" height="42" rx="4" fill="#0f172a" stroke="#020617" strokeWidth="2" />
            <rect x="24" y="52" width="12" height="18" rx="2" fill="#1e293b" />
          </g>
        )}

        {/* Legs & Pants */}
        <rect x="36" y="96" width="10" height="30" fill={isGirl ? '#334155' : '#1e293b'} />
        <rect x="54" y="96" width="10" height="30" fill={isGirl ? '#334155' : '#1e293b'} />
        {/* White/Dark Sneakers */}
        <rect x="32" y="122" width="15" height="9" rx="2" fill="#0f172a" />
        <rect x="32" y="127" width="15" height="4" fill="#f8fafc" />
        <rect x="53" y="122" width="15" height="9" rx="2" fill="#0f172a" />
        <rect x="53" y="127" width="15" height="4" fill="#f8fafc" />

        {/* Torso / Hoodie */}
        <rect x="30" y="50" width="40" height="48" rx={isGirl ? 8 : 6} fill={outfitColor} stroke="#0f172a" strokeWidth="2" />
        {/* Inner shirt zip triangle */}
        <polygon points="50,52 44,72 56,72" fill="#0f172a" />
        {/* Front Hoodie Pocket */}
        <rect x="38" y="76" width="24" height="14" rx="3" fill="#0f172a" fillOpacity="0.25" />
        {/* Backpack front straps */}
        {accessory === 'backpack' && (
          <g>
            <rect x="35" y="54" width="4" height="28" rx="1" fill="#0f172a" />
            <rect x="61" y="54" width="4" height="28" rx="1" fill="#0f172a" />
          </g>
        )}

        {/* Arms */}
        <rect x="23" y="52" width="9" height="34" rx="4" fill={outfitColor} />
        <circle cx="27.5" cy="85" r="4" fill="#fed7aa" />
        <rect x="68" y="52" width="9" height="34" rx="4" fill={outfitColor} />
        <circle cx="72.5" cy="85" r="4" fill="#fed7aa" />

        {/* Accessory: Chai Glass in Right Hand */}
        {accessory === 'chai' && (
          <g>
            <rect x="71" y="76" width="8" height="13" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
            <rect x="72" y="74" width="6" height="3" fill="#78350f" />
          </g>
        )}

        {/* Accessory: Exam Notes / Books under Left Arm */}
        {accessory === 'books' && (
          <g>
            <rect x="18" y="68" width="13" height="19" rx="2" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
            <line x1="20" y1="73" x2="28" y2="73" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="20" y1="78" x2="27" y2="78" stroke="#ffffff" strokeWidth="1.5" />
          </g>
        )}

        {/* Neck */}
        <rect x="44" y="44" width="12" height="8" fill="#fed7aa" />

        {/* Head / Face */}
        <rect x="34" y="22" width="32" height="26" rx={isGirl ? 7 : 4} fill="#fed7aa" stroke="#78350f" strokeWidth="1" />

        {/* Girl Blush Cheeks */}
        {isGirl && (
          <g>
            <circle cx="38" cy="38" r="3" fill="#fda4af" />
            <circle cx="62" cy="38" r="3" fill="#fda4af" />
          </g>
        )}

        {/* Eyes */}
        <rect x="40" y="32" width="4" height="4" fill="#0f172a" />
        <rect x="41" y="32" width="1.5" height="1.5" fill="#ffffff" />
        <rect x="56" y="32" width="4" height="4" fill="#0f172a" />
        <rect x="57" y="32" width="1.5" height="1.5" fill="#ffffff" />
        
        {/* Girl Eyelashes */}
        {isGirl && (
          <g>
            <line x1="39" y1="31" x2="44" y2="31" stroke="#0f172a" strokeWidth="1.5" />
            <line x1="56" y1="31" x2="61" y2="31" stroke="#0f172a" strokeWidth="1.5" />
          </g>
        )}

        {/* Mouth */}
        <line x1="47" y1="42" x2="53" y2="42" stroke="#9a3412" strokeWidth="1.5" strokeLinecap="round" />

        {/* Accessory: Round Student Glasses */}
        {accessory === 'glasses' && (
          <g>
            <circle cx="42" cy="34" r="5.5" fill="none" stroke="#00f0ff" strokeWidth="1.5" />
            <circle cx="58" cy="34" r="5.5" fill="none" stroke="#00f0ff" strokeWidth="1.5" />
            <line x1="47.5" y1="34" x2="52.5" y2="34" stroke="#00f0ff" strokeWidth="1.5" />
          </g>
        )}

        {/* FRONT HAIRSTYLES (distinct shapes based on gender & style) */}
        {isGirl ? (
          // GIRL HAIRSTYLES
          <g>
            {hairStyle === 'ponytail' && (
              // Ponytail front: Soft bangs with hairband
              <g>
                <rect x="31" y="14" width="38" height="15" rx="6" fill={hairColor} />
                <polygon points="32,24 38,33 42,24" fill={hairColor} />
                <polygon points="41,24 49,34 54,24" fill={hairColor} />
                <polygon points="53,24 61,33 68,24" fill={hairColor} />
                {/* Hairband on top */}
                <rect x="33" y="16" width="34" height="3" rx="1.5" fill="#f43f5e" />
              </g>
            )}

            {hairStyle === 'bob' && (
              // Short Bob: Curving strands hugging cheeks
              <g>
                <rect x="29" y="14" width="42" height="15" rx="6" fill={hairColor} />
                <polygon points="32,24 38,32 44,24" fill={hairColor} />
                <polygon points="43,24 50,34 57,24" fill={hairColor} />
                <polygon points="56,24 62,32 68,24" fill={hairColor} />
                {/* Side Bob hair down past ears */}
                <rect x="27" y="24" width="8" height="22" rx="4" fill={hairColor} />
                <rect x="65" y="24" width="8" height="22" rx="4" fill={hairColor} />
              </g>
            )}

            {hairStyle === 'long' && (
              // Long Wavy Hair framing shoulders
              <g>
                <rect x="29" y="14" width="42" height="16" rx="6" fill={hairColor} />
                <polygon points="33,24 40,33 46,24" fill={hairColor} />
                <polygon points="45,24 52,34 58,24" fill={hairColor} />
                <polygon points="57,24 64,33 69,24" fill={hairColor} />
                {/* Front cascading locks on chest */}
                <rect x="26" y="26" width="9" height="32" rx="4" fill={hairColor} />
                <rect x="65" y="26" width="9" height="32" rx="4" fill={hairColor} />
              </g>
            )}
          </g>
        ) : (
          // BOY HAIRSTYLES
          <g>
            {hairStyle === 'messy' && (
              // Messy Anime Spikes
              <g>
                <rect x="30" y="14" width="40" height="16" rx="4" fill={hairColor} />
                <polygon points="30,22 24,14 34,16" fill={hairColor} />
                <polygon points="70,22 76,14 66,16" fill={hairColor} />
                <polygon points="32,26 38,34 40,26" fill={hairColor} />
                <polygon points="39,26 46,36 48,26" fill={hairColor} />
                <polygon points="47,26 54,34 56,26" fill={hairColor} />
                <polygon points="55,26 62,35 64,26" fill={hairColor} />
                <polygon points="63,26 68,32 70,24" fill={hairColor} />
              </g>
            )}

            {hairStyle === 'short' && (
              // Clean Short Haircut
              <g>
                <rect x="32" y="16" width="36" height="12" rx="5" fill={hairColor} />
                <line x1="33" y1="26" x2="67" y2="26" stroke={hairColor} strokeWidth="3" strokeLinecap="round" />
                <rect x="31" y="20" width="4" height="10" rx="2" fill={hairColor} />
                <rect x="65" y="20" width="4" height="10" rx="2" fill={hairColor} />
              </g>
            )}

            {hairStyle === 'long' && (
              // Flowing Middle-Part Curtains
              <g>
                <rect x="28" y="14" width="44" height="15" rx="5" fill={hairColor} />
                {/* Left curtain fringe */}
                <polygon points="30,22 36,36 44,24" fill={hairColor} />
                <rect x="27" y="22" width="7" height="22" rx="3" fill={hairColor} />
                {/* Right curtain fringe */}
                <polygon points="70,22 64,36 56,24" fill={hairColor} />
                <rect x="66" y="22" width="7" height="22" rx="3" fill={hairColor} />
              </g>
            )}
          </g>
        )}

        {/* Accessory: Backwards Cap */}
        {accessory === 'cap' && (
          <g>
            <path d="M28 22 C28 12, 72 12, 72 22 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
            <rect x="68" y="20" width="12" height="4" rx="1" fill="#dc2626" />
          </g>
        )}

        {/* Accessory: Gaming Headset */}
        {accessory === 'headset' && (
          <g>
            <path d="M25 30 C25 8, 75 8, 75 30" stroke="#10b981" strokeWidth="4" strokeLinecap="round" fill="none" />
            <rect x="23" y="26" width="6" height="12" rx="2" fill="#047857" />
            <rect x="71" y="26" width="6" height="12" rx="2" fill="#047857" />
          </g>
        )}
      </svg>
    </div>
  );
}
