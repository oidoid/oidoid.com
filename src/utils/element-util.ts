/** Convert str to a valid but not necessarily unique element identifier. */
export function ElementID(str: string): string {
  str = str.toLowerCase().replaceAll(/[ _]/g, '-').replaceAll(/[^a-z0-9-]/g, '')
  if (!/^[A-Za-z]/.test(str)) str = `id-${str}`
  return str
}
