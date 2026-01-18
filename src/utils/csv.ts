export function csvFromObjects(rows: Record<string, string | number | undefined>[]): string {
  if (!rows.length) return ''
  const headers = Object.keys(rows[0])
  const body = rows
    .map((row) =>
      headers
        .map((key) => `"${(row[key] ?? '').toString().replaceAll('"', '""')}"`)
        .join(',')
    )
    .join('\n')
  return `${headers.join(',')}\n${body}`
}

export function downloadCsv(name: string, rows: Record<string, string | number | undefined>[]): void {
  const csv = csvFromObjects(rows)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${name}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
