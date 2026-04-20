<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react'
import { Plus, Trash2, DollarSign, ChevronDown, Search, Check } from 'lucide-react'
import { SectionCard } from './FormField'

const ADICIONALES_GRUPOS = [
  { grupo: 'Operaciones', items: ['Manipuleo', 'Almacenaje', 'Fumigación', 'Inspección'] },
  { grupo: 'Logística',   items: ['Transporte', 'Despacho Aduanero'] },
  { grupo: 'Servicios',   items: ['Seguro', 'Documentación', 'Certificación', 'Pesaje'] },
]
const TODOS = ADICIONALES_GRUPOS.flatMap((g) => g.items)
=======
import React from 'react'
import { Plus, Trash2, DollarSign } from 'lucide-react'
import { SectionCard } from './FormField'

const ADICIONALES = [
  'Manipuleo',
  'Almacenaje',
  'Seguro',
  'Transporte',
  'Documentación',
  'Despacho Aduanero',
  'Fumigación',
  'Inspección',
]
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730

const EMPTY_ROW = () => ({
  id: crypto.randomUUID(),
  item: '',
  adicional: '',
  cantidad: '',
  costo: '',
})

function formatCurrency(value) {
  const num = parseFloat(value)
  if (isNaN(num)) return '—'
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(num)
}

<<<<<<< HEAD
function DropdownItem({ item, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`w-full text-left flex items-center justify-between px-3 py-2.5 text-sm transition-colors
        ${selected ? 'bg-red-50 text-brand-red font-500' : 'text-brand-black hover:bg-brand-gray-50'}`}
    >
      <span>{item}</span>
      {selected && <Check size={12} className="text-brand-red flex-shrink-0" />}
    </button>
  )
}

function AdicionalDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (open && searchRef.current) setTimeout(() => searchRef.current?.focus(), 30)
    else setSearch('')
  }, [open])

  const filtered = search.trim()
    ? TODOS.filter((i) => i.toLowerCase().includes(search.toLowerCase()))
    : null

  const handleSelect = (val) => { onChange(val); setOpen(false) }

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-1 border rounded-md px-2.5 py-2 text-sm text-left transition-all
          ${open ? 'border-brand-red shadow-input-focus bg-white' : 'border-brand-gray-200 hover:border-brand-gray-400 bg-white'}
          ${value ? 'text-brand-black' : 'text-brand-gray-400'}`}
      >
        <span className="truncate">{value || 'Seleccionar...'}</span>
        <ChevronDown size={13} className={`flex-shrink-0 text-brand-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 w-full min-w-[200px] bg-white border border-brand-gray-200 rounded-xl shadow-card-hover overflow-hidden animate-fade-up">
          <div className="p-2 border-b border-brand-gray-100">
            <div className="flex items-center gap-2 bg-brand-gray-50 rounded-lg px-2.5 py-1.5">
              <Search size={12} className="text-brand-gray-400 flex-shrink-0" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-xs text-brand-black placeholder-brand-gray-400"
              />
            </div>
          </div>
          <div className="max-h-52 overflow-y-auto">
            {value && (
              <button type="button" onClick={() => handleSelect('')}
                className="w-full text-left px-3 py-2 text-xs text-brand-gray-400 hover:bg-brand-gray-50 transition-colors border-b border-brand-gray-100">
                — Limpiar selección
              </button>
            )}
            {filtered !== null
              ? filtered.length === 0
                ? <div className="px-3 py-4 text-xs text-brand-gray-400 text-center">Sin resultados</div>
                : filtered.map((item) => <DropdownItem key={item} item={item} selected={value === item} onSelect={handleSelect} />)
              : ADICIONALES_GRUPOS.map((grupo) => (
                  <div key={grupo.grupo}>
                    <div className="px-3 pt-2.5 pb-1">
                      <span className="text-[10px] font-700 uppercase tracking-widest text-brand-gray-400">{grupo.grupo}</span>
                    </div>
                    {grupo.items.map((item) => (
                      <DropdownItem key={item} item={item} selected={value === item} onSelect={handleSelect} />
                    ))}
                  </div>
                ))
            }
          </div>
        </div>
      )}
    </div>
  )
}

// Vista mobile: card por fila
function MobileRow({ row, idx, onUpdate, onRemove }) {
  const subtotal = row.cantidad && row.costo
    ? parseFloat(row.cantidad) * parseFloat(row.costo)
    : null

  return (
    <div className="bg-white border border-brand-gray-200 rounded-xl p-4 flex flex-col gap-3 animate-row-in shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-xs font-700 text-brand-gray-400 font-mono uppercase tracking-wider">
          Ítem #{String(idx + 1).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => onRemove(row.id)}
          className="w-7 h-7 rounded-md text-brand-gray-300 hover:text-brand-red hover:bg-red-50 transition-all flex items-center justify-center"
        >
          <Trash2 size={13} />
        </button>
      </div>

      <div>
        <label className="label-text">Descripción</label>
        <input
          type="text"
          className="input-field"
          placeholder="Descripción del ítem..."
          value={row.item}
          onChange={(e) => onUpdate(row.id, 'item', e.target.value)}
        />
      </div>

      <div>
        <label className="label-text">Adicional</label>
        <AdicionalDropdown value={row.adicional} onChange={(val) => onUpdate(row.id, 'adicional', val)} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label-text">Cantidad</label>
          <input
            type="number"
            className="input-field text-center"
            placeholder="0"
            min="0"
            value={row.cantidad}
            onChange={(e) => onUpdate(row.id, 'cantidad', e.target.value)}
          />
        </div>
        <div>
          <label className="label-text">Costo Unit.</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400 text-xs pointer-events-none">$</span>
            <input
              type="number"
              className="input-field pl-6"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={row.costo}
              onChange={(e) => onUpdate(row.id, 'costo', e.target.value)}
            />
          </div>
        </div>
      </div>

      {subtotal !== null && (
        <div className="flex items-center justify-between pt-2 border-t border-brand-gray-100">
          <span className="text-xs text-brand-gray-400 font-500">Subtotal</span>
          <span className="text-sm font-700 text-brand-red font-mono tabular-nums">{formatCurrency(subtotal)}</span>
        </div>
      )}
    </div>
  )
}

// Componente principal
export default function AdicionalesTable({ rows, onChange }) {
  const addRow = () => onChange([...rows, EMPTY_ROW()])
  const removeRow = (id) => onChange(rows.filter((r) => r.id !== id))
  const updateRow = (id, field, value) =>
    onChange(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)))

  const total = rows.reduce((acc, r) => {
    const sub = parseFloat(r.cantidad || 0) * parseFloat(r.costo || 0)
    return acc + (isNaN(sub) ? 0 : sub)
=======
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

  const total = rows.reduce((acc, r) => {
    const subtotal = parseFloat(r.cantidad || 0) * parseFloat(r.costo || 0)
    return acc + (isNaN(subtotal) ? 0 : subtotal)
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
  }, 0)

  const hasRows = rows.length > 0

  return (
    <SectionCard
      icon={<DollarSign size={14} />}
      title="Servicios Adicionales"
      badge={hasRows ? `${rows.length} ítem${rows.length !== 1 ? 's' : ''}` : undefined}
    >
      <div className="flex flex-col gap-4">
<<<<<<< HEAD

        {/* ── MOBILE: cards apiladas (visible solo en < md) ── */}
        <div className="flex flex-col gap-3 md:hidden">
          {!hasRows && (
            <div className="text-center py-10 text-brand-gray-400 text-sm flex flex-col items-center gap-2">
              <DollarSign size={26} className="text-brand-gray-200" />
              <span>Sin adicionales. Tocá el botón para agregar.</span>
            </div>
          )}
          {rows.map((row, idx) => (
            <MobileRow key={row.id} row={row} idx={idx} onUpdate={updateRow} onRemove={removeRow} />
          ))}
        </div>

        {/* ── DESKTOP: tabla (visible solo en >= md) ── */}
        <div className="hidden md:block rounded-lg border border-brand-gray-200">
          <div style={{ overflowX: 'auto', overflowY: 'visible', paddingBottom: '200px' }}>
            <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-gray-200">
                <th className="table-th w-8 text-center">#</th>
                <th className="table-th">Ítem / Descripción</th>
                <th className="table-th" style={{ minWidth: 200 }}>Adicional</th>
                <th className="table-th w-24 text-center">Cantidad</th>
                <th className="table-th w-36">Costo Unit.</th>
                <th className="table-th w-32 text-right">Subtotal</th>
                <th className="table-th w-10"></th>
=======
        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-brand-gray-200">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-brand-gray-200">
                <th className="table-th w-8 text-center">#</th>
                <th className="table-th" style={{ minWidth: 140 }}>Ítem</th>
                <th className="table-th" style={{ minWidth: 160 }}>Adicional</th>
                <th className="table-th w-24">Cantidad</th>
                <th className="table-th w-32">Costo Unit.</th>
                <th className="table-th w-32 text-right">Subtotal</th>
                <th className="table-th w-12 text-center">—</th>
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
              </tr>
            </thead>
            <tbody>
              {!hasRows && (
                <tr>
<<<<<<< HEAD
                  <td colSpan={7} className="text-center py-12 text-brand-gray-400 text-sm">
                    <div className="flex flex-col items-center gap-2">
                      <DollarSign size={26} className="text-brand-gray-200" />
                      <span>Sin adicionales. Usá el botón de abajo para agregar.</span>
=======
                  <td colSpan={7} className="text-center py-10 text-brand-gray-400 text-sm">
                    <div className="flex flex-col items-center gap-2">
                      <DollarSign size={24} className="text-brand-gray-200" />
                      <span>Sin adicionales. Agregue un ítem para comenzar.</span>
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
                    </div>
                  </td>
                </tr>
              )}
              {rows.map((row, idx) => {
<<<<<<< HEAD
                const subtotal = row.cantidad && row.costo
                  ? parseFloat(row.cantidad) * parseFloat(row.costo)
                  : null
                return (
                  <tr key={row.id} className="border-b border-brand-gray-100 last:border-0 hover:bg-brand-gray-50/60 transition-colors animate-row-in group">
                    <td className="table-td text-center">
                      <span className="text-xs text-brand-gray-400 font-mono tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
=======
                const subtotal =
                  row.cantidad && row.costo
                    ? parseFloat(row.cantidad) * parseFloat(row.costo)
                    : null

                return (
                  <tr
                    key={row.id}
                    className="border-b border-brand-gray-100 last:border-0 hover:bg-brand-gray-50 transition-colors animate-row-in group"
                  >
                    <td className="table-td text-center">
                      <span className="text-xs text-brand-gray-400 font-mono">{String(idx + 1).padStart(2, '0')}</span>
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
                    </td>
                    <td className="table-td">
                      <input
                        type="text"
<<<<<<< HEAD
                        className="w-full bg-transparent outline-none border border-transparent hover:border-brand-gray-200 focus:border-brand-red rounded-md px-2 py-1.5 text-sm transition-all"
=======
                        className="w-full bg-transparent outline-none border border-transparent hover:border-brand-gray-200 focus:border-brand-red rounded-md px-2 py-1 text-sm transition-all"
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
                        placeholder="Descripción..."
                        value={row.item}
                        onChange={(e) => updateRow(row.id, 'item', e.target.value)}
                      />
                    </td>
<<<<<<< HEAD
                    <td className="table-td overflow-visible">
                      <AdicionalDropdown value={row.adicional} onChange={(val) => updateRow(row.id, 'adicional', val)} />
=======
                    <td className="table-td">
                      <select
                        className="w-full bg-transparent outline-none border border-transparent hover:border-brand-gray-200 focus:border-brand-red rounded-md px-2 py-1 text-sm cursor-pointer transition-all"
                        value={row.adicional}
                        onChange={(e) => updateRow(row.id, 'adicional', e.target.value)}
                      >
                        <option value="">Seleccionar...</option>
                        {ADICIONALES.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
                    </td>
                    <td className="table-td">
                      <input
                        type="number"
<<<<<<< HEAD
                        className="w-full bg-transparent outline-none border border-transparent hover:border-brand-gray-200 focus:border-brand-red rounded-md px-2 py-1.5 text-sm text-center transition-all tabular-nums"
=======
                        className="w-full bg-transparent outline-none border border-transparent hover:border-brand-gray-200 focus:border-brand-red rounded-md px-2 py-1 text-sm text-center transition-all"
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
                        placeholder="0"
                        min="0"
                        value={row.cantidad}
                        onChange={(e) => updateRow(row.id, 'cantidad', e.target.value)}
                      />
                    </td>
                    <td className="table-td">
                      <div className="relative">
<<<<<<< HEAD
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-gray-400 text-xs pointer-events-none">$</span>
                        <input
                          type="number"
                          className="w-full bg-transparent outline-none border border-transparent hover:border-brand-gray-200 focus:border-brand-red rounded-md pl-5 pr-2 py-1.5 text-sm transition-all tabular-nums"
=======
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-brand-gray-400 text-xs pointer-events-none">$</span>
                        <input
                          type="number"
                          className="w-full bg-transparent outline-none border border-transparent hover:border-brand-gray-200 focus:border-brand-red rounded-md pl-5 pr-2 py-1 text-sm transition-all"
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          value={row.costo}
                          onChange={(e) => updateRow(row.id, 'costo', e.target.value)}
                        />
                      </div>
                    </td>
<<<<<<< HEAD
                    <td className="table-td text-right pr-4">
                      <span className={`text-sm font-mono tabular-nums ${subtotal !== null ? 'font-600 text-brand-black' : 'text-brand-gray-300'}`}>
=======
                    <td className="table-td text-right">
                      <span className={`font-500 text-sm font-mono ${subtotal !== null ? 'text-brand-black' : 'text-brand-gray-300'}`}>
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
                        {subtotal !== null ? formatCurrency(subtotal) : '—'}
                      </span>
                    </td>
                    <td className="table-td text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(row.id)}
<<<<<<< HEAD
                        className="w-7 h-7 rounded-md text-brand-gray-300 hover:text-brand-red hover:bg-red-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
=======
                        className="w-7 h-7 rounded-md text-brand-gray-400 hover:text-brand-red hover:bg-red-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
                        title="Eliminar fila"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
<<<<<<< HEAD
            {hasRows && (
              <tfoot>
                <tr className="bg-brand-gray-50 border-t-2 border-brand-gray-200">
                  <td colSpan={5} className="px-4 py-3 text-sm font-600 text-brand-gray-600">Total estimado</td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-700 text-base text-brand-red font-mono tabular-nums">{formatCurrency(total)}</span>
=======

            {/* Total row */}
            {hasRows && (
              <tfoot>
                <tr className="bg-brand-gray-50 border-t-2 border-brand-gray-200">
                  <td colSpan={5} className="px-4 py-3 text-sm font-600 text-brand-gray-600">
                    Total estimado
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-700 text-base text-brand-red font-mono">
                      {formatCurrency(total)}
                    </span>
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
                  </td>
                  <td />
                </tr>
              </tfoot>
            )}
<<<<<<< HEAD
            </table>
          </div>
        </div>

        {/* Total mobile */}
        {hasRows && (
          <div className="flex items-center justify-between px-4 py-3 bg-brand-gray-50 rounded-xl border border-brand-gray-200 md:hidden">
            <span className="text-sm font-600 text-brand-gray-600">Total estimado</span>
            <span className="font-700 text-base text-brand-red font-mono tabular-nums">{formatCurrency(total)}</span>
          </div>
        )}

        {/* Botón agregar */}
=======
          </table>
        </div>

        {/* Add row button */}
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
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
