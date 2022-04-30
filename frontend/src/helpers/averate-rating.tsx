export const calculateAverageRating = (array: number[]) => {
  return !array || array.length === 0
    ? 0
    : array.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      ) / array.length;
};
