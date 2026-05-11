import React from 'react'
import { Plus, Trash2, DollarSign } from 'lucide-react'
import { SectionCard } from './FormField'

const ADICIONALES = [
  'Almacenamiento Congelado',
  'Bajada a piso',
  'Etiquetado',
  'Forrado de contenedor',
  'Zunchado',
  'VGM',
]

const EMPTY_ROW = () => ({
  id: crypto.randomUUID(),
  despliegue: '',
  cantidades: '',
})

export default function AdicionalesTable({ rows, onChange }) {
  const addRow = () => {
    onChange([...rows, EMPTY_ROW()])
  }

  const removeRow = (id) => {
    onChange(rows.filter((r) => r.id !== id))
  }

  const updateRow = (id, field, value) => {
    onChange(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  const hasRows = rows.length > 0

  return (
    <SectionCard
      icon={<DollarSign size={14} />}
      title="Servicios Adicionales"
      badge={hasRows ? `${rows.length} ítem${rows.length !== 1 ? 's' : ''}` : undefined}
    >
      <div className="flex flex-col gap-4">
        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-brand-gray-200">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-brand-gray-200">
                <th className="table-th w-8 text-center">#</th>
                <th className="table-th" style={{ minWidth: 250 }}>Adicionales</th>
                <th className="table-th w-32 text-center">Cantidades</th>
                <th className="table-th w-12 text-center">—</th>
              </tr>
            </thead>
            <tbody>
              {!hasRows && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-brand-gray-400 text-sm">
                    <div className="flex flex-col items-center gap-2">
                      <DollarSign size={24} className="text-brand-gray-200" />
                      <span>Sin adicionales. Agregue un ítem para comenzar.</span>
                    </div>
                  </td>
                </tr>
              )}
              {rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className="border-b border-brand-gray-100 last:border-0 hover:bg-brand-gray-50 transition-colors animate-row-in group"
                >
                  <td className="table-td text-center">
                    <span className="text-xs text-brand-gray-400 font-mono">{String(idx + 1).padStart(2, '0')}</span>
                  </td>
                    <td className="table-td">
                      <select
                        className="w-full bg-transparent outline-none border border-transparent hover:border-brand-gray-200 focus:border-brand-red rounded-md px-2 py-1 text-sm cursor-pointer transition-all"
                        value={row.despliegue}
                        onChange={(e) => updateRow(row.id, 'despliegue', e.target.value)}
                    >
                      <option value="">Seleccionar...</option>
                      {ADICIONALES.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </td>
                  <td className="table-td text-center">
                    <input
                      type="number"
                      className="w-full bg-transparent outline-none border border-transparent hover:border-brand-gray-200 focus:border-brand-red rounded-md px-2 py-1 text-sm text-center transition-all"
                      placeholder="0"
                      min="0"
                      value={row.cantidades}
                      onChange={(e) => updateRow(row.id, 'cantidades', e.target.value)}
                    />
                  </td>
                  <td className="table-td text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      className="w-7 h-7 rounded-md text-brand-gray-400 hover:text-brand-red hover:bg-red-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                      title="Eliminar fila"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add row button */}
        <div>
          <button
            type="button"
            onClick={addRow}
            className="flex items-center gap-2 text-sm text-brand-red font-500 px-3 py-2 rounded-lg border border-dashed border-brand-red/40 hover:border-brand-red hover:bg-red-50 transition-all duration-200"
          >
            <Plus size={14} />
            Agregar ítem
          </button>
        </div>
      </div>
    </SectionCard>
  )
}
