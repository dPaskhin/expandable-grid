export const getItems = (count = 16) => (
  [...Array(count)].map(() => '#' + Math.floor(Math.random() * 16777215).toString(16))
);
