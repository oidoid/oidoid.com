export function dateFromYYYYMMDD(yyyymmdd: string): Date {
  const match = yyyymmdd.match(/(?<yyyy>\d{4})-(?<mm>\d{2})-(?<dd>\d{2})/)
  const { yyyy, mm, dd } = match?.groups ?? {}
  if (!yyyy) throw Error('date missing year in YYYY-MM-DD')
  if (!mm) throw Error('date missing month in YYYY-MM-DD')
  if (!dd) throw Error('date missing day in YYYY-MM-DD')
  return new Date(`${yyyy}-${mm}-${dd}`)
}

export function dateCompare(lhs: Readonly<Date>, rhs: Readonly<Date>): number {
  return lhs.getTime() - rhs.getTime()
}
