
export const generateRandomValue = (min: number, max: number, numAfterDigit = 0) => Number(((Math.random() * (max - min)) + min).toFixed(numAfterDigit));

export const getRandomItems = <T>(items: T[]): T[] => {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);

  return items.slice(startPosition, endPosition);
};

export const getRandomItem = <T>(items: T[]): T => items[generateRandomValue(0, items.length - 1)];

export const getErrorMessage = (error: unknown) => error instanceof Error ? error.message : '';

export const getRandomBoolean = () => Math.random() >= 0.5;
