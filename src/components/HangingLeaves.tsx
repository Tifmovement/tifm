import React from 'react';

export default function HangingLeaves() {
  return (
    <div className="absolute top-0 left-[35%] md:left-[41%] lg:left-[43%] -translate-x-1/2 w-48 md:w-64 h-48 md:h-64 pointer-events-none z-20 transition-all duration-700">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.65)]"
      >
        {/* Main branch stem */}
        <path
          d="M100 0C98 25 85 45 60 55"
          stroke="#1b3d22"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M80 30C95 50 115 65 140 70"
          stroke="#162e1a"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Leaf 1: Top-left, pointing up-right, very bright */}
        <g transform="matrix(0.866, 0.5, -0.5, 0.866, 75, 20)">
          <path
            d="M0 0C25 -10 50 10 55 35C45 40 20 25 0 0Z"
            fill="url(#glow-leaf-grad-1)"
          />
          {/* Leaf vein */}
          <path
            d="M0 0C15 5 35 15 55 35"
            stroke="#4ade80"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        {/* Leaf 2: Center, pointing downwards, biggest, lush detail */}
        <g transform="matrix(0.5, 0.866, -0.866, 0.5, 110, 35)">
          <path
            d="M0 0C35 -15 70 15 75 50C60 55 25 35 0 0Z"
            fill="url(#glow-leaf-grad-2)"
          />
          {/* Leaf vein */}
          <path
            d="M0 0C20 8 50 22 75 50"
            stroke="#a3e635"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>

        {/* Leaf 3: Left-bottom, dipping down */}
        <g transform="matrix(0.258, 0.965, -0.965, 0.258, 65, 45)">
          <path
            d="M0 0C30 -12 60 12 65 40C50 45 20 30 0 0Z"
            fill="url(#glow-leaf-grad-3)"
          />
          {/* Leaf vein */}
          <path
            d="M0 0C18 6 42 18 65 40"
            stroke="#22c55e"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        {/* Leaf 4: Tiny accent leaf */}
        <g transform="matrix(0.965, -0.258, 0.258, 0.965, 135, 60)">
          <path
            d="M0 0C15 -5 30 5 32 18C25 20 10 12 0 0Z"
            fill="url(#glow-leaf-grad-1)"
          />
        </g>

        {/* Gradients definitions */}
        <defs>
          <linearGradient id="glow-leaf-grad-1" x1="0" y1="0" x2="55" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#86efac" /> {/* light green */}
            <stop offset="40%" stopColor="#22c55e" /> {/* green 500 */}
            <stop offset="100%" stopColor="#15803d" /> {/* green 700 */}
          </linearGradient>

          <linearGradient id="glow-leaf-grad-2" x1="0" y1="0" x2="75" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#bef264" /> {/* lime 300 */}
            <stop offset="35%" stopColor="#a3e635" /> {/* lime 400 */}
            <stop offset="75%" stopColor="#15803d" /> {/* green 700 */}
            <stop offset="100%" stopColor="#14532d" /> {/* green 900 */}
          </linearGradient>

          <linearGradient id="glow-leaf-grad-3" x1="0" y1="0" x2="65" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4ade80" /> {/* green 400 */}
            <stop offset="50%" stopColor="#16a34a" /> {/* green 600 */}
            <stop offset="100%" stopColor="#14532d" /> {/* green 900 */}
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
