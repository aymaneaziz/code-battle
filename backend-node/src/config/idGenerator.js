import crypto from "crypto";

/**
 * Generates a short, prefixed unique ID.
 * @param {string} prefix - e.g., 'user', 'avatar', 'badge'
 * @param {number} length - Number of random bytes (6 bytes = 12 hex chars)
 */
export const generateId = (prefix, length = 6) => {
  const randomSegment = crypto.randomBytes(length).toString("hex");
  return `${prefix}_${randomSegment}`;
};
