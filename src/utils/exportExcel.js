import * as XLSX from 'xlsx'

/**
 * Exporta la operación completa a un archivo .xlsx
 * con tres hojas: Operación, Adicionales y Resumen.
 */
export function exportToExcel({ form, rows }) {
  if (!form.idOperacion || !form.nroContenedor || !form.cliente) {
    throw new Error('Completa los campos requeridos antes de exportar')
  }

  const wb = XLSX.utils.book_new()
  const totalCantidad = rows.reduce((acc, row) => acc + (parseFloat(row.cantidad) || 0), 0)

  // Hoja 1: Operación
  const operacionData = [
    ['CC GROUP ARGENTINA', '', '', ''],
    ['Sistema de Operaciones Logisticas', '', '', ''],
    ['', '', '', ''],
    ['DATOS DE LA OPERACION', '', '', ''],
    ['Campo', 'Valor', '', ''],
    ['Numero de Contenedor', form.nroContenedor || '', '', ''],
    ['ID Operacion', form.idOperacion || '', '', ''],
    ['Fecha', form.fecha || new Date().toISOString().split('T')[0], '', ''],
    ['Cliente', form.cliente || '', '', ''],
    ['Booking', form.booking || 'N/A', '', ''],
    ['', '', '', ''],
    ['OBSERVACIONES', '', '', ''],
    [form.observaciones || '(Sin observaciones)', '', '', ''],
  ]

  const ws1 = XLSX.utils.aoa_to_sheet(operacionData)
  ws1['!cols'] = [{ wch: 28 }, { wch: 40 }, { wch: 20 }, { wch: 20 }]

  ;['A1', 'A4', 'A5', 'A12'].forEach((ref) => {
    if (ws1[ref]) ws1[ref].s = { font: { bold: true } }
  })

  XLSX.utils.book_append_sheet(wb, ws1, 'Operacion')

  // Hoja 2: Adicionales
  const encabezado = [
    ['CC GROUP ARGENTINA - Servicios Adicionales', '', ''],
    [`Operacion: ${form.idOperacion} | Cliente: ${form.cliente} | Fecha: ${form.fecha || 'N/A'}`, '', ''],
    ['', '', ''],
    ['#', 'Adicional', 'Cantidad'],
  ]

  const filas = rows.map((row, idx) => [idx + 1, row.adicional || '', parseFloat(row.cantidad) || 0])
  const ws2 = XLSX.utils.aoa_to_sheet([...encabezado, ...filas])

  ws2['!cols'] = [{ wch: 5 }, { wch: 40 }, { wch: 15 }]

  const numFmt = '#,##0.00'
  const firstDataRow = 5
  rows.forEach((_, idx) => {
    const ref = `C${firstDataRow + idx}`
    if (ws2[ref]) {
      ws2[ref].z = numFmt
      ws2[ref].t = 'n'
    }
  })

  XLSX.utils.book_append_sheet(wb, ws2, 'Adicionales')

  // Hoja 3: Resumen
  const resumenData = [
    ['RESUMEN DE OPERACION', '', ''],
    ['', '', ''],
    ['Contenedor:', form.nroContenedor || '', ''],
    ['Operacion:', form.idOperacion || '', ''],
    ['Cliente:', form.cliente || '', ''],
    ['Fecha:', form.fecha || '', ''],
    ['Booking:', form.booking || 'N/A', ''],
    ['', '', ''],
    ['Total Cantidad Adicionales:', totalCantidad, ''],
  ]

  const ws3 = XLSX.utils.aoa_to_sheet(resumenData)
  ws3['!cols'] = [{ wch: 26 }, { wch: 30 }, { wch: 20 }]
  if (ws3.B9) {
    ws3.B9.z = numFmt
    ws3.B9.t = 'n'
  }
  XLSX.utils.book_append_sheet(wb, ws3, 'Resumen')

  const fecha = form.fecha || new Date().toISOString().split('T')[0]
  const idOp = form.idOperacion.replace(/[^a-zA-Z0-9-_]/g, '') || 'operacion'
  const fileName = `CCGroup_${idOp}_${fecha}.xlsx`

  try {
    XLSX.writeFile(wb, fileName)
    return fileName
  } catch {
    throw new Error('No se pudo exportar el archivo. Verifica los datos e intenta de nuevo.')
  }
}