import React from 'react';

interface SectionHeadingProps {
  subHeading?: string;
  heading: string;
}

export default function SectionHeading({
  subHeading,
  heading,
}: SectionHeadingProps) {
  return (
    <div>
      {subHeading && <p className="text-secondary text-xs sm:text-sm">{subHeading}</p>}
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{heading}</h2>
    </div>
  );
}
