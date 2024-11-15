export function generateRandomCode(): string {
  return Math.floor(10000 + Math.random() * 90000).toString(); // generates a number between 10000 and 99999
}
