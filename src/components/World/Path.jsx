import React from 'react';

export default function Path({ waypoints = [], color = '#06b6d4' }) {
  if (waypoints.length < 2) return null;

  // Build SVG path string
  const d = waypoints.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {/* Background track line */}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray="6 6"
        strokeOpacity="0.4"
        className="animate-pulse"
      />
      {/* Waypoint dots */}
      {waypoints.map((pt, idx) => (
        <circle
          key={idx}
          cx={pt.x}
          cy={pt.y}
          r="5"
          fill={color}
          stroke="#0f172a"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
