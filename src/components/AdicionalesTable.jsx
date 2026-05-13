import React, { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { FormField, Input, SectionCard } from './FormField'

export default function AdicionalesTable({ rows, onChange }) {
  const [errors, setErrors] = useState({})

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      item: '',
      adicional: '',
      cantidad: '',
      costo: '',
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

  const total = rows.reduce((acc, row) => {
    const qty = parseFloat(row.cantidad) || 0
    const cost = parseFloat(row.costo) || 0
    return acc + qty * cost
  }, 0)

  return (
    <SectionCard title="Servicios Adicionales" badge="Opcional">
      <div className="flex flex-col gap-4">
        {/* Table for desktop, list for mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-gray-200 bg-brand-gray-50">
                <th className="text-left font-600 text-brand-gray-600 px-3 py-2 w-12">#</th>
                <th className="text-left font-600 text-brand-gray-600 px-3 py-2">Ítem</th>
                <th className="text-left font-600 text-brand-gray-600 px-3 py-2">Adicional</th>
                <th className="text-left font-600 text-brand-gray-600 px-3 py-2">Cantidad</th>
                <th className="text-left font-600 text-brand-gray-600 px-3 py-2">Costo (ARS)</th>
                <th className="text-right font-600 text-brand-gray-600 px-3 py-2">Subtotal (ARS)</th>
                <th className="text-center font-600 text-brand-gray-600 px-3 py-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => {
                const qty = parseFloat(row.cantidad) || 0
                const cost = parseFloat(row.costo) || 0
                const subtotal = qty * cost

                return (
                  <tr key={row.id} className="border-b border-brand-gray-100 hover:bg-brand-gray-50 transition-colors">
                    <td className="px-3 py-2 text-brand-gray-600">{idx + 1}</td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={row.item}
                        onChange={(e) => handleRowChange(row.id, 'item', e.target.value)}
                        placeholder="Descripción"
                        className="input-field text-sm"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={row.adicional}
                        onChange={(e) => handleRowChange(row.id, 'adicional', e.target.value)}
                        placeholder="Tipo"
                        className="input-field text-sm"
                      />
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
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={row.costo}
                        onChange={(e) => handleRowChange(row.id, 'costo', e.target.value)}
                        placeholder="0.00"
                        className="input-field text-sm"
                      />
                    </td>
                    <td className="px-3 py-2 text-right font-600 text-brand-black">
                      ${subtotal.toFixed(2)}
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
            <tfoot>
              <tr className="font-600 bg-brand-gray-50 border-t-2 border-brand-gray-200">
                <td colSpan="5" className="px-3 py-3 text-right">TOTAL:</td>
                <td className="px-3 py-3 text-right text-brand-red text-lg">${total.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile view - Card based layout */}
        <div className="md:hidden flex flex-col gap-3">
          {rows.map((row, idx) => {
            const qty = parseFloat(row.cantidad) || 0
            const cost = parseFloat(row.costo) || 0
            const subtotal = qty * cost

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
                  <FormField label="Ítem">
                    <input
                      type="text"
                      value={row.item}
                      onChange={(e) => handleRowChange(row.id, 'item', e.target.value)}
                      placeholder="Descripción"
                      className="input-field text-sm"
                    />
                  </FormField>
                  <FormField label="Adicional">
                    <input
                      type="text"
                      value={row.adicional}
                      onChange={(e) => handleRowChange(row.id, 'adicional', e.target.value)}
                      placeholder="Tipo"
                      className="input-field text-sm"
                    />
                  </FormField>
                  <div className="grid grid-cols-2 gap-2">
                    <FormField label="Cantidad">
                      <input
                        type="number"
                        value={row.cantidad}
                        onChange={(e) => handleRowChange(row.id, 'cantidad', e.target.value)}
                        placeholder="0"
                        className="input-field text-sm"
                      />
                    </FormField>
                    <FormField label="Costo (ARS)">
                      <input
                        type="number"
                        value={row.costo}
                        onChange={(e) => handleRowChange(row.id, 'costo', e.target.value)}
                        placeholder="0.00"
                        className="input-field text-sm"
                      />
                    </FormField>
                  </div>
                  <div className="pt-2 border-t border-brand-gray-300 flex items-center justify-between">
                    <span className="text-xs font-600 text-brand-gray-600">Subtotal:</span>
                    <span className="font-600 text-brand-red">${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Total */}
        {rows.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 flex items-center justify-between">
            <span className="font-600 text-brand-black">Total de Adicionales:</span>
            <span className="text-xl font-700 text-brand-red">${total.toFixed(2)}</span>
          </div>
        )}

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
