import React from 'react'
import CCGroupLogo from './CCGroupLogo'

export default function Header() {
  const today = new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header 
      className="border-b border-blue-900 sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 shadow-lg"
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="flex-shrink-0">
            <CCGroupLogo />
          </div>
          <div className="h-8 w-px bg-white/30 hidden sm:block" />
          <div className="hidden sm:block min-w-0">
            <p className="text-xs font-500 text-white/80 leading-none truncate">
              Servicios Integrales para el Comercio Exterior
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-white/60 capitalize">{today}</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-brand-red flex items-center justify-center shadow-md">
            <span className="text-white text-xs font-700">OP</span>
          </div>
        </div>
      </div>
    </header>
  )
}
