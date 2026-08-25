import React from 'react';

export default function BottomFadeBlur() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-8 sm:h-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-background/20 to-transparent" />
      <div
        className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_0%,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_60%,transparent_100%)]"
      />
      <div
        className="absolute inset-0 backdrop-blur-sm [mask-image:linear-gradient(to_top,black_0%,black_30%,transparent_75%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_30%,transparent_75%)]"
      />
    </div>
  );
}
