'use client';

import { useCallback } from 'react';

type HapticFeedbackType = 'light' | 'medium' | 'heavy' | 'selection' | 'impact';

export const useHapticFeedback = () => {
  const triggerHaptic = useCallback((type: HapticFeedbackType = 'light') => {
    
    if (typeof window === 'undefined') return;

    try {
      
      if ('vibrate' in navigator) {
        let pattern: number | number[] = 10; 

        switch (type) {
          case 'light':
            pattern = 10;
            break;
          case 'medium':
            pattern = 20;
            break;
          case 'heavy':
            pattern = 40;
            break;
          case 'selection':
            pattern = [10];
            break;
          case 'impact':
            pattern = [15, 10, 15];
            break;
        }

        navigator.vibrate(pattern);
      }

      
      if (
        window.DeviceMotionEvent &&
        typeof (
          window.DeviceMotionEvent as unknown as {
            requestPermission?: () => Promise<string>;
          }
        ).requestPermission === 'function'
      ) {
        
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const audioContext = new AudioContextClass();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.01,
        );
        gainNode.gain.linearRampToValueAtTime(
          0,
          audioContext.currentTime + 0.02,
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.02);
      }
    } catch (error) {
      
      console.debug('Haptic feedback not supported:', error);
    }
  }, []);

  const isMobile = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }, []);

  return {
    triggerHaptic,
    isMobile,
    isSupported: typeof navigator !== 'undefined' && 'vibrate' in navigator,
  };
};
