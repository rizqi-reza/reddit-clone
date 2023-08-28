export const roundThousand = (value) => {
  const rounded = (value / 1000).toFixed(1);
  return `${rounded}K`;
};
