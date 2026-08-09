import React from 'react';

export default function PremiumBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-white pointer-events-none">
      {/* 1. White base (implicit in parent container) */}

      {/* 2. Soft sky blue radial gradient flowing from the top-left corner */}
      <div 
        className="absolute top-0 left-0 w-full h-[120%] md:h-[150%] opacity-100"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(173, 216, 255, 0.45) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 1) 100%)',
        }}
      />

      {/* 3. Bottom left radial wash */}
      <div 
        className="absolute bottom-0 left-0 w-[60%] h-[60%] opacity-100"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(173, 216, 255, 0.25) 0%, rgba(255, 255, 255, 0) 70%)',
        }}
      />

      {/* 4. Center softening glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-100"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%)',
        }}
      />

      {/* 5. Tiny dotted grid pattern */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'radial-gradient(#A7D8FF 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          opacity: 0.10, // 10% opacity, within the 8-12% specification
        }}
      />
    </div>
  );
}
