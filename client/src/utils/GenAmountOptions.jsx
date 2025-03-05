export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => index + 1);
};
