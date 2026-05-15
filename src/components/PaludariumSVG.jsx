import React from 'react';

const PaludariumSVG = ({ canoeY = 0, canoeRot = 0, waterFlow = 0 }) => {
  return (
    <svg 
      viewBox="0 0 1000 1000" 
      preserveAspectRatio="xMidYMid slice" 
      className="w-full h-full opacity-80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow Filters */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="mist">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        
        {/* Gradients */}
        <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
        </linearGradient>
        
        <linearGradient id="rockGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#454545" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>

        <linearGradient id="mossGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
      </defs>

      {/* Atmospheric Background Mist */}
      <circle cx="500" cy="500" r="400" fill="#38bdf8" opacity="0.1" filter="url(#mist)" />
      
      {/* ---------------- BACKGROUND ROCKS ---------------- */}
      <path d="M 200 800 L 250 400 L 400 200 L 600 250 L 750 450 L 800 800 Z" fill="url(#rockGrad)" />
      <path d="M 300 800 L 350 300 L 550 150 L 700 350 L 700 800 Z" fill="#262626" />
      
      {/* ---------------- MOSS & PLANTS ---------------- */}
      <path d="M 350 300 Q 450 200 550 150 Q 600 200 500 350 Z" fill="url(#mossGrad)" />
      <path d="M 250 400 Q 300 300 400 350 Q 350 450 300 450 Z" fill="#15803d" />
      <path d="M 600 250 Q 700 300 750 450 Q 650 400 650 350 Z" fill="url(#mossGrad)" />
      
      {/* Small ferns/plants (styled as little spikes) */}
      <path d="M 500 150 L 490 100 L 505 140 L 515 80 L 520 145 Z" fill="#4ade80" />
      <path d="M 300 330 L 280 280 L 305 320 L 310 270 L 320 325 Z" fill="#4ade80" />

      {/* ---------------- WATERFALL ---------------- */}
      {/* Animated flowing lines using stroke-dashoffset */}
      <g stroke="#bae6fd" strokeWidth="8" fill="none" opacity="0.8" style={{ transform: `translateY(${waterFlow % 50}px)` }}>
        <path d="M 450 250 Q 480 500 450 750" strokeDasharray="20 40" />
        <path d="M 480 220 Q 520 450 480 750" strokeDasharray="30 50" strokeWidth="12" opacity="0.9" filter="url(#glow)" />
        <path d="M 520 260 Q 500 550 520 750" strokeDasharray="15 30" />
        <path d="M 550 300 Q 580 500 540 750" strokeDasharray="25 45" />
      </g>
      {/* Splash mist at bottom */}
      <ellipse cx="490" cy="730" rx="100" ry="20" fill="#e0f2fe" opacity="0.4" filter="url(#glow)" />

      {/* ---------------- WATER POOL ---------------- */}
      <rect x="150" y="700" width="700" height="200" fill="url(#waterGrad)" />
      {/* Water surface reflection */}
      <path d="M 150 700 L 850 700 L 800 720 L 200 720 Z" fill="#ffffff" opacity="0.1" />

      {/* ---------------- CANOE (ANIMATED) ---------------- */}
      {/* The entire canoe group translates and rotates based on props */}
      <g transform={`translate(0, ${canoeY}) rotate(${canoeRot} 600 750)`}>
        {/* Canoe Body */}
        <path d="M 450 730 Q 600 780 750 730 Q 720 760 600 770 Q 480 760 450 730 Z" fill="#78350f" />
        {/* Canoe Inner Rim */}
        <path d="M 460 733 Q 600 775 740 733 Q 720 745 600 750 Q 480 745 460 733 Z" fill="#451a03" />
        {/* Canoe Seat */}
        <rect x="580" y="738" width="40" height="15" fill="#92400e" rx="2" />
        {/* Paddle */}
        <path d="M 590 735 L 500 770 L 480 780 L 490 785 L 510 775 L 600 740 Z" fill="#b45309" />
      </g>

      {/* ---------------- GLASS TANK (RIMLESS FOREGROUND) ---------------- */}
      {/* Front Glass Edge */}
      <rect x="150" y="500" width="700" height="400" fill="none" stroke="#7dd3fc" strokeWidth="4" opacity="0.4" />
      <rect x="150" y="500" width="700" height="400" fill="#bae6fd" opacity="0.05" />
      {/* Left Glass Panel */}
      <polygon points="100,450 150,500 150,900 100,850" fill="#7dd3fc" opacity="0.1" stroke="#7dd3fc" strokeWidth="2" />
      {/* Right Glass Panel */}
      <polygon points="850,500 900,450 900,850 850,900" fill="#7dd3fc" opacity="0.15" stroke="#7dd3fc" strokeWidth="2" />
      {/* Bottom rim edge */}
      <rect x="150" y="896" width="700" height="8" fill="#38bdf8" opacity="0.5" />

    </svg>
  );
};

export default PaludariumSVG;
