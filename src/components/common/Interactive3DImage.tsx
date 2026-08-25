'use client';

import Image, { ImageProps } from 'next/image';
import React, {
  MouseEvent,
  TouchEvent,
  useCallback,
  useRef,
  useState,
} from 'react';

interface Interactive3DImageProps extends Omit<
  ImageProps,
  'onMouseMove' | 'onMouseDown' | 'onMouseUp' | 'onMouseLeave'
> {
  className?: string;
  containerClassName?: string;
  maxTilt?: number;
  depth?: number;
}

export default function Interactive3DImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  maxTilt = 12,
  depth = 24,
  ...props
}: Interactive3DImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
  );
  const [glarePos, setGlarePos] = useState<{
    x: number;
    y: number;
    opacity: number;
  }>({ x: 50, y: 50, opacity: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // --- Calculate 3D Tilt from Cursor / Touch ---
  const handleMove = useCallback(
    (clientX: number, clientY: number, pressing: boolean = false) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const px = Math.max(0, Math.min(1, x / rect.width));
      const py = Math.max(0, Math.min(1, y / rect.height));

      // Calculate tilt angles (-1 to 1 normalized)
      const rotateX = ((py - 0.5) * -2 * maxTilt).toFixed(2);
      const rotateY = ((px - 0.5) * 2 * maxTilt).toFixed(2);

      // Press depth (sinks in when clicked)
      const currentDepth = pressing ? -Math.abs(depth * 1.5) : 8;
      const scale = pressing ? 0.96 : 1.015;

      setTransform(
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${currentDepth}px) scale3d(${scale}, ${scale}, ${scale})`,
      );

      // Update Glare Position
      setGlarePos({
        x: px * 100,
        y: py * 100,
        opacity: pressing ? 0.35 : 0.2,
      });
    },
    [maxTilt, depth],
  );

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    handleMove(e.clientX, e.clientY, isPressed);
  };

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsPressed(true);
    handleMove(e.clientX, e.clientY, true);
  };

  const onMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    setIsPressed(false);
    handleMove(e.clientX, e.clientY, false);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    setTransform(
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)',
    );
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // --- Touch Support ---
  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      setIsHovered(true);
      handleMove(e.touches[0].clientX, e.touches[0].clientY, true);
    }
  };

  const onTouchEnd = () => {
    onMouseLeave();
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchMove={onTouchMove}
      onTouchStart={(e) => {
        if (e.touches.length > 0) {
          setIsPressed(true);
          handleMove(e.touches[0].clientX, e.touches[0].clientY, true);
        }
      }}
      onTouchEnd={onTouchEnd}
      style={{ perspective: 1000 }}
      className={`relative cursor-pointer overflow-hidden rounded-xl select-none [transform-style:preserve-3d] ${containerClassName}`}
    >
      {/* 3D Transform Surface */}
      <div
        style={{
          transform,
          transition: isPressed
            ? 'transform 0.08s cubic-bezier(0.2, 0, 0.2, 1)'
            : isHovered
              ? 'transform 0.12s cubic-bezier(0.2, 0, 0.2, 1)'
              : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative h-full w-full will-change-transform [transform-style:preserve-3d]"
      >
        {/* Next.js Image */}
        <Image
          src={src}
          alt={alt}
          className={`pointer-events-none transition-all duration-300 ${
            isPressed
              ? 'scale-[0.99] brightness-90'
              : isHovered
                ? 'shadow-2xl ring-1 shadow-black/40 ring-white/20'
                : 'shadow-md'
          } ${className}`}
          {...props}
        />

        {/* Dynamic 3D Glare / Light Reflection Overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, rgba(255,255,255,0) 65%)`,
            opacity: glarePos.opacity > 0 ? 1 : 0,
            mixBlendMode: 'overlay',
          }}
        />

        {/* 3D Press Inner Depth Shadow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-100"
          style={{
            boxShadow: isPressed
              ? 'inset 0 6px 25px rgba(0, 0, 0, 0.55), inset 0 -3px 12px rgba(255, 255, 255, 0.15)'
              : 'none',
            opacity: isPressed ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}
