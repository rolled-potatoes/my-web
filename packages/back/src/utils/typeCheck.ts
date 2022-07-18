export function isDate(d: any) {
  const date = new Date(d);
  return date instanceof Date && !isNaN(date.getTime());
}

export function string2boolean(bool: string): boolean {
  return bool === 'true';
}
