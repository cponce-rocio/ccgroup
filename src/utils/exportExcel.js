import * as XLSX from 'xlsx'

/**
 * Exporta la operación completa a un archivo .xlsx profesional
 * con dos hojas: "Operación" y "Adicionales"
 */
export function exportToExcel({ form, rows }) {
  const wb = XLSX.utils.book_new()

  // ══════════════════════════════════════════
  // HOJA 1: Datos de la Operación
  // ══════════════════════════════════════════
  const operacionData = [
    ['CC GROUP ARGENTINA', '', '', ''],
    ['Sistema de Operaciones Logísticas', '', '', ''],
    ['', '', '', ''],
    ['DATOS DE LA OPERACIÓN', '', '', ''],
    ['Campo', 'Valor', '', ''],
    ['Número de Contenedor', form.nroContenedor, '', ''],
    ['ID Operación', form.idOperacion, '', ''],
    ['Fecha', form.fecha, '', ''],
    ['Cliente', form.cliente, '', ''],
    ['Booking', form.booking, '', ''],
    ['Tipo de Mercadería', form.tipoMercaderia, '', ''],
    ['Peso (kg)', form.pesoKg ? Number(form.pesoKg) : '', '', ''],
    ['', '', '', ''],
    ['OBSERVACIONES', '', '', ''],
    [form.observaciones || '(Sin observaciones)', '', '', ''],
  ]

  const ws1 = XLSX.utils.aoa_to_sheet(operacionData)

  // Anchos de columna
  ws1['!cols'] = [
    { wch: 28 },
    { wch: 40 },
    { wch: 20 },
    { wch: 20 },
  ]

  // Estilos básicos de celdas clave
  const styleTitle = { font: { bold: true, sz: 16 }, fill: { fgColor: { rgb: 'C62828' } } }
  const styleHeader = { font: { bold: true, sz: 11 }, fill: { fgColor: { rgb: 'F5F5F5' } } }

  // Aplicar negritas a celdas de encabezado (xlsx community edition = sin estilos avanzados,
  // pero sí podemos usar el truco de cell.s en SheetJS Pro / workaround básico)
  ;['A1', 'A4', 'A5', 'A14'].forEach((ref) => {
    if (ws1[ref]) {
      ws1[ref].s = { font: { bold: true } }
    }
  })

  XLSX.utils.book_append_sheet(wb, ws1, 'Operación')

  // ══════════════════════════════════════════
  // HOJA 2: Servicios Adicionales
  // ══════════════════════════════════════════
  const encabezado = [
    ['CC GROUP ARGENTINA — Servicios Adicionales', '', '', '', ''],
    [`Operación: ${form.idOperacion} | Cliente: ${form.cliente} | Fecha: ${form.fecha}`, '', '', '', ''],
    ['', '', '', '', ''],
    ['#', 'Ítem', 'Adicional', 'Cantidad', 'Costo Unit. (ARS)', 'Subtotal (ARS)'],
  ]

  const filas = rows.map((row, idx) => {
    const qty = parseFloat(row.cantidad) || 0
    const cost = parseFloat(row.costo) || 0
    return [
      idx + 1,
      row.item || '',
      row.adicional || '',
      qty,
      cost,
      qty * cost,
    ]
  })

  // Fila de total
  const total = rows.reduce((acc, r) => {
    return acc + (parseFloat(r.cantidad) || 0) * (parseFloat(r.costo) || 0)
  }, 0)

  const filasConTotal = [
    ...filas,
    ['', '', '', '', 'TOTAL', total],
  ]

  const adicionalesData = [...encabezado, ...filasConTotal]
  const ws2 = XLSX.utils.aoa_to_sheet(adicionalesData)

  ws2['!cols'] = [
    { wch: 5 },
    { wch: 30 },
    { wch: 20 },
    { wch: 12 },
    { wch: 20 },
    { wch: 20 },
  ]

  // Formato numérico para columnas de costo y subtotal
  const numFmt = '#,##0.00'
  const startRow = 5 // fila 5 = primera fila de datos (0-indexed)
  rows.forEach((_, idx) => {
    const row = startRow + idx
    ;['E', 'F'].forEach((col) => {
      const ref = `${col}${row}`
      if (ws2[ref]) {
        ws2[ref].z = numFmt
        ws2[ref].t = 'n'
      }
    })
  })

  XLSX.utils.book_append_sheet(wb, ws2, 'Adicionales')

  // ══════════════════════════════════════════
  // Generar nombre de archivo y descargar
  // ══════════════════════════════════════════
  const fecha = form.fecha || new Date().toISOString().split('T')[0]
  const idOp = form.idOperacion.replace(/[^a-zA-Z0-9-_]/g, '') || 'operacion'
  const fileName = `CCGroup_${idOp}_${fecha}.xlsx`

  XLSX.writeFile(wb, fileName)
}
