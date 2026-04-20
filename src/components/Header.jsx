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
    <header className="bg-white border-b border-brand-gray-200 sticky top-0 z-50">
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-4">
          <CCGroupLogo />
          <div className="h-8 w-px bg-brand-gray-200" />
          <div>
            <p className="text-xs font-500 text-brand-gray-600 leading-none">
              Servicios Integrales para el Comercio Exterior
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-brand-gray-400 capitalize">{today}</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-brand-red flex items-center justify-center">
            <span className="text-white text-xs font-700">OP</span>
          </div>
        </div>
      </div>
    </header>
  )
}
