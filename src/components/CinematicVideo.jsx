import React from 'react';

const CinematicVideo = () => {
  return (
    <div className="absolute inset-0 z-0 bg-slate-950">
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-60" />
      {/* Fallback for video background */}
      <div className="absolute inset-0 overflow-hidden">
         <div className="w-full h-full bg-slate-900 animate-pulse opacity-20" />
      </div>
    </div>
  );
};

export default CinematicVideo;
