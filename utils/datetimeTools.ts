export const addMonthsToDate = (monthsToAdd: number) => {
  const currentDate = new Date()
  return new Date(
    currentDate.setMonth(currentDate.getMonth() + monthsToAdd)
  ).toISOString()
}

export const getDaysDiff = (start: Date, end: Date): number => {
  const oneDay = 1000 * 60 * 60 * 24
  const diffInTime = end.getTime() - start.getTime()
  const diffInDays = Math.round(diffInTime / oneDay)
  return diffInDays
}

/**
 * Get a "Month Year" string from ISO date string
 * @example getMonthYearString("2022-06-03T01:37:45.741Z")
 *  => "Jun 2022"
 * */
export function getMonthYearString(date: string): string {
  return new Date(date).toLocaleString('en-us', {
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Get a "Month Day, Year" string from ISO date string
 * @example getMonthYearString("2022-06-03T01:37:45.741Z")
 *  => "Jun 6, 2022"
 * */
export function getMonthDayYearString(date: Date): string {
  return new Date(date).toLocaleString('en-us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

/**
 * Get "Month Year - Month Year" string from ISO date strings
 * @example getMonthYearToNowString("2022-01-03T01:37:45.741Z", "2022-06-03T01:37:45.741Z")
 *  => "Jan 2022 - Jun 2022"
 * */
export function getMonthYearToMonthYearString(
  startDate: string,
  endDate: string
): string {
  return `${getMonthYearString(startDate)} - ${getMonthYearString(endDate)}`
}

/**
 * Get "Month Year - now" string from ISO date string
 * @example getMonthYearToNowString("2022-06-03T01:37:45.741Z")
 *  => "Jun 2022 - now"
 * */
export function getMonthYearToNowString(date: string): string {
  return `${getMonthYearString(date)} - now`
}
