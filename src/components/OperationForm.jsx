import React from 'react'
<<<<<<< HEAD
import { Package, User, FileText, StickyNote, Image } from 'lucide-react'
import { FormField, Input, Textarea, Select, SectionCard } from './FormField'

const TIPOS_MERCADERIA = [
=======
import { Package, User, FileText, StickyNote } from 'lucide-react'
import { FormField, Input, Textarea, Select, SectionCard } from './FormField'

const TIPOS_MERCADERIA = [
  'Seleccionar...',
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
  'Carga General',
  'Carga Refrigerada',
  'Carga Peligrosa',
  'Carga Sobredimensionada',
  'Contenedor Vacío',
  'Granel Sólido',
  'Granel Líquido',
  'Automóviles',
  'Maquinaria',
  'Otros',
]

export default function OperationForm({ values, onChange, errors }) {
<<<<<<< HEAD
  const handleChange = (field) => (e) => onChange(field, e.target.value)
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || [])
    const newImages = files.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      preview: URL.createObjectURL(file),
      file: file,
    }))
    onChange('imagenes', [...(values.imagenes || []), ...newImages])
  }

  const removeImage = (id) => {
    const updatedImages = (values.imagenes || []).filter(img => img.id !== id)
    onChange('imagenes', updatedImages)
=======
  const handleChange = (field) => (e) => {
    onChange(field, e.target.value)
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
  }

  return (
    <div className="flex flex-col gap-5">
<<<<<<< HEAD

      {/* Sección: Cargar Imágenes */}
      <SectionCard icon={<Image size={14} />} title="Documentos e Imágenes" badge="Opcional">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={handleImageUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="flex items-center justify-center gap-2 border-2 border-dashed border-brand-gray-200 hover:border-brand-red rounded-lg p-6 cursor-pointer transition-colors bg-brand-gray-50 hover:bg-red-50">
              <Image size={20} className="text-brand-gray-400" />
              <div className="text-center">
                <div className="text-sm font-500 text-brand-black">Cargar imágenes o documentos</div>
                <div className="text-xs text-brand-gray-400">Arrastrá archivos o hacé clic aquí</div>
              </div>
            </label>
          </label>
          
          {(values.imagenes || []).length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {values.imagenes.map(img => (
                <div key={img.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-brand-gray-100 border border-brand-gray-200">
                    <img 
                      src={img.preview} 
                      alt={img.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="text-xs">✕</span>
                  </button>
                  <p className="text-xs text-brand-gray-500 mt-1 truncate">{img.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </SectionCard>

      {/* Sección: Información de la Operación */}
      <SectionCard icon={<Package size={14} />} title="Información de la Operación" badge="Requerido">
        {/* En mobile: 1 col. En sm: 2 col. En md: 3 col. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
=======
      {/* Sección: Info Operación */}
      <SectionCard
        icon={<Package size={14} />}
        title="Información de la Operación"
        badge="Requerido"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
          <FormField label="Número de Contenedor" required error={errors.nroContenedor}>
            <Input
              placeholder="MSCU1234567"
              value={values.nroContenedor}
              onChange={handleChange('nroContenedor')}
              error={errors.nroContenedor}
<<<<<<< HEAD
=======
              className="font-mono"
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
            />
          </FormField>

          <FormField label="ID Operación" required error={errors.idOperacion}>
            <Input
              placeholder="OP-2024-0001"
              value={values.idOperacion}
              onChange={handleChange('idOperacion')}
              error={errors.idOperacion}
            />
          </FormField>

<<<<<<< HEAD
          <FormField label="Fecha" required error={errors.fecha} className="sm:col-span-2 md:col-span-1">
=======
          <FormField label="Fecha" required error={errors.fecha}>
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
            <Input
              type="date"
              value={values.fecha}
              onChange={handleChange('fecha')}
              error={errors.fecha}
            />
          </FormField>
        </div>
      </SectionCard>

      {/* Sección: Cliente */}
      <SectionCard icon={<User size={14} />} title="Datos del Cliente">
<<<<<<< HEAD
        {/* En mobile: 1 col. En sm: 2 col. */}
=======
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Cliente" required error={errors.cliente}>
            <Input
              placeholder="Razón social del cliente"
              value={values.cliente}
              onChange={handleChange('cliente')}
              error={errors.cliente}
            />
          </FormField>

          <FormField label="Booking" error={errors.booking}>
            <Input
              placeholder="BK-987654321"
              value={values.booking}
              onChange={handleChange('booking')}
              error={errors.booking}
            />
          </FormField>
        </div>
      </SectionCard>

      {/* Sección: Detalles */}
      <SectionCard icon={<FileText size={14} />} title="Detalles de la Carga">
<<<<<<< HEAD
        {/* En mobile: 1 col. En sm: tipo ocupa todo, peso al lado. En md: tipo 2 col, peso 1 col. */}
=======
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField label="Tipo de Mercadería" required error={errors.tipoMercaderia} className="sm:col-span-2">
            <Select
              value={values.tipoMercaderia}
              onChange={handleChange('tipoMercaderia')}
              error={errors.tipoMercaderia}
            >
<<<<<<< HEAD
              <option value="">Seleccionar tipo...</option>
              {TIPOS_MERCADERIA.map((t) => (
                <option key={t} value={t}>{t}</option>
=======
              {TIPOS_MERCADERIA.map((t) => (
                <option key={t} value={t === 'Seleccionar...' ? '' : t}>
                  {t}
                </option>
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
              ))}
            </Select>
          </FormField>

          <FormField label="Peso (kg)" error={errors.pesoKg}>
            <div className="relative">
              <Input
                type="number"
                placeholder="0"
                value={values.pesoKg}
                onChange={handleChange('pesoKg')}
                error={errors.pesoKg}
<<<<<<< HEAD
                style={{ paddingRight: '2.75rem' }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-gray-400 font-500 pointer-events-none select-none">
=======
                style={{ paddingRight: '3rem' }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-gray-400 font-500 pointer-events-none">
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
                kg
              </span>
            </div>
          </FormField>
        </div>
      </SectionCard>

      {/* Sección: Observaciones */}
      <SectionCard icon={<StickyNote size={14} />} title="Observaciones">
        <FormField label="Notas y observaciones de la operación">
          <Textarea
            placeholder="Ingrese cualquier observación relevante sobre esta operación..."
            value={values.observaciones}
            onChange={handleChange('observaciones')}
            rows={3}
          />
        </FormField>
      </SectionCard>
<<<<<<< HEAD

=======
>>>>>>> 3967be2194db01a654a2bd9f348a65e57b0fe730
    </div>
  )
}
