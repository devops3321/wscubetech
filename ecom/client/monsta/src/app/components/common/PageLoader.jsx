"use client";
import React, { useState, useEffect } from 'react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Hide loader when page is fully loaded
    const handleLoad = () => {
      // Start fade out animation
      setFadeOut(true);
      // Remove from DOM after fade out completes
      setTimeout(() => {
        setLoading(false);
      }, 600);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!loading) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center">
        {/* Hourglass Animation */}
        <div className="hourglass-container">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            className="hourglass"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hourglass Outline - Top */}
            <path
              d="M25 15 L50 25 L75 15 L75 35 L50 45 L25 35 Z"
              stroke="#C09578"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Hourglass Outline - Bottom */}
            <path
              d="M25 65 L50 55 L75 65 L75 85 L50 75 L25 85 Z"
              stroke="#C09578"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Center connection */}
            <line
              x1="50"
              y1="45"
              x2="50"
              y2="55"
              stroke="#C09578"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Sand Animation - Top (decreasing) */}
            <path
              d="M30 20 L50 27 L70 20 L70 30 L50 42 L30 30 Z"
              fill="#C09578"
              className="sand-top"
              opacity="0.7"
            />
            {/* Sand Animation - Bottom (increasing) */}
            <path
              d="M30 70 L50 58 L70 70 L70 80 L50 72 L30 80 Z"
              fill="#C09578"
              className="sand-bottom"
              opacity="0.7"
            />
            {/* Sand flow stream */}
            <ellipse
              cx="50"
              cy="50"
              rx="3"
              ry="8"
              fill="#C09578"
              className="sand-flow"
              opacity="0.6"
            />
          </svg>
        </div>
        <p className="mt-8 text-[#C09578] font-playfair text-xl font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}

