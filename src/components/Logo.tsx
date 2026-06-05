import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
}

export default function Logo({ className = "h-[50px] md:h-[60px] w-auto object-contain", size }: LogoProps) {
  return (
    <img
      src="https://res.cloudinary.com/dsmsugpys/image/upload/v1780667044/Logo_tifm_r1o8sm.png"
      alt="Logo"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    />
  );
}

