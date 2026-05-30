/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BrandLogoProps {
  className?: string;
  userLogo?: string | null;
  glow?: boolean;
}

export default function BrandLogo({ className = "w-10 h-10", userLogo, glow = true }: BrandLogoProps) {
  if (userLogo) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/80 transition-all duration-300 ${glow ? 'shadow-[0_0_20px_rgba(239,68,68,0.3)]' : ''} ${className}`}>
        <img 
          src={userLogo} 
          alt="迎风聚智 Logo" 
          referrerPolicy="no-referrer"
          className="max-w-[85%] max-h-[85%] object-contain"
        />
        {/* Animated accent reflection line */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full pointer-events-none transition-transform duration-1000 ease-in-out" />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center rounded-xl bg-red-650 border border-red-500/30 transition-all duration-300 ${glow ? 'shadow-[0_0_25px_rgba(194,10,10,0.4)]' : ''} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[80%] h-[80%] block select-none pointer-events-none">
        {/* Hexagonal Shield Background */}
        <path d="M50 5L90 25V65L50 95L10 65V25L50 5Z" fill="url(#shield-grad)" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round"/>
        {/* Owl Brow and Crest - Represents Vision and Wisdom */}
        <path d="M25 35C35 35 42 28 50 38C58 28 65 35 75 35" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Left Eye */}
        <circle cx="37" cy="48" r="8" fill="#111827" stroke="#ffffff" strokeWidth="2"/>
        <circle cx="37" cy="48" r="3.5" fill="#ca0808" />
        {/* Right Eye */}
        <circle cx="63" cy="48" r="8" fill="#111827" stroke="#ffffff" strokeWidth="2"/>
        <circle cx="63" cy="48" r="3.5" fill="#ca0808" />
        {/* Owl Beak/Nose */}
        <path d="M50 44V56L46 51H54" fill="#ffffff" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"/>
        {/* Computational Circuit Lines extending from shield bottom - Represents Tech & Network Testing */}
        <path d="M50 72V88" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M50 80H35V74" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
        <path d="M50 80H65V74" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
        
        <defs>
          <linearGradient id="shield-grad" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c20a0a" stopOpacity="0.95"/>
            <stop offset="1" stopColor="#3f0101" stopOpacity="1"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
