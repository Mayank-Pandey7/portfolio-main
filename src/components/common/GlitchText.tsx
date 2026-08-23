'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface GlitchTextProps {
  originalText: string;
  hoverText: string;
  className?: string;
  durationMs?: number;
}

const GLYPHS = '01X#_\\/[]{}*+~-!?<>';

export default function GlitchText({
  originalText,
  hoverText,
  className,
  durationMs = 350,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(originalText);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const animationRef = useRef<number>(0);
  const timerRef = useRef<number>(0);
  const targetTextRef = useRef<string>(originalText);

  const scrambleTo = (targetText: string) => {
    if (targetTextRef.current === targetText && !isGlitching) return;
    targetTextRef.current = targetText;
    setIsGlitching(true);

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    const totalSteps = Math.max(14, Math.floor(durationMs / 22));
    let step = 0;
    const fromText = displayText;
    const fromLen = fromText.length;
    const toLen = targetText.length;

    const updateFrame = () => {
      step++;
      const progress = Math.min(1, step / totalSteps);

      const currentLength = Math.round(fromLen + (toLen - fromLen) * progress);
      const resolvedCount = Math.floor(progress * toLen);

      let result = '';
      for (let i = 0; i < currentLength; i++) {
        if (i < resolvedCount && i < toLen) {
          result += targetText[i];
        } else if (i < toLen && Math.random() < 0.25 && progress > 0.6) {
          result += targetText[i];
        } else {
          const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          result += glyph;
        }
      }

      setDisplayText(result);

      if (step < totalSteps) {
        timerRef.current = window.setTimeout(() => {
          animationRef.current = requestAnimationFrame(updateFrame);
        }, 22);
      } else {
        setDisplayText(targetText);
        setIsGlitching(false);
      }
    };

    animationRef.current = requestAnimationFrame(updateFrame);
  };

  const handleMouseEnter = () => {
    if (isHovered) return;
    setIsHovered(true);
    scrambleTo(hoverText);
  };

  const handleMouseLeave = () => {
    if (!isHovered) return;
    setIsHovered(false);
    scrambleTo(originalText);
  };

  const handleTouch = () => {
    if (isHovered) {
      setIsHovered(false);
      scrambleTo(originalText);
    } else {
      setIsHovered(true);
      scrambleTo(hoverText);
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const isAltText = displayText === hoverText || (isHovered && !isGlitching);

  return (
    <span
      className={cn(
        'relative inline-block cursor-pointer align-middle whitespace-nowrap select-none',
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTouch}
      aria-label={`${originalText} (${hoverText})`}
      role="text"
    >
      {/* Ghost Container for Width Stability */}
      <span
        className="pointer-events-none invisible select-none"
        aria-hidden="true"
      >
        {originalText.length >= hoverText.length ? originalText : hoverText}
      </span>

      {/* Rendered Text */}
      <span
        style={
          isAltText
            ? {
                fontFamily: 'var(--font-noto-serif-jp), "Noto Serif JP", serif',
              }
            : undefined
        }
        className={cn(
          'text-foreground absolute inset-0 flex items-center transition-all duration-150',
          isAltText && 'font-noto-serif-jp font-semibold tracking-wide',
          isGlitching &&
            'text-foreground [text-shadow:1px_0_rgba(59,130,246,0.6),-1px_0_rgba(239,68,68,0.6)]',
          isHovered && !isGlitching && 'text-foreground font-bold',
        )}
      >
        {displayText}
      </span>
    </span>
  );
}
