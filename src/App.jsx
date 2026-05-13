import React, { useState, useCallback } from 'react'
import { 
  Save, 
  X, 
  RefreshCw, 
  ChevronRight, 
  FileSpreadsheet, 
  StickyNote, 
  ShieldAlert, 
  Thermometer 
} from 'lucide-react'
import Header from './components/Header'
import OperationForm from './components/OperationForm'
import AdicionalesTable from './components/AdicionalesTable'
import Toast from './components/Toast'
import { FormField, Textarea, SectionCard } from './components/FormField'
import { exportToExcel } from './utils/exportExcel'

const INITIAL_FORM = {
  nroContenedor: '',
  idOperacion: '',
  fecha: new Date().toISOString().split('T')[0],
  cliente: '',
  booking: '',
  observaciones: '',
  imagenes: [],
  // Nuevo campo para Aduana
  canalAduana: '', 
}

function validate(values) {
  const errors = {}
  if (!values.nroContenedor.trim()) errors.nroContenedor = 'Campo requerido'
  if (!values.idOperacion.trim()) errors.idOperacion = 'Campo requerido'
  if (!values.fecha) errors.fecha = 'Campo requerido'
  if (!values.cliente.trim()) errors.cliente = 'Campo requerido'
  return errors
}

export default function App() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [rows, setRows] = useState([])
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }, [errors])

  const handleSave = async () => {
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setToast({ message: 'Completá los campos requeridos antes de guardar.', type: 'error' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsSaving(false)

    console.log('Operación guardada:', { ...form, adicionales: rows })
    setToast({ message: `Operación ${form.idOperacion} guardada exitosamente.`, type: 'success' })
  }

  const handleExport = () => {
    try {
      exportToExcel({ form, rows })
      setToast({ message: 'Excel exportado correctamente.', type: 'success' })
    } catch (e) {
      setToast({ message: 'Error al exportar. Intentá de nuevo.', type: 'error' })
    }
  }

  const handleCancel = () => {
    if (window.confirm('¿Descartar todos los cambios?')) {
      setForm(INITIAL_FORM)
      setRows([])
      setErrors({})
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page title bar */}
      <div className="bg-white/80 backdrop-blur border-b border-slate-200/50">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-brand-gray-400">
            <span>Operaciones</span>
            <ChevronRight size={14} />
            <span className="text-brand-black font-500">Nueva Operación</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <button type="button" onClick={handleExport} className="btn-secondary w-full sm:w-auto text-xs sm:text-sm">
              <FileSpreadsheet size={14} className="text-green-600 flex-shrink-0" />
              <span className="hidden sm:inline">Exportar Excel</span>
              <span className="sm:hidden">Exportar</span>
            </button>
            <button type="button" onClick={handleCancel} className="btn-secondary w-full sm:w-auto text-xs sm:text-sm">
              <X size={14} className="flex-shrink-0" />
              <span className="hidden sm:inline">Cancelar</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed text-xs sm:text-sm"
            >
              {isSaving ? (
                <>
                  <RefreshCw size={14} className="animate-spin flex-shrink-0" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save size={14} className="flex-shrink-0" />
                  <span>Guardar operación</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 w-full mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="max-w-[1100px] mx-auto w-full">
          <div className="rounded-xl shadow-lg p-5 sm:p-6 md:p-8 flex flex-col gap-5 bg-white/92 border border-blue-100/30 hover:shadow-xl transition-shadow duration-300">
            
            <OperationForm
              values={form}
              onChange={handleChange}
              errors={errors}
            />

            <AdicionalesTable
              rows={rows}
              onChange={setRows}
              // Nota: Asegúrate de que AdicionalesTable incluya "Control de la Temp Carga" en sus opciones
            />

            {/* SECCIÓN: INFORMACIÓN ADUANA */}
            <SectionCard icon={<ShieldAlert size={14} />} title="Información Aduana">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-2">
                {[
                  { id: 'verde', label: 'Canal Verde', color: 'border-green-200 text-green-700 bg-green-50' },
                  { id: 'naranja', label: 'Canal Naranja', color: 'border-orange-200 text-orange-700 bg-orange-50' },
                  { id: 'rojo', label: 'Canal Rojo', color: 'border-red-200 text-red-700 bg-red-50' },
                  { id: 'rojo_ex', label: 'Canal Rojo Exhaustivo', color: 'border-red-900 text-white bg-red-800' }
                ].map((canal) => (
                  <label 
                    key={canal.id}
                    className={`
                      relative flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                      ${form.canalAduana === canal.id 
                        ? `${canal.color} ring-2 ring-blue-400 ring-offset-1` 
                        : 'border-slate-100 bg-white hover:border-slate-300'}
                    `}
                  >
                    <input
                      type="radio"
                      name="canalAduana"
                      className="w-4 h-4"
                      checked={form.canalAduana === canal.id}
                      onChange={() => handleChange('canalAduana', canal.id)}
                    />
                    <span className="text-xs font-bold uppercase tracking-wider">{canal.label}</span>
                  </label>
                ))}
              </div>
            </SectionCard>

            {/* Sección: Observaciones */}
            <SectionCard icon={<StickyNote size={14} />} title="Observaciones">
              <FormField label="Notas y observaciones de la operación">
                <Textarea
                  placeholder="Ingrese cualquier observación relevante sobre esta operación..."
                  value={form.observaciones}
                  onChange={(e) => handleChange('observaciones', e.target.value)}
                  rows={3}
                />
              </FormField>
            </SectionCard>

            {/* Bottom action bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 pb-6 sm:pb-8 border-t border-blue-100">
              <p className="text-xs text-brand-gray-400">
                Los campos marcados con <span className="text-brand-red">*</span> son obligatorios
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                <button type="button" onClick={handleExport} className="btn-secondary w-full sm:w-auto text-xs sm:text-sm">
                  <FileSpreadsheet size={14} className="text-green-600 flex-shrink-0" />
                  <span>Exportar Excel</span>
                </button>
                <button type="button" onClick={handleCancel} className="btn-secondary w-full sm:w-auto text-xs sm:text-sm">
                  <X size={14} className="flex-shrink-0" />
                  <span>Cancelar</span>
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed text-xs sm:text-sm"
                >
                  {isSaving ? 'Guardando...' : 'Guardar operación'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}