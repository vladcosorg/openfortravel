export function getCurrentMonthAndYear(locale: string): string {
  return new Date().toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  })
}

export function getFirstDayOfCurrentMonth(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}
