export function findKeyByValue(
  value: number | null | undefined,
  enums: any
): string | undefined {
  for (const key in enums) {
    if (enums[key] === value) {
      return key;
    }
  }
  return undefined; // Key not found
}
