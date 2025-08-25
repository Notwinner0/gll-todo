
const generateUniqueId = (timestamp, randomNumber) => {
  const timestampPart = timestamp.toString(36);
  const randomPart = randomNumber.toString(36).substring(2, 9);
  return timestampPart + randomPart;
};