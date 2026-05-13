import React from 'react'
import { Package, User } from 'lucide-react'
import { FormField, Input, Select, SectionCard } from './FormField'

export default function OperationForm({ values, onChange, errors }) {
  const handleChange = (field) => (e) => {
    onChange(field, e.target.value)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Sección: Info Operación */}
      <SectionCard
        icon={<Package size={14} />}
        title="Información de la Operación"
        badge="Requerido"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField label="Número de Contenedor" required error={errors.nroContenedor}>
            <Input
              placeholder="MSCU1234567"
              value={values.nroContenedor}
              onChange={handleChange('nroContenedor')}
              error={errors.nroContenedor}
              className="font-mono text-xs sm:text-sm"
            />
          </FormField>

          <FormField label="ID Operación" required error={errors.idOperacion}>
            <Input
              placeholder="OP-2024-0001"
              value={values.idOperacion}
              onChange={handleChange('idOperacion')}
              error={errors.idOperacion}
              className="text-xs sm:text-sm"
            />
          </FormField>

          <FormField label="Fecha" required error={errors.fecha}>
            <Input
              type="date"
              value={values.fecha}
              onChange={handleChange('fecha')}
              error={errors.fecha}
              className="text-xs sm:text-sm"
            />
          </FormField>
        </div>
      </SectionCard>

      {/* Sección: Cliente */}
      <SectionCard icon={<User size={14} />} title="Datos del Cliente">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Cliente" required error={errors.cliente}>
            <Input
              placeholder="Razón social del cliente"
              value={values.cliente}
              onChange={handleChange('cliente')}
              error={errors.cliente}
              className="text-xs sm:text-sm"
            />
          </FormField>

          <FormField label="Booking" error={errors.booking}>
            <Input
              placeholder="BK-987654321"
              value={values.booking}
              onChange={handleChange('booking')}
              error={errors.booking}
              className="text-xs sm:text-sm"
            />
          </FormField>
        </div>
      </SectionCard>

      {/* Observaciones moved to the end */}
    </div>
  )
}
