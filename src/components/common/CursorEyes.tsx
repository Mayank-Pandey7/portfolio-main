'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

export interface CursorEyesProps {
  className?: string;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

const sizeConfig = {
  xxs: {
    container: 'gap-0.5',
    eye: 'w-3.5 h-4.5 rounded-[7px] border-[1px]',
    pupil: 'w-1.5 h-1.5',
    glintPrimary: 'w-0.5 h-0.5 top-0.5 right-0.5',
    glintSecondary: 'w-0.5 h-0.5 bottom-0.5 left-0.5 hidden',
    maxRadiusX: 2.5,
    maxRadiusY: 3.2,
  },
  xs: {
    container: 'gap-1',
    eye: 'w-4 h-5 sm:w-4.5 sm:h-5.5 rounded-[8px] border-[1.2px]',
    pupil: 'w-2 h-2 sm:w-2.5 sm:h-2.5',
    glintPrimary: 'w-0.5 h-0.5 sm:w-1 sm:h-1 top-0.5 right-0.5',
    glintSecondary: 'w-0.5 h-0.5 bottom-0.5 left-0.5 opacity-40',
    maxRadiusX: 3.2,
    maxRadiusY: 4.0,
  },
  sm: {
    container: 'gap-1',
    eye: 'w-5.5 h-6.5 rounded-[10px] border-[1.5px]',
    pupil: 'w-2.5 h-2.5',
    glintPrimary: 'w-1 h-1 top-0.5 right-0.5',
    glintSecondary: 'w-0.5 h-0.5 bottom-0.5 left-0.5',
    maxRadiusX: 4.4,
    maxRadiusY: 5.4,
  },
  md: {
    container: 'gap-1.5',
    eye: 'w-7 h-8.5 sm:w-7.5 sm:h-9 rounded-[12px] border-[1.5px]',
    pupil: 'w-3 h-3 sm:w-3.5 sm:h-3.5',
    glintPrimary: 'w-1.5 h-1.5 top-0.5 right-0.5',
    glintSecondary: 'w-1 h-1 bottom-0.5 left-0.5',
    maxRadiusX: 6.0,
    maxRadiusY: 7.2,
  },
  lg: {
    container: 'gap-2',
    eye: 'w-9 h-11 rounded-[16px] border-[2px]',
    pupil: 'w-4 h-4',
    glintPrimary: 'w-2 h-2 top-0.5 right-0.5',
    glintSecondary: 'w-1 h-1 bottom-0.5 left-0.5',
    maxRadiusX: 8.0,
    maxRadiusY: 9.8,
  },
};

export default function CursorEyes({
  className,
  size = 'xs',
  interactive = true,
}: CursorEyesProps) {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    hasMouseMoved: false,
    lastMouseMoveTime: 0,
    isTouchDevice: false,
    leftPupil: { currentX: 0, currentY: 0, targetX: 0, targetY: 0 },
    rightPupil: { currentX: 0, currentY: 0, targetX: 0, targetY: 0 },
    rafId: 0,
    blinkTimeoutId: 0,
  });

  const config = sizeConfig[size] || sizeConfig.xs;

  // --- Blinking Cycle ---
  useEffect(() => {
    let isMounted = true;
    const state = stateRef.current;

    const scheduleNextBlink = () => {
      const nextInterval = 3500 + Math.random() * 3000;

      state.blinkTimeoutId = window.setTimeout(() => {
        if (!isMounted) return;

        setIsBlinking(true);

        window.setTimeout(() => {
          if (!isMounted) return;
          setIsBlinking(false);

          if (Math.random() < 0.25) {
            window.setTimeout(() => {
              if (!isMounted) return;
              setIsBlinking(true);
              window.setTimeout(() => {
                if (!isMounted) return;
                setIsBlinking(false);
                scheduleNextBlink();
              }, 120);
            }, 120);
          } else {
            scheduleNextBlink();
          }
        }, 140);
      }, nextInterval);
    };

    scheduleNextBlink();

    return () => {
      isMounted = false;
      if (state.blinkTimeoutId) {
        clearTimeout(state.blinkTimeoutId);
      }
    };
  }, []);

  // --- Mouse Tracking & Animation ---
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const state = stateRef.current;

    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    state.isTouchDevice = isTouch;
    state.lastMouseMoveTime = performance.now();

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      state.hasMouseMoved = true;
      state.lastMouseMoveTime = performance.now();
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        state.mouseX = touch.clientX;
        state.mouseY = touch.clientY;
        state.hasMouseMoved = true;
        state.lastMouseMoveTime = performance.now();
      }
    };

    if (interactive) {
      window.addEventListener('pointermove', handlePointerMove, {
        passive: true,
      });
      window.addEventListener('touchstart', handleTouchStart, {
        passive: true,
      });
    }

    const { maxRadiusX, maxRadiusY } = config;

    const animate = (timestamp: number) => {
      const timeSinceMove = timestamp - state.lastMouseMoveTime;
      const isIdle =
        !state.hasMouseMoved || timeSinceMove > 2200 || state.isTouchDevice;

      const calculatePupilTarget = (eyeElement: HTMLDivElement | null) => {
        if (!eyeElement) return { targetX: 0, targetY: 0 };

        if (isIdle) {
          const idleTime = timestamp * 0.0012;
          const wanderX = Math.sin(idleTime * 1.1) * (maxRadiusX * 0.55);
          const wanderY =
            Math.cos(idleTime * 0.7) * (maxRadiusY * 0.45) + maxRadiusY * 0.1;
          return { targetX: wanderX, targetY: wanderY };
        }

        const rect = eyeElement.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const dx = state.mouseX - eyeCenterX;
        const dy = state.mouseY - eyeCenterY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.hypot(dx, dy);
        const distanceFactor = Math.min(1, distance / 100);

        const targetX = Math.cos(angle) * maxRadiusX * distanceFactor;
        const targetY = Math.sin(angle) * maxRadiusY * distanceFactor;

        return { targetX, targetY };
      };

      const leftTargets = calculatePupilTarget(leftEyeRef.current);
      state.leftPupil.targetX = leftTargets.targetX;
      state.leftPupil.targetY = leftTargets.targetY;

      const lerpFactor = 0.16;
      state.leftPupil.currentX +=
        (state.leftPupil.targetX - state.leftPupil.currentX) * lerpFactor;
      state.leftPupil.currentY +=
        (state.leftPupil.targetY - state.leftPupil.currentY) * lerpFactor;

      if (leftPupilRef.current) {
        leftPupilRef.current.style.transform = `translate3d(${state.leftPupil.currentX.toFixed(2)}px, ${state.leftPupil.currentY.toFixed(2)}px, 0)`;
      }

      const rightTargets = calculatePupilTarget(rightEyeRef.current);
      state.rightPupil.targetX = rightTargets.targetX;
      state.rightPupil.targetY = rightTargets.targetY;

      state.rightPupil.currentX +=
        (state.rightPupil.targetX - state.rightPupil.currentX) * lerpFactor;
      state.rightPupil.currentY +=
        (state.rightPupil.targetY - state.rightPupil.currentY) * lerpFactor;

      if (rightPupilRef.current) {
        rightPupilRef.current.style.transform = `translate3d(${state.rightPupil.currentX.toFixed(2)}px, ${state.rightPupil.currentY.toFixed(2)}px, 0)`;
      }

      state.rafId = requestAnimationFrame(animate);
    };

    state.rafId = requestAnimationFrame(animate);

    return () => {
      if (interactive) {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('touchstart', handleTouchStart);
      }
      if (state.rafId) {
        cancelAnimationFrame(state.rafId);
      }
    };
  }, [config, interactive]);

  const handleEyeClick = () => {
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 200);
  };

  return (
    <div
      className={cn(
        'group perspective-500 inline-flex cursor-pointer items-center transition-transform duration-200 select-none active:scale-95',
        config.container,
        className,
      )}
      onClick={handleEyeClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Looking at you!"
      aria-label="Interactive animated 3D eyes following cursor"
      role="img"
    >
      {/* Left Eye */}
      <div
        ref={leftEyeRef}
        className={cn(
          'relative flex items-center justify-center overflow-hidden transition-all duration-150',
          'bg-[radial-gradient(circle_at_35%_25%,#ffffff_0%,#f0f2f7_50%,#d8dce8_90%,#c2c8d8_100%)]',
          'dark:bg-[radial-gradient(circle_at_35%_25%,#ffffff_0%,#edf0f7_45%,#c8cde0_85%,#9da5be_100%)]',
          'border-[1.5px] border-zinc-400/80 dark:border-zinc-700',
          'shadow-[0_2px_6px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.15)] dark:shadow-[0_3px_8px_-1px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.22),inset_1px_0_2px_rgba(0,0,0,0.1)]',
          config.eye,
          isBlinking && 'scale-y-[0.08] duration-75',
          isHovered &&
            'border-zinc-800 shadow-[0_3px_10px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,1)] dark:border-zinc-400 dark:shadow-[0_4px_12px_-1px_rgba(0,0,0,0.38),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.25)]',
        )}
      >
        <div
          ref={leftPupilRef}
          className={cn(
            'pointer-events-none relative rounded-full shadow-[0_1.5px_3px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] will-change-transform',
            'bg-[radial-gradient(circle_at_35%_30%,#2c2d38_0%,#111218_60%,#030305_100%)]',
            config.pupil,
          )}
        >
          <span
            className={cn(
              'absolute rounded-full bg-white opacity-95 shadow-[0_0_2px_rgba(255,255,255,0.9)]',
              config.glintPrimary,
            )}
          />
          <span
            className={cn(
              'absolute rounded-full bg-white/45',
              config.glintSecondary,
            )}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.1)_35%,transparent_60%)]" />
      </div>

      {/* Right Eye */}
      <div
        ref={rightEyeRef}
        className={cn(
          'relative flex items-center justify-center overflow-hidden transition-all duration-150',
          'bg-[radial-gradient(circle_at_35%_25%,#ffffff_0%,#f0f2f7_50%,#d8dce8_90%,#c2c8d8_100%)]',
          'dark:bg-[radial-gradient(circle_at_35%_25%,#ffffff_0%,#edf0f7_45%,#c8cde0_85%,#9da5be_100%)]',
          'border-[1.5px] border-zinc-400/80 dark:border-zinc-700',
          'shadow-[0_2px_6px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.15)] dark:shadow-[0_3px_8px_-1px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.22),inset_1px_0_2px_rgba(0,0,0,0.1)]',
          config.eye,
          isBlinking && 'scale-y-[0.08] duration-75',
          isHovered &&
            'border-zinc-800 shadow-[0_3px_10px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,1)] dark:border-zinc-400 dark:shadow-[0_4px_12px_-1px_rgba(0,0,0,0.38),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.25)]',
        )}
      >
        <div
          ref={rightPupilRef}
          className={cn(
            'pointer-events-none relative rounded-full shadow-[0_1.5px_3px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] will-change-transform',
            'bg-[radial-gradient(circle_at_35%_30%,#2c2d38_0%,#111218_60%,#030305_100%)]',
            config.pupil,
          )}
        >
          <span
            className={cn(
              'absolute rounded-full bg-white opacity-95 shadow-[0_0_2px_rgba(255,255,255,0.9)]',
              config.glintPrimary,
            )}
          />
          <span
            className={cn(
              'absolute rounded-full bg-white/45',
              config.glintSecondary,
            )}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.1)_35%,transparent_60%)]" />
      </div>
    </div>
  );
}
