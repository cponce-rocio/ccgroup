import React, { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { FormField, SectionCard } from './FormField'

const ADICIONALES_OPTIONS = [
  'Almacenamiento Congelado',
  'Bajada a piso',
  'Etiquetado',
  'Forrado de contenedor',
  'Zunchado',
  'VGM',
  'Control de la Temp Carga'
]

export default function AdicionalesTable({ rows, onChange }) {
  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      adicional: '',
      cantidad: '',
    }
    onChange([...rows, newRow])
  }

  const handleDeleteRow = (id) => {
    onChange(rows.filter((row) => row.id !== id))
  }

  const handleRowChange = (id, field, value) => {
    onChange(
      rows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    )
  }

  return (
    <SectionCard title="Servicios Adicionales" badge="Opcional">
      <div className="flex flex-col gap-4">
        {/* Table for desktop, list for mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-gray-200 bg-brand-gray-50">
                <th className="text-left font-600 text-brand-gray-600 px-3 py-2 w-12">#</th>
                <th className="text-left font-600 text-brand-gray-600 px-3 py-2">Adicional</th>
                <th className="text-left font-600 text-brand-gray-600 px-3 py-2">Cantidad</th>
                <th className="text-center font-600 text-brand-gray-600 px-3 py-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => {
                return (
                  <tr key={row.id} className="border-b border-brand-gray-100 hover:bg-brand-gray-50 transition-colors">
                    <td className="px-3 py-2 text-brand-gray-600">{idx + 1}</td>
                    <td className="px-3 py-2">
                      <select
                        value={row.adicional}
                        onChange={(e) => handleRowChange(row.id, 'adicional', e.target.value)}
                        className="input-field text-sm bg-white cursor-pointer"
                      >
                        <option value="">Seleccionar adicional</option>
                        {ADICIONALES_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={row.cantidad}
                        onChange={(e) => handleRowChange(row.id, 'cantidad', e.target.value)}
                        placeholder="0"
                        className="input-field text-sm"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button
                        onClick={() => handleDeleteRow(row.id)}
                        className="p-1.5 hover:bg-red-100 rounded-md transition-colors text-red-600"
                        title="Eliminar fila"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile view - Card based layout */}
        <div className="md:hidden flex flex-col gap-3">
          {rows.map((row, idx) => {
            return (
              <div key={row.id} className="bg-brand-gray-50 rounded-lg p-4 border border-brand-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-600 text-brand-gray-600">#{idx + 1}</span>
                  <button
                    onClick={() => handleDeleteRow(row.id)}
                    className="p-1.5 hover:bg-red-100 rounded-md transition-colors text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <FormField label="Adicional">
                    <select
                      value={row.adicional}
                      onChange={(e) => handleRowChange(row.id, 'adicional', e.target.value)}
                      className="input-field text-sm bg-white cursor-pointer"
                    >
                      <option value="">Seleccionar adicional</option>
                      {ADICIONALES_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Cantidad">
                    <input
                      type="number"
                      value={row.cantidad}
                      onChange={(e) => handleRowChange(row.id, 'cantidad', e.target.value)}
                      placeholder="0"
                      className="input-field text-sm"
                    />
                  </FormField>
                </div>
              </div>
            )
          })}
        </div>

        {/* Add button */}
        <button
          onClick={handleAddRow}
          className="w-full border-2 border-dashed border-brand-gray-300 rounded-lg py-3 px-4 text-sm font-600 text-brand-gray-600 hover:border-brand-red hover:text-brand-red transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          Agregar servicio adicional
        </button>
      </div>
    </SectionCard>
  )
}
