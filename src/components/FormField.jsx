import React from 'react'

export function FormField({ label, error, required, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="label-text">
          {label}
          {required && <span className="text-brand-red ml-0.5">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-brand-red mt-0.5 animate-fade-in">{error}</p>
      )}
    </div>
  )
}

export function Input({ error, ...props }) {
  return (
    <input
      className={`input-field ${error ? 'border-brand-red focus:border-brand-red' : ''}`}
      {...props}
    />
  )
}

export function Textarea({ error, ...props }) {
  return (
    <textarea
      className={`input-field resize-none ${error ? 'border-brand-red' : ''}`}
      {...props}
    />
  )
}

export function Select({ error, children, ...props }) {
  return (
    <select
      className={`input-field bg-white cursor-pointer ${error ? 'border-brand-red' : ''}`}
      {...props}
    >
      {children}
    </select>
  )
}

export function SectionCard({ icon, title, badge, children }) {
  return (
    <div className="section-card shadow-card animate-fade-up">
      <div className="section-header">
        {icon && (
          <span className="w-7 h-7 rounded-md bg-brand-red/10 flex items-center justify-center text-brand-red">
            {icon}
          </span>
        )}
        <h3 className="font-600 text-sm text-brand-black">{title}</h3>
        {badge && (
          <span className="ml-auto text-xs bg-brand-gray-100 text-brand-gray-600 px-2 py-0.5 rounded-full font-500">
            {badge}
          </span>
        )}
      </div>
      <div className="section-body">{children}</div>
    </div>
  )
}
