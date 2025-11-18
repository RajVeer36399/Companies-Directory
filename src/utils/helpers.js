export function uniqueValues(list, key) {
  return Array.from(new Set(list.map(item => item[key]))).sort()
}
