import React from 'react'

export default function CCGroupLogo({ size = 'md' }) {
  const scales = { sm: 0.6, md: 0.82, lg: 1.1 }
  const s = scales[size] || scales.md

  return (
    <img
      src="/logo.png"
      alt="CC Group Argentina – Capitán Cortes"
      style={{
        height: `${54 * s}px`,
        width: 'auto',
        maxWidth: `${290 * s}px`,
        objectFit: 'contain',
      }}
    />
  )
}
