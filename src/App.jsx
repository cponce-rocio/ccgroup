import React, { useState, useCallback } from 'react'
import { Save, X, RefreshCw, ChevronRight, FileSpreadsheet, StickyNote } from 'lucide-react'
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
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setIsSaving(true)
    // Simulate API call
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
    <div className="min-h-screen bg-brand-gray-50">
      {/* Overlay para mejor legibilidad */}
      <div className="min-h-screen">
      <Header />

      {/* Page title bar */}
      <div className="bg-white/95 backdrop-blur border-b border-brand-gray-100">
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-brand-gray-400">
            <span>Operaciones</span>
            <ChevronRight size={14} />
            <span className="text-brand-black font-500">Nueva Operación</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="btn-secondary"
            >
              <FileSpreadsheet size={14} className="text-green-600" />
              Exportar Excel
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary"
            >
              <X size={14} />
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={14} />
                  Guardar operación
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-[1100px] mx-auto px-6 py-8">
        <div 
          className="rounded-lg shadow-lg p-8 flex flex-col gap-5 bg-white/85 backdrop-blur"
          style={{
            backgroundImage: 'url(/puerto-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
          }}
        >
          <OperationForm
            values={form}
            onChange={handleChange}
            errors={errors}
          />

          <AdicionalesTable
            rows={rows}
            onChange={setRows}
          />

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
          <div className="flex items-center justify-between pt-2 pb-8">
            <p className="text-xs text-brand-gray-400">
              Los campos marcados con <span className="text-brand-red">*</span> son obligatorios
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExport}
                className="btn-secondary"
              >
                <FileSpreadsheet size={14} className="text-green-600" />
                Exportar Excel
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                <X size={14} />
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Guardar operación
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      </div>
    </div>
  )
}
