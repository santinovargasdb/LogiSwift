const moneyFmt = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
})

export function formatMoney(value: number): string {
  // Sin espacio entre el signo y el número: "$1.250", no "$ 1.250"
  return moneyFmt.format(value).replace(/\s/g, "")
}

/** "Miércoles 5 De Agosto" */
export function formatFechaLarga(date: Date): string {
  const raw = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date)
  return raw
    .replace(",", "")
    .split(" ")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ")
}

/** "Agosto 2026" */
export function formatMesAnio(date: Date): string {
  const mes = new Intl.DateTimeFormat("es-AR", { month: "long" }).format(date)
  return `${mes.charAt(0).toUpperCase()}${mes.slice(1)} ${date.getFullYear()}`
}

/** "14:32" */
export function formatHora(date: Date): string {
  return new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)
}
