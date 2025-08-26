/**
 * Generates a unique ID from a timestamp and a random number.
 * * @param {number} timestamp - The current timestamp (e.g., from Date.now()).
 * @param {number} randomNumber - A random number (e.g., from Math.random()).
 * @returns {string} The unique ID.
 */
const generateUniqueId = (timestamp, randomNumber) => {
  const timestampPart = timestamp.toString(36);
  const randomPart = randomNumber.toString(36).substring(2, 9);
  return timestampPart + randomPart;
};