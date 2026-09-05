import React from 'react';

/**
 * Razor-sharp Vector SVG Brand Logo for Impact Health
 * Replaces the blurry, low-resolution raster PNG (187x103)
 * with a 100% crisp vector implementation that scales to any DPI.
 */
export default function BrandLogo({ className = "h-10 sm:h-11", withTagline = false }) {
  if (withTagline) {
    return (
      <svg
        viewBox="0 0 200 80"
        className={`w-auto object-contain select-none transition-transform duration-200 group-hover:scale-[1.02] ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Impact Health Logo"
      >
        {/* Navy Square Emblem */}
        <rect x="2" y="4" width="62" height="62" rx="6" fill="#003087" />
        <text
          x="33"
          y="49"
          fontFamily="Playfair Display, Georgia, serif"
          fontSize="40"
          fontWeight="700"
          fill="#FFFFFF"
          textAnchor="middle"
        >
          IH
        </text>

        {/* Wordmark: IMPACT */}
        <text
          x="76"
          y="32"
          fontFamily="Playfair Display, Georgia, serif"
          fontSize="23"
          fontWeight="800"
          letterSpacing="2.5"
          fill="#003087"
        >
          IMPACT
        </text>

        {/* Wordmark: HEALTH */}
        <text
          x="76"
          y="60"
          fontFamily="Playfair Display, Georgia, serif"
          fontSize="23"
          fontWeight="800"
          letterSpacing="2.8"
          fill="#003087"
        >
          HEALTH
        </text>

        {/* Registered Trademark symbol */}
        <text
          x="184"
          y="20"
          fontFamily="Plus Jakarta Sans, sans-serif"
          fontSize="9"
          fontWeight="700"
          fill="#003087"
        >
          ®
        </text>

        {/* Divider hairline */}
        <line x1="2" y1="71" x2="192" y2="71" stroke="#CBD5E1" strokeWidth="1" />

        {/* Clean Subtitle */}
        <text
          x="97"
          y="79"
          fontFamily="Plus Jakarta Sans, sans-serif"
          fontSize="7.5"
          fontWeight="600"
          letterSpacing="0.4"
          fill="#64748B"
          textAnchor="middle"
        >
          FOR PATIENTS | PRACTITIONERS | PROVIDERS
        </text>
      </svg>
    );
  }

  // Pure Clean Horizontal Navbar Wordmark (Gold Standard for Headers)
  return (
    <svg
      viewBox="0 0 196 66"
      className={`w-auto object-contain select-none transition-transform duration-200 group-hover:scale-[1.02] ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Impact Health Logo"
    >
      {/* Navy Square Emblem */}
      <rect x="2" y="3" width="60" height="60" rx="6" fill="#003087" />
      <text
        x="32"
        y="47"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="39"
        fontWeight="700"
        fill="#FFFFFF"
        textAnchor="middle"
      >
        IH
      </text>

      {/* Wordmark: IMPACT */}
      <text
        x="74"
        y="30"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="22"
        fontWeight="800"
        letterSpacing="2.2"
        fill="#003087"
      >
        IMPACT
      </text>

      {/* Wordmark: HEALTH */}
      <text
        x="74"
        y="57"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="22"
        fontWeight="800"
        letterSpacing="2.5"
        fill="#003087"
      >
        HEALTH
      </text>

      {/* Registered Trademark symbol */}
      <text
        x="180"
        y="18"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="9"
        fontWeight="700"
        fill="#003087"
      >
        ®
      </text>
    </svg>
  );
}
