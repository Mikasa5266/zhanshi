/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import logoGraphic from '@/assets/图形+外框.png';

interface BrandLogoProps {
  className?: string;
  userLogo?: string | null;
  glow?: boolean;
}

export default function BrandLogo({ className = "w-10 h-10", userLogo, glow = true }: BrandLogoProps) {
  const logoSrc = userLogo || logoGraphic;

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/80 transition-all duration-300 ${glow ? 'shadow-[0_0_20px_rgba(239,68,68,0.3)]' : ''} ${className}`}>
      <img
        src={logoSrc}
        alt="迎风聚智 Logo"
        referrerPolicy="no-referrer"
        className="max-w-[85%] max-h-[85%] object-contain"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full pointer-events-none transition-transform duration-1000 ease-in-out" />
    </div>
  );
}
