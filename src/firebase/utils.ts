/**
 * Utility functions for Firestore data sanitization and safety
 */

/**
 * Recursively cleans an object for Firestore:
 * - Removes keys with `undefined` values (which cause Firestore setDoc/updateDoc to throw)
 * - Keeps FieldValue objects (like serverTimestamp()) intact
 * - Recursively processes nested objects and arrays
 */
export function cleanFirestoreData<T extends Record<string, any>>(obj: T): Record<string, any> {
  if (!obj || typeof obj !== 'object') return obj;

  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) {
      continue;
    } else if (value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
      // Check if it's a Firestore FieldValue like serverTimestamp
      if (
        (value as any)._methodName ||
        value.constructor?.name === 'FieldValue' ||
        (value as any).type === 'server_timestamp'
      ) {
        result[key] = value;
      } else {
        result[key] = cleanFirestoreData(value);
      }
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        item !== null && typeof item === 'object' && !(item instanceof Date)
          ? cleanFirestoreData(item)
          : item === undefined
          ? null
          : item
      );
    } else {
      result[key] = value;
    }
  }

  return result;
}
