import React, { useState, useCallback } from 'react'
import { Save, X, RefreshCw, ChevronRight, FileSpreadsheet } from 'lucide-react'
import Header from './components/Header'
import OperationForm from './components/OperationForm'
import AdicionalesTable from './components/AdicionalesTable'
import Toast from './components/Toast'
import { exportToExcel } from './utils/exportExcel'

const INITIAL_FORM = {
  nroContenedor: '',
  idOperacion: '',
  fecha: new Date().toISOString().split('T')[0],
  cliente: '',
  booking: '',
  tipoMercaderia: '',
  pesoKg: '',
  observaciones: '',
  imagenes: [],
}

function validate(values) {
  const errors = {}
  if (!values.nroContenedor.trim()) errors.nroContenedor = 'Campo requerido'
  if (!values.idOperacion.trim()) errors.idOperacion = 'Campo requerido'
  if (!values.fecha) errors.fecha = 'Campo requerido'
  if (!values.cliente.trim()) errors.cliente = 'Campo requerido'
  if (!values.tipoMercaderia || values.tipoMercaderia === 'Seleccionar...')
    errors.tipoMercaderia = 'Seleccione un tipo'
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
      <Header />

      {/* Page title bar */}
      <div className="bg-white border-b border-brand-gray-100">
<<<<<<< HEAD
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between">
=======
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
          <div className="flex items-center gap-2 text-sm text-brand-gray-400">
            <span>Operaciones</span>
            <ChevronRight size={14} />
            <span className="text-brand-black font-500">Nueva Operación</span>
          </div>
<<<<<<< HEAD
          {/* Botones: en mobile ocupan todo el ancho, en desktop inline */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleExport}
              className="btn-secondary flex-1 sm:flex-none justify-center"
            >
              <FileSpreadsheet size={14} className="text-green-600" />
              <span className="hidden xs:inline">Exportar</span>
              <span className="xs:hidden">Excel</span>
=======
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="btn-secondary"
            >
              <FileSpreadsheet size={14} className="text-green-600" />
              Exportar Excel
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
            </button>
            <button
              type="button"
              onClick={handleCancel}
<<<<<<< HEAD
              className="btn-secondary flex-1 sm:flex-none justify-center"
=======
              className="btn-secondary"
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
            >
              <X size={14} />
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
<<<<<<< HEAD
              className="btn-primary flex-1 sm:flex-none justify-center disabled:opacity-60 disabled:cursor-not-allowed"
=======
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
            >
              {isSaving ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
<<<<<<< HEAD
                  <span>Guardando...</span>
=======
                  Guardando...
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
                </>
              ) : (
                <>
                  <Save size={14} />
<<<<<<< HEAD
                  <span>Guardar</span>
=======
                  Guardar operación
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
<<<<<<< HEAD
      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
=======
      <main className="max-w-[1100px] mx-auto px-6 py-8">
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
        <div className="flex flex-col gap-5">
          <OperationForm
            values={form}
            onChange={handleChange}
            errors={errors}
          />

          <AdicionalesTable
            rows={rows}
            onChange={setRows}
          />

          {/* Bottom action bar */}
<<<<<<< HEAD
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 pb-8">
            <p className="text-xs text-brand-gray-400">
              Los campos marcados con <span className="text-brand-red">*</span> son obligatorios
            </p>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleExport}
                className="btn-secondary flex-1 sm:flex-none justify-center"
=======
          <div className="flex items-center justify-between pt-2 pb-8">
            <p className="text-xs text-brand-gray-400">
              Los campos marcados con <span className="text-brand-red">*</span> son obligatorios
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExport}
                className="btn-secondary"
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
              >
                <FileSpreadsheet size={14} className="text-green-600" />
                Exportar Excel
              </button>
              <button
                type="button"
                onClick={handleCancel}
<<<<<<< HEAD
                className="btn-secondary flex-1 sm:flex-none justify-center"
=======
                className="btn-secondary"
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
              >
                <X size={14} />
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
<<<<<<< HEAD
                className="btn-primary flex-1 sm:flex-none justify-center disabled:opacity-60 disabled:cursor-not-allowed"
=======
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
              >
                {isSaving ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
<<<<<<< HEAD
                    <span>Guardando...</span>
=======
                    Guardando...
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
                  </>
                ) : (
                  <>
                    <Save size={14} />
<<<<<<< HEAD
                    <span>Guardar operación</span>
=======
                    Guardar operación
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
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
  )
}
