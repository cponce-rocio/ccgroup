import React from 'react'

export default function CCGroupLogo({ size = 'md' }) {
  const scales = { sm: 0.6, md: 0.82, lg: 1.1 }
  const s = scales[size] || scales.md

  return (
    <svg
      width={Math.round(290 * s)}
      height={Math.round(54 * s)}
      viewBox="0 0 290 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CC Group Argentina – Capitán Cortes, Excer, M&R"
    >
      {/* ══ Double-chevron icon — faithful to real logo ══ */}
      <polygon points="0,27 14,6 20,6 6,27 20,48 14,48" fill="#1A1A1A"/>
      <polygon points="12,27 26,8 32,8 18,27 32,46 26,46" fill="#C62828"/>
      <polygon points="22,27 36,8 42,8 28,27 42,46 36,46" fill="#1A1A1A"/>
      <polygon points="34,27 48,8 54,8 40,27 54,46 48,46" fill="#C62828"/>

      {/* ══ "CC" bold red ══ */}
      <text
        x="63"
        y="38"
        fontFamily="'Arial Black', 'Arial', sans-serif"
        fontWeight="900"
        fontSize="33"
        letterSpacing="-1"
        fill="#C62828"
      >CC</text>

      {/* ══ "Group" bold dark ══ */}
      <text
        x="117"
        y="38"
        fontFamily="'Arial Black', 'Arial', sans-serif"
        fontWeight="900"
        fontSize="31"
        letterSpacing="0.5"
        fill="#1A1A1A"
      >Group</text>

      {/* ══ Tagline ══ */}
      <text
        x="63"
        y="51"
        fontFamily="Arial, sans-serif"
        fontWeight="400"
        fontSize="7.2"
        letterSpacing="2"
        fill="#888888"
      >CAPITÁN CORTES – EXCER – M&amp;R</text>
    </svg>
  )
}
